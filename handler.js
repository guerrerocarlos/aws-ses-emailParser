'use strict';
const process = require("./process")

module.exports.emailHandler = async (event) => {
  console.log("🔥 event:", JSON.stringify(event, null, 2))

  await process.ses(event)

  return {
    statusCode: 200,
    body: "Processing completed 😀"
  }
};
