let express = require('express');
let multer = require('multer')
const carouselImgModel = require('../../model/carouselImgModel');
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
    res.render('../views/backend/add-carousel-imgs')
})


   
router.post('/', upload.array('sliderPhoto', 7), (req,res) => {
carouselImgModel.find({datePhoto: req.body.datePhoto})
.then((x) => {

 
        if(!(req.files&& (req.files.length > 0))) {

            carouselImgModel.create({
                datePhoto:req.body.datePhoto,
            //    sliderPhoto:req.body.filename,
            //    noticename:req.body.noticename,
            //    noticeinfo:req.body.filename,
            //    eventinfo:req.body.filename,
            //    usefulinfo:req.body.filename,
            })
            .then((x) => {
                req.flash('success', 'Your data has been added successfully')
                 res.redirect('/carousel-imgs/')
            })
    
        } else {
            const sliderPhotos=req.files.filter(file=>file.fieldname==='sliderPhoto').map(file=>file.filename);
         

            carouselImgModel.create({
                datePhoto:req.body.datePhoto,
                sliderPhoto:sliderPhotos,
            
            })
            .then((x) => {
                req.flash('success', 'Your data has been added successfully')
                 res.redirect('/carousel-imgs/')
            })
    
        }

    })



})

module.exports = router