
const { get } = require("./helpers/s3")
const parser = require("./helpers/parser")

function ses(event) {
  return get(event.Records[0].ses.mail.messageId).then(parser)
}

module.exports = { ses }