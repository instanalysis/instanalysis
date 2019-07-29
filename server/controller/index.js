const personalityAnalysis = require('../helper/personalityAnalysis')
const {faceDetection, labelDetection} = require('../helper/amazonRekognition')
class analysisController{
    static async analysis (req,res){
        try{
            let mockData = {
                username: 'viryse',
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
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                        caption: 'Clubstyle ✌️ #fxdc #clubstyle #dyna',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'One of those places where you’d feel so young 👨🏻👵🏻',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Iceland is petrifying.',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: '#family',
                        likes: 2369,
                        date:'2017'
                    },
                    {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'Grateful to have the chance to play in this hard-fought match along with these monsters. Jakarta Komodos is the champion of 2018 Jak XV 🏉 League',
                        likes: 2369,
                        date:'2017'
                    },{
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'One of those guud ol days 🌿🐍 #2012',
                        likes: 2369,
                        date:'2017'
                    },{
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'Rugby. 3 months in, still a burden to the club. @jakarta_komodos 1st game at Jak XV, 📸: @fijianinasia 🍻',
                        likes: 2369,
                        date:'2017'
                    },{
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'I miss feeling cold behind all the layers of clothing 🎄',
                        likes: 2369,
                        date:'2017'
                    },{
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'Game of hooligans played by gentlemen.',
                        likes: 2369,
                        date:'2017'
                    },{
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: 'Youre such a Houdini but you dont know what youre running away from 🏃🏿',
                        likes: 2369,
                        date:'2017'
                    }
                ]
            }
            let promiseListFaceDetection = mockData.posts.map((item)=>{
                return faceDetection(item.imageURL)
            })
            let promiseLabelDetection = mockData.posts.map((item)=>{
                return labelDetection(item.imageURL)
            })
            console.log('processing')
            let resultFaceDetection = await Promise.all(promiseListFaceDetection)
            let resultLabelDetection = await Promise.all(promiseLabelDetection)
            let interestFromPosts = {}
            let emotionFromPosts = {}
            let counter = 0
            resultFaceDetection.forEach((item, index)=>{
                if(item.FaceDetails[0]){
                    counter ++
                    console.log('hei')
                    for(let i = 0; i < item.FaceDetails[0].Emotions.length; i++){
                        if(emotionFromPosts[item.FaceDetails[0].Emotions[i].Type]){
                            emotionFromPosts[item.FaceDetails[0].Emotions[i].Type] += item.FaceDetails[0].Emotions[i].confidence
                        }else{
                            emotionFromPosts[item.FaceDetails[0].Emotions[i].Type] = item.FaceDetails[0].Emotions[i].confidence
                        }
                        if(resultFaceDetection.length === index - 1){
                            emotionFromPosts[item.FaceDetails[0].Emotions[i].Type] = emotionFromPosts[item.FaceDetails[0].Emotions[i].Type]/counter
                        }
                    }
                }
            })
            resultLabelDetection.forEach(item=>{
                if(item.Labels[0].Name !== 'Human' && item.Labels[0].Name !== 'Person' && item.Labels[0].Name !== 'Face'){
                    if(interestFromPosts[item.Labels[0].Name]){
                        interestFromPosts[item.Labels[0].Name] += 1
                    }else{
                        interestFromPosts[item.Labels[0].Name] = 1
                    }
                }
            })
            const personalityAnalysisResult = await personalityAnalysis(mockData)
            let perPost = mockData.posts.map((item, index)=>{
                return{
                    faceDetection:resultFaceDetection[index],
                    labelDetection:resultLabelDetection[index],
                    likes:item.likes,
                    date:item.date,
                }
            })
            // console.log(resultFaceDetection)
            console.log('done')
            res.json({
                username: mockData.username,
                personalityAnalysisResult,
                emotionFromPosts,
                interestFromPosts,
                perPost
            })

        }
        catch(e){
            console.log(e)
            res.status(500).json(e)
        }   
           
    }
}
module.exports= analysisController




