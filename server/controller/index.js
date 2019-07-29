const personalityAnalysis = require('../helper/personalityAnalysis')
const { faceDetection, labelDetection } = require('../helper/amazonRekognition')
const app = require('../expressInstance')


class analysisController {
    static async analysis(req, res) {
        try {


            let words = ''
            let mockData = {
                username: 'viryse',
                profilePicture: 'https://scontent-sin2-2.cdninstagram.com/vp/c4708b309def552ba1b5c2a69e535883/5DDC128E/t51.2885-19/s150x150/65892285_653561535118354_4114219902359830528_n.jpg?_nc_ht=scontent-sin2-2.cdninstagram.com',
                posts: [
                    {
                        imageURL: 'https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg',
                        caption: 'Unplug and unwind',
                        likes: 2842,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'If monday can be fun, Wae Rebo? #kenapaya?',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                        caption: 'Clubstyle ✌️ #fxdc #clubstyle #dyna',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'One of those places where you’d feel so young 👨🏻👵🏻',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: '#family',
                        likes: 2369,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'Grateful to have the chance to play in this hard-fought match along with these monsters. Jakarta Komodos is the champion of 2018 Jak XV 🏉 League',
                        likes: 2369,
                        date: '2017'
                    }, {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'One of those guud ol days 🌿🐍 #2012',
                        likes: 2369,
                        date: '2017'
                    }, {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'Rugby. 3 months in, still a burden to the club. @jakarta_komodos 1st game at Jak XV, 📸: @fijianinasia 🍻',
                        likes: 2369,
                        date: '2017'
                    }, {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'I miss feeling cold behind all the layers of clothing 🎄',
                        likes: 2369,
                        date: '2017'
                    }, {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'Game of hooligans played by gentlemen.',
                        likes: 2369,
                        date: '2017'
                    }, {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'Youre such a Houdini but you dont know what youre running away from 🏃🏿',
                        likes: 2369,
                        date: '2017'
                    }
                ]
            }
            mockData.posts.forEach(item => {
                words += item.caption + ' '
            })
            res.json('request successful')
            let credential = {
                username: mockData.username,
                key: '123abc'
            }
            console.log('processing')

            // Start
            app.emit('start', [
                credential, 
                {
                    wordCloud: words,
                    profilePicture: mockData.profilePicture
                }
            ])

            // IBManalysis
            let personalityAnalysisResult = await personalityAnalysis(mockData)
            
            app.emit('ibm', [
                credential,
                {
                    personalityAnalysisResult
                }
            ])
            // amazonRekognition
            let promiseListFaceDetection = mockData.posts.map((item) => {
                return faceDetection(item.imageURL)
            })
            let promiseLabelDetection = mockData.posts.map((item) => {
                return labelDetection(item.imageURL)
            })

            let resultFaceDetection = await Promise.all(promiseListFaceDetection)
            let resultLabelDetection = await Promise.all(promiseLabelDetection)
            let profilePicDetection = await faceDetection(mockData.profilePicture)
            
        
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
            let perPost = mockData.posts.map((item, index) => {
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

            app.emit('rekog', [
                credential,
                {
                    perPost,
                    summary:{
                        age,
                        gender,
                        emotionFromPosts,
                        interestFromPosts
                    }
                }
            ])
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




