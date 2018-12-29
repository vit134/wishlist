const fs = require('fs');
const nodemailer = require('nodemailer');

const renameFile = function(oldPath, file) {
  return new Promise((resolve, reject) => {
    var newPath = new Date().getTime() + '_' + file.name;

    var readStream = fs.createReadStream(file.response.tmpPath);
    var writeStream = fs.createWriteStream('./uploads/' + newPath);

    readStream.on('error', (e) => {
      console.log('readStream error', e)
      reject(e)
    });

    writeStream.on('error', (e) => {
      console.log('readStream error', e)
      reject(e)
    });

    readStream.on('close', function () {
      fs.unlink(oldPath, () => console.log('unlink success'));
      resolve(newPath);
    });

    readStream.pipe(writeStream);
  });
}

const sendMail = function (mailOptions) {
  return new Promise(function(resolve, reject) {
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
        }
      });

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          resolve(info);
        }
      });

    });
  })
}

module.exports = { renameFile, sendMail };