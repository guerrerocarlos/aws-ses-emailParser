const fs = require("fs")
const path = require("path")
const MailParser = require("mailparser-mit").MailParser;
const sendToS3 = require("./storage")

function parser(message) {
  return new Promise((success, reject) => {

    let storagePromises = []

    const mailparser = new MailParser({
      // debug: true,
      // showAttachmentLinks: true
      streamAttachments: true
    });
  
    mailparser.on("end", async function (mail) {
      console.log(mail)
      await Promise.all(storagePromises)
      success()
    });
  
    mailparser.on("attachment", function (attachment, mail) {
      console.log("Storing attachment", attachment)
      storagePromises.push(sendToS3(attachment))
    });
  
    mailparser.write(message.Body.toString());
    mailparser.end();
  })
}

module.exports = parser
