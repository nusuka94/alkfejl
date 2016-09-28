const fs = require('fs');
const jimp = require('jimp');
const DataStore = require('nedb');
const path = 'images/';

const db = new DataStore({
    fileName: 'images.nedb',
    autoload: true,
})

function readdir(path) {
    return new Promise(function(resolve,reject) {
        fs.readdir(path, function (err, files) {
        if (err) reject(err);
        else resolve(files);
        //sikerült
        })
    ;})
}

function processFile(fileName) {
    return jimp.read(path + fileName)
        .then(image => {
            //const width = image.bitmap.width;
            //const height = image.bitmap.height;
            const {width, height} = image.bitmap;
            return db.insert({fileName,width,height});
        })
        .then(insertedImage => {
            image.resize(100, jimp.AUTO);
            return image.write(`converted/${insertedImage._id}.png`);
        })
        .then(() => {
            console.log(fileName, 'feldolgozva');
        })
}

db.remove({}, { multi: true })
    .then(numRemoved => {
        return readdir(path);
    })
    .then(file => {
        //Promise.all([promise1, promise2, ...])
        Promise.all(files.map(fileName => processFile(fileName)))
    })
    .then(() => {
        console.log('Mindennek vége.');
    })