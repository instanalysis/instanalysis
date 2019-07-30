const personalityAnalysis = require('../helper/personalityAnalysis')
const { faceDetection, labelDetection } = require('../helper/amazonRekognition')
// const lengthChecker = require('../helper/lengthChecker')

class analysisController {
    static async analysis(req, res) {
        console.log("di controller analysis")
        console.log(req.body)
        console.log("-0---------")
        try {
            let io = req.io
            let words = ''
            let { username, userimage, posts, key } = req.body
            let userData = {
                username: username,
                userimage: userimage,
                posts: posts
            }
            userData.posts.forEach(item => {
                words += item.caption + ' '
            })
            res.json('request successful')

            let credential = {
                username: userData.username,
                key
            }
            
            console.log('processing')

            // // Start
            io.emit('hello')
            io.emit(`start-${credential.username}-${credential.key}`,
                {
                    wordCloud: words,
                    profilePicture: userData.userimage,
                    totalLikes: ''
                }
            )

            // IBManalysis
            let personalityAnalysisResult = await personalityAnalysis(userData)
            console.log(personalityAnalysisResult)
            io.emit(`ibm-${credential.username}-${credential.key}`,
                {
                    personalityAnalysisResult
                }
            )

            // amazonRekognition
            let promiseListFaceDetection = userData.posts.map((item) => {
                return faceDetection(item.imageUrl)
            })
            let promiseLabelDetection = userData.posts.map((item) => {
                return labelDetection(item.imageUrl)
            })

            let resultFaceDetection = await Promise.all(promiseListFaceDetection)
            let resultLabelDetection = await Promise.all(promiseLabelDetection)
            let profilePicDetection = await faceDetection(userData.userimage)

            // manual summary analysis 
            let interestFromPosts = {}
            let emotionFromPosts = {}
            let counter = 0
            resultFaceDetection.forEach((item, index) => {
                if (item.FaceDetails[0]) {
                    counter++
                    for (let i = 0; i < item.FaceDetails[0].Emotions.length; i++) {
                        if (emotionFromPosts[item.FaceDetails[0].Emotions[i].Type]) {
                            emotionFromPosts[item.FaceDetails[0].Emotions[i].Type] += item.FaceDetails[0].Emotions[i].Confidence
                        } else {
                            emotionFromPosts[item.FaceDetails[0].Emotions[i].Type] = item.FaceDetails[0].Emotions[i].Confidence
                        }
                        if (resultFaceDetection.length === index + 1) {
                            emotionFromPosts[item.FaceDetails[0].Emotions[i].Type] = emotionFromPosts[item.FaceDetails[0].Emotions[i].Type] / counter
                        }
                    }
                }
            })
            resultLabelDetection.forEach(item => {
                if (item.Labels[0].Name !== 'Human' && item.Labels[0].Name !== 'Person' && item.Labels[0].Name !== 'Face') {
                    let limit = item.Labels.length > 5 ? 5 : item.Labels.length
                    for (let i = 0; i < limit; i++) {
                        if (interestFromPosts[item.Labels[i].Name]) {
                            interestFromPosts[item.Labels[i].Name] += 1
                        } else {
                            interestFromPosts[item.Labels[i].Name] = 1
                        }
                    }
                }
            })
            let perPost = userData.posts.map((item, index) => {
                return {
                    likes: item.likes,
                    date: item.date,
                }
            })
            let age
            let gender
            if (profilePicDetection.FaceDetails.length === 1) {
                age = profilePicDetection.FaceDetails[0].AgeRange
                gender = profilePicDetection.FaceDetails[0].Gender
            } else {
                gender = 'Cannot get data',
                    age = 'Cannot get data'
            }

            io.emit(`rekog-${credential.username}-${credential.key}`,
                {
                    perPost,
                    summary: {
                        age,
                        gender,
                        emotionFromPosts,
                        interestFromPosts
                    }
                }
            )
            console.log('done')
            // res.status(200).json({
            //     wordCloud: words,
            //     profilePicture: userData.userimage,
            //     totalLikes: '',
            //     personalityAnalysisResult,
            //     perPost,
            //     summary: {
            //         age,
            //         gender,
            //         emotionFromPosts,
            //         interestFromPosts
            //     }

            // })
            // app.emit('disconnect')



        }
        catch (e) {
            console.log('masuk catch', e)
            res.status(500).json('error')
        }

    }
}
module.exports = analysisController



