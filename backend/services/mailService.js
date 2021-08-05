const nodemailer = require("nodemailer");
const { SMTPConf, MsgConfig } = require("../config/email");
const transport = nodemailer.createTransport(SMTPConf);
module.exports.verify = () => {
  transport.verify((err, success) => {
    if (err) return console.error(err);
    console.log("Your config is correct");
  });
};
module.exports.sendEmail = async (msg) => {
  return new Promise((resolve) => {
    try {
      const message = { ...MsgConfig };
      transport.sendMail({ ...message, ...msg }, (err, info) => {
        if (err) {
          console.log("Errorr:", err);
          resolve(null);
        }
        resolve(info);
      });
    } catch (e) {
      console.log("Error:", e);
      resolve(null);
    }
  });
};
