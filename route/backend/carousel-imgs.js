let express = require('express');
let multer = require('multer')
const carouselImgModel = require('../../model/carouselImgModel');
const c = require('config');
const { syncIndexes } = require('mongoose');
let router = express();
let inputFieldHTML = '';
// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/carousel-imgs/',
    filename: (req, file, cb) => {
        // cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' ) {
            cb(null, true)
        }
        else {
            cb(null,false);
             return cb(new Error('Only Image format(jpeg,jpg,png,gif) are allowed!!'))
        }
    }
})

router.get('/', (req,res) => {
    carouselImgModel.find({})
    .then((x) => {
        res.render('../views/backend/carousel-imgs', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



// router.get('/edit-carousel-imgs/:id', (req,res) => {

//     if(req.files){

//     let inputFieldHTML = '';
//     for (const sliderPhoto of sliderPhoto) {
//       inputFieldHTML += `<input type="text" name="sliderPhoto" value="${sliderPhoto}" />`;
//     }
// } 
  
//     res.render('../views/backend/edit-carousel-imgs', { inputFieldHTML });
//   });
  


// router.put('/edit-carousel-imgs/:id',  upload.array('sliderPhoto', 7), (req,res) => {
//     if((req.files&& (req.files.length > 0)))
//     {
//         const sliderPhotos=req.files.filter(file=>file.fieldname==='sliderPhoto').map(file=>file.filename);

//         carouselImgModel.update({ datePhoto: req.params.id }, {$set:{
//             datePhoto:req.body.datePhoto,
//             sliderPhoto:sliderPhotos,
//         }})
//        .then((x) => {
//         req.flash('success', 'Your data has been updated successfully')
//         res.redirect('/carousel-imgs')
//        })

//     }
    
//     else {

//         carouselImgModel.updateOne({ datePhoto: req.params.id }, {$set:{
//          datePhoto:req.body.datePhoto,

//         }})
//        .then((x) => {
//         req.flash('success', 'Your data has been updated successfully')
//         res.redirect('/carousel-imgs')
//        })

//     }
// })

// router.delete('/delete-carousel-imgs/:id',(req,res) => {
//     carouselImgModel.deleteOne({sliderPhoto, index})
//     .then((x) => {
//         req.flash('success', 'Your data has been deleted successfully')
//         res.redirect('/carousel-imgs')
//     })
// })


module.exports = router