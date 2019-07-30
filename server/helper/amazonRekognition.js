const image2base64 = require('image-to-base64');
var AWS = require('aws-sdk');
var keys = require(__dirname + '/amazonCredential.json')
AWS.config.update(keys)
var rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' });

const faceDetection = async (imageLink) => {
  try{

    console.log({imageLink})
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

module.exports = {faceDetection, labelDetection}
