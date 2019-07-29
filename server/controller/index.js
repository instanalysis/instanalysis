const personalityAnalysis = require('../helper/personalityAnalysis')
const { faceDetection, labelDetection } = require('../helper/amazonRekognition')
const app = require('../expressInstance')

class analysisController {
    static async analysis(req, res) {
        console.log("di controller analysis")
        console.log(req.body)
        console.log("-0---------")
        try {
            let io = req.io
            let words = ''
            let { username, userimage, posts } = req.body
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
                key: '123abc'
            }
            console.log('processing')

            // // Start
            io.emit(`start-${credential.username}-${credential.key}`, 
                {
                    wordCloud: words,
                    userimage: userData.userimage
                }
            )

            // IBManalysis
            const wordsArr = words.split(" ")
            let personalityAnalysisResult = "not enough data to analyze personality"
            if (wordsArr.length > 100) {
                personalityAnalysisResult = await personalityAnalysis(userData)
            }
            io.emit(`ibm-${credential.username}-${credential.key}`, 
                {
                    personalityAnalysisResult
                }
            )
            // amazonRekognition
            let promiseListFaceDetection = userData.posts.map((item) => {
                return faceDetection(item.imageURL)
            })
            let promiseLabelDetection = userData.posts.map((item) => {
                return labelDetection(item.imageURL)
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
                    if (interestFromPosts[item.Labels[0].Name]) {
                        interestFromPosts[item.Labels[0].Name] += 1
                    } else {
                        interestFromPosts[item.Labels[0].Name] = 1
                    }
                }
            })

            let perPost = userData.posts.map((item, index) => {
                return {
                    faceDetection: resultFaceDetection[index],
                    labelDetection: resultLabelDetection[index],
                    likes: item.likes,
                    date: item.date,
                }
            })
            let age
            let gender
            if (profilePicDetection.FaceDetails.length === 1) {
                age = profilePicDetection.FaceDetails[0].AgeRange
                gender = profilePicDetection.FaceDetails[0].Gender.Value
            } else {
                gender = 'Cannot get data',
                    age = 'Cannot get data'
            }

            io.emit(`start-${credential.username}-${credential.key}`, 
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
            // app.emit('disconnect')


        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }

    }
}
module.exports = analysisController




