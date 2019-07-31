const personalityAnalysis = require('../helper/personalityAnalysis')
const { faceDetection, labelDetection } = require('../helper/amazonRekognition')
// const lengthChecker = require('../helper/lengthChecker')
const comparePersonalities = require('../helper/comparePersonalities')

class analysisController {
    static match(req,res){
        try{

            console.log("from controller match")
            let {user1, user2} = req.body
            // console.log(req.body)
            console.log("------printing.....--------------")
            console.log({user1:req.body.user1})
            console.log({user2:req.body.user2})
            console.log("------printed user1 and user2------")
            let comparedResult = comparePersonalities(user1, user2)
            console.log(comparedResult)
            res.status(200).json(comparedResult)
        }
        catch(e){
            res.status(500).json(e)
        }
    }

    static async analysis(req, res) { 
        console.log("di controller analysis")
        console.log("-0---------")
        try {
            let io = req.io
            let words = ''
            let likes = 0
            let { username, userimage, posts, pass } = req.body
            let userData = {
                username: username,
                userimage: userimage,
                posts: posts
            }
            userData.posts.forEach(item => {
                words += item.caption + ' '
                likes += item.likes
            })
            res.json('request successful')

            let credential =`-${username}-${pass}`
            
            console.log('processing')

            // // Start
            io.emit('hello')
            setTimeout(()=>{
                io.emit(`start${credential}`,
                    {
                        wordCloud: words,
                        profilePicture: userData.userimage,
                        totalLikes: likes
                    }
                )
            }, 1500)

            // IBManalysis
            let personalityAnalysisResult = await personalityAnalysis(userData)
            console.log(personalityAnalysisResult)
            io.emit(`ibm${credential}`,
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
                    console.log(emotionFromPosts, 'emotionfromposts')
                    counter++
                    let emotArray = item.FaceDetails[0].Emotions
                    let totalConfidence = 0 //total confidence for this photo
                    for (let i = 0; i < emotArray.length; i++) {
                        totalConfidence += emotArray[i].Confidence
                    }
                    for (let i = 0; i < emotArray.length; i++) {
                        let emot = emotArray[i].Type
                        console.log({emot})
                        console.log({confidende:emotArray[i].Confidence})
                        if (emotionFromPosts[emot]) {
                            emotionFromPosts[emot] += emotArray[i].Confidence / totalConfidence * 100
                        } else {
                            emotionFromPosts[emot] = emotArray[i].Confidence / totalConfidence * 100
                        }
                        console.log({total:emotionFromPosts[emot]})
                    }
                }
            })
            console.log({numberOfFaces:counter})
            if(counter !==0 ){
                Object.keys(emotionFromPosts).forEach((item)=>{
                    emotionFromPosts[item] = emotionFromPosts[item] / counter
                    console.log("=============",emotionFromPosts[item])
                })
            }
            resultLabelDetection.forEach(item => {
                // if (item.Labels[0].Name !== 'Human' && item.Labels[0].Name !== 'Person' && item.Labels[0].Name !== 'Face') {
                    let limit = item.Labels.length > 5 ? 5 : item.Labels.length
                    for (let i = 0; i < limit; i++) {
                        if (interestFromPosts[item.Labels[i].Name]) {
                            interestFromPosts[item.Labels[i].Name] += 1
                        } else {
                            interestFromPosts[item.Labels[i].Name] = 1
                        }
                    }
                // }
            })
            let perPost = userData.posts.map((item, index) => {
                return {
                    likes: item.likes,
                    date: item.date,
                    resultFaceDetection: resultFaceDetection[index]
                }
            })
            console.log(resultFaceDetection)
            let age= 'Cannot get data'
            let gender= 'Cannot get data'
            if (profilePicDetection.FaceDetails.length === 1) {
                age = profilePicDetection.FaceDetails[0].AgeRange
                gender = profilePicDetection.FaceDetails[0].Gender
            }

            io.emit(`rekog${credential}`,
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
            console.log(emotionFromPosts, 'emotionfromposts')
            console.log(interestFromPosts, 'interestFromPosts')
            console.log(credential)
            console.log('done')
        }
        catch (e) {
            console.log('masuk catch', e)
            let io = req.io
            io.emit('error', e)
        }

    }
}
module.exports = analysisController




