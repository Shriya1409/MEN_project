let express = require('express');
let multer = require('multer')
let carouselImgModel = require('../../model/carouselImgModel')
let router = express();

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
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
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
        res.render('../views/backend/carousel-imgs-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-carousel-imgs/:id', (req,res) => {
    carouselImgModel.findOne({ photoId: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-carousel-imgs-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-carousel-imgs/:id', upload.array('slider_Photo', 7), (req,res) => {
    if(req.files && req.files.length > 0){
        const sliderPhotos=req.files.map(file => file.filename);
        carouselImgModel.updateOne({ photoId: req.params.id }, {$set:{
            photoId: req.body.photo_Id,
            datePhoto:req.body.date_Photo,
            sliderPhoto:sliderPhotos,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/carousel-imgs')
       })

    }else {

        carouselImgModel.updateOne({ photoId: req.params.id }, {$set:{
            photoId: req.body.photo_Id,
            datePhoto:req.body.date_Photo,
           // sliderPhoto:sliderPhotos,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/carousel-imgs')
       })

    }
})

router.delete('/delete-carousel-imgs/:id',(req,res) => {
    carouselImgModel.deleteOne({photoId:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/carousel-imgs')
    })
})


module.exports = router