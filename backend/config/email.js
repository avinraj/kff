const SMTPConf = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'farmkelanthara',
      pass: 'yvkglsohhsxumqsz',
    },
  };
  
  const MsgConfig = {
    from: '<farmkelanthara@gmail.com>',
    subject: 'Reset Password',
  };
  
  module.exports = { SMTPConf, MsgConfig };