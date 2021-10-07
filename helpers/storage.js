const fs = require("fs")
const path = require("path")
const AWS = require("aws-sdk")
const PassThrough = require("stream").PassThrough
const config = require("../config")

const S3 = new AWS.S3({
  region: "us-east-2"
})

function storage(attachment, folderName = "") {
  // https://nodejs.org/api/stream.html#stream_class_stream_passthrough
  const pass = new PassThrough()

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  const s3Path = [config.destinationPrefix || "", folderName]
  const filePathAndname = `${path.join(...s3Path)}/${attachment.generatedFileName}`
  var params = { Bucket: config.destinationBucket, Key: filePathAndname, Body: pass };

  // This pipes the attachment and sends it to S3 while it's being read from the email 
  // instead of storing the full attachment in memory
  attachment.stream.pipe(pass)
  return S3.upload(params).promise()
}

module.exports = storage