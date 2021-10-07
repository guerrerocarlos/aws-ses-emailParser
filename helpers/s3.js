const path = require("path")
const AWS = require("aws-sdk")
const config = require("../config")

const S3 = new AWS.S3({
  region: "us-east-2"
})

function get(messageId) {
  return S3.getObject({
    Bucket: config.emailBucket,
    Key: path.join(config.emailPrefix, messageId)
  }).promise()
}

module.exports = {
  get
}