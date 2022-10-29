// ***** Modüller
const Photo = require('../models/Photo');
// ***** //Modüller

// ***** About Sayfası
exports.getAboutPage = (req, res) => {
    res.render('about');
};
// ***** //About Sayfası

// ***** Add Photo Sayfası
exports.getAddPhotoPage = (req, res) => {
    res.render('add');
};
// ***** //Add Photo Sayfası

// ***** Fotoğraf Güncelleme Sayfası
exports.getEditPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id }); // veriyi yakalama
    res.render('edit', { photo }); // ilgili verinin sayfasına gitme
};
// ***** //Fotoğraf Güncelleme Sayfası
