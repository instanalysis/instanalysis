const personalityAnalysis = require('../helper/personalityAnalysis')
const {faceDetection} = require('../helper/amazonRekognition')
class analysisController{
    static async analysis (req,res){
        try{
            let mockData = {
                username: 'viryse',
                posts: [
                    {
                        imageURL: 'https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg',
                        caption: 'Happiest birthday to @potatoccalon 🎉🎉 wishing you bestest things in life and lots of inspiration and happy moments this year 💖💖💖(*´∇｀*)⭐️⭐️⭐️ #bnha #bokunoheroacademia #mha #myheroacademia #bakugoukatsuki #bakugou #kacchan #chibi #bnhafanart',
                        likes: 2842,
                        date: '2017'
                    },
                    {
                        imageURL: 'https://s.abcnews.com/images/GMA/190416_gma_digital_garner_hpMain_16x9_992.jpg',
                        caption: '⭐️CHIBI COMMISSIONS OPEN⭐️ I’ll be opening 5 slots for now, if you’re interested please dm me with the number of characters and good reference images! （＾◇＾）I’ll reply when I’m ready to take your commission 💖 sharing is appreciated~.#commissionsopen #commission #artcommission #chibi #bnhafanart #bnha #bokunoheroacademia #mha #myheroacademia #midoriyaizuku #deku  I’ll be opening 5 slots for now, if you’re interested please dm me with the number of characters and good reference images! （＾◇＾）I’ll reply when I’m ready to take your commission 💖 sharing is appreciated~.#commissionsopen #commission #artcommission #chibi #bnhafanart #bnha #bokunoheroacademia #mha #myheroacademia #midoriyaizuku #deku  I’ll be opening 5 slots for now, if you’re interested please dm me with the number of characters and good reference images! （＾◇＾）I’ll reply when I’m ready to take your commission 💖 sharing is appreciated~.#commissionsopen #commission #artcommission #chibi #bnhafanart #bnha #bokunoheroacademia #mha #myheroacademia #midoriyaizuku #deku  I’ll be opening 5 slots for now, if you’re interested please dm me with the number of characters and good reference images! （＾◇＾）I’ll reply when I’m ready to take your commission 💖 sharing is appreciated~.#commissionsopen #commission #artcommission #chibi #bnhafanart #bnha #bokunoheroacademia #mha #myheroacademia #midoriyaizuku #deku  I’ll be opening 5 slots for now, if you’re interested please dm me with the number of characters and good reference images! （＾◇＾）I’ll reply when I’m ready to take your commission 💖 sharing is appreciated~.#commissionsopen #commission #artcommission #chibi #bnhafanart #bnha #bokunoheroacademia #mha #myheroacademia #midoriyaizuku #deku  I’ll be opening 5 slots for now, if you’re interested please dm me with the number of characters and good reference images! （＾◇＾）I’ll reply when I’m ready to take your commission 💖 sharing is appreciated~.#commissionsopen #commission #artcommission #chibi #bnhafanart #bnha #bokunoheroacademia #mha #myheroacademia #midoriyaizuku #deku',
                        likes: 2369,
                        date:'2017'
                    }
                ]
            }
            let promiseListFaceDetection = mockData.posts.map((item)=>{
                return faceDetection(item.imageURL)
            })

            console.log('processing')
            let resultFaceDetection = await Promise.all(promiseListFaceDetection)
            const personalityAnalysisResult = await personalityAnalysis(mockData)
            let perPost = mockData.posts.map((item, index)=>{
                return{
                    faceDetection:resultFaceDetection[index],
                    likes:item.likes,
                    date:item.date,
                }
            })
            // console.log(resultFaceDetection)
            console.log('done')
            res.json({
                username: mockData.username,
                personalityAnalysisResult,
                perPost
            })

        }
        catch(e){
            res.status(500).json(e)
        }   
           
    }
}
module.exports= analysisController




