const fs = require('fs');
const jimp = require('jimp');
const DataStore = require('nedb');

const db = new DataStore({
    fileName: 'images.nedb',
    autoload: true,
})

db.remove({}, { multi: true }, function (err, numRemoved) {
    if (err) throw err;
    fs.readdir('images/', function (err, files) {
        if (err) throw err;
        files.forEach(function (fileName) {
            jimp.read(`images/${fileName}`, function (err, image) {
                if (err) throw err;
                //const width = image.bitmap.width;
                //const height = image.bitmap.height;
                const {width, height} = image.bitmap;
                db.insert({ fileName, width, height }, function (err, insertedImage) {
                    image.resize(100, jimp.AUTO);
                    image.write(`converted/${insertedImage._id}.png`, function (err) {
                        if (err) throw err;
                        console.log(fileName, 'feldolgozva');
                    });
                });
            });
        });
    });
});