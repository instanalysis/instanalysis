const personalityAnalysis = require('../helper/personalityAnalysis')
const amazonRekognition = require('../helper/amazonRekognition')
class analysisController{
    static async analysis (req,res){
        try{
            let mockData = {
                username: 'viryse',
                posts: [
                    {
                        imageURL: 'https://scontent-sin6-2.cdninstagram.com/vp/96f6483c89d170230952fa30e889153e/5DE48A90/t51.2885-15/e35/p1080x1080/65776990_634027807092683_1723135104297470983_n.jpg?_nc_ht=scontent-sin6-2.cdninstagram.com&_nc_cat=111',
                        caption: 'Happiest birthday to @potatoccalon 🎉🎉 wishing you bestest things in life and lots of inspiration and happy moments this year 💖💖💖(*´∇｀*)⭐️⭐️⭐️ #bnha #bokunoheroacademia #mha #myheroacademia #bakugoukatsuki #bakugou #kacchan #chibi #bnhafanart',
                        likes: 2842
                    },
                    {
                        imageURL: 'https://scontent-sin6-2.cdninstagram.com/vp/732bac83b411cacf810389a5f190f659/5DDF53E6/t51.2885-15/e35/s1080x1080/65961529_167550814279802_7613849013870915224_n.jpg?_nc_ht=scontent-sin6-2.cdninstagram.com&_nc_cat=102',
                        caption: '⭐️CHIBI COMMISSIONS OPEN⭐️ I’ll be opening 5 slots for now, if you’re interested please dm me with the number of characters and good reference images! （＾◇＾）I’ll reply when I’m ready to take your commission 💖 sharing is appreciated~.#commissionsopen #commission #artcommission #chibi #bnhafanart #bnha #bokunoheroacademia #mha #myheroacademia #midoriyaizuku #deku',
                        likes: 2369
                    }
                ]
            }
            const result = mockData.posts.map(async (item)=>{
                await amazonRekognition(item)
            })
            const personalityAnalysisResult = await personalityAnalysis(mockData)
            console.log(result, personalityAnalysisResult)
        }
        catch(e){
            res.status(500).json(e)
        }   
           
    }
}
module.exports= analysisController




