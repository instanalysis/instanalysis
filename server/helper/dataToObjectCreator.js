module.exports = function(data){
    let contentItems = data.posts.map((item)=>{
        let eachContent = {
            "content": "",
            "contenttype": "text/plain",
            "language": "en"
        }
        eachContent.content = `${item.caption}`
        return eachContent
    })
    let IBMAnalysis = {
        "contentItems": contentItems
    }
    return {
        IBMAnalysis
    }
}