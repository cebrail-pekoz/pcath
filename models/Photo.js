const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ***** schema oluşturma
const PhotoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

// ***** veritabanı bu ismi küçük harflere çevirip collection oluşturur >> 'photos' şeklinde
// veritabanına şemayı 'Photo' isminde gönderme
const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
