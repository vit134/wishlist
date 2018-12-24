const fs = require('fs');

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

module.exports = renameFile;