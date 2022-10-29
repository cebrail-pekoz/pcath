// ***** MODÜLLER
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ***** //MODÜLLER

// ***** Schema Oluşturma
const PhotoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});
// ***** //Schema Oluşturma

const Photo = mongoose.model('Photo', PhotoSchema); // veritabanına şemayı 'Photo' isminde gönderme
// veritabanı bu ismi küçük harflere çevirip collection oluşturur >> 'photos' şeklinde

module.exports = Photo; // dışa aktarma
