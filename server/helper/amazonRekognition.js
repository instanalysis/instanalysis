const image2base64 = require('image-to-base64');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./amazonCredential.json');
var rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' });

const faceDetection = async (imageLink) => {
  try{

    console.log(imageLink)
    let base64 = await image2base64(imageLink)
    const buffer = new Buffer.from(base64, 'base64')
    var params = {
      Image: { /* required */
        Bytes: buffer,
      },
      Attributes: [
        "ALL",
      ]
    };
    
    return new Promise(function (resolve, reject) {
      rekognition.detectFaces(params, function (err, data) {
        if (err) reject(err) // an error occurred
        else resolve(data);           // successful response
      });
    })
  }catch(e){
    throw e
  }
    
}

const labelDetection = async (imageLink)=>{
  try{
    let base64 = await image2base64(imageLink)
    const buffer = new Buffer.from(base64, 'base64')
    var params = {
      Image: { /* required */
        Bytes: buffer,
      }
    };
    
    return new Promise(function (resolve, reject) {
      rekognition.detectLabels(params, function (err, data) {
        if (err) reject(err) // an error occurred
        else resolve(data);           // successful response
      });
    })
  }catch(e){
    throw e
  }
}

// fun("https://cdns.klimg.com/merdeka.com/i/w/news/2019/07/25/1096248/670x335/3-partai-blak-blakan-minta-jatah-banyak-kursi-menteri-pada-jokowi.jpg")
module.exports = {faceDetection, labelDetection}
 ////// Comparefaces
// let image1
// let image2
// image2base64("https://cdns.klimg.com/merdeka.com/i/w/news/2019/07/25/1096248/670x335/3-partai-blak-blakan-minta-jatah-banyak-kursi-menteri-pada-jokowi.jpg")
//   .then(
//     (response) => {
//       image1 = response
//       return image2base64("https://cdn.sindonews.net/dyn/620/jateng/news/2019/07/24/1/7190/angela-tanoesoedibjo-kembali-bertemu-presiden-jokowi--vmi.JPG")
//     })
//   .then((response) => {
//     image2 = response

//     const buffer = new Buffer.from(image1, 'base64')
//     const buffer2 = new Buffer.from(image2, 'base64')
//     var params = {
//       SimilarityThreshold: 90,
//       SourceImage: {
//         Bytes: buffer
//       },
//       TargetImage: {
//         Bytes: buffer2
//       }
//     };
//     rekognition.compareFaces(params, function (err, data) {
//       if (err) console.log(err, err.stack); // an error occurred
//       else console.log(data.FaceMatches[0].Face);           // successful response
//     });
//   }
//   )
//   .catch(
//     (error) => {
//       console.log(error);
//     }
//   )



// {
//   profileName:'',
//   IBMAnalysis:{

//   },

// }