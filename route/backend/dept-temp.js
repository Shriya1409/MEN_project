let express = require('express');
let multer = require('multer')
const deptTempModel = require('../../model/deptTempModel');
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/images/temp',
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
// router.get('/:id', (req,res) => {
//     pageModel.find({})
//     .then((x) => {
//         res.render('../views/backend/add-page-file',{x})
//         // console.log(x)
//     })
//     .catch((y) => {
//         console.log(y)
//     })
// })
router.get('/', (req,res) => {
        res.render('../views/backend/dept-template')
    })

router.post('/', upload.single('image') , (req,res) => {
    deptTempModel.findOne({page_Url: req.body.page_Url})
    .then((l) => {
        if(l) {
            req.flash('err', 'Url already exists, Please try with another url!!')
            res.redirect('/page/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                deptTempModel.create({
                    page_Url: req.body.page_Url,
                    page_Title: req.body.page_Title,
                    page_Heading: req.body.page_Heading,
                    photo_slider: req.body.photo_slider,
                    basic_carousel:req.body.basic_carousel,
                    picture_cards:req.body.picture_cards,
                    link_carousel:req.body.link_carousel,
                    text_section:req.body.text_section,
                    //image:req.body.image,
                 
                 
                })
                .then((l) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/page/')
                })
        
            } else {
        
                deptTempModel.create({
                    page_Url: req.body.page_Url,
                    page_Title: req.body.page_Title,
                    page_Heading: req.body.page_Heading,
                    photo_slider: req.body.photo_slider,
                    basic_carousel:req.body.basic_carousel,
                    picture_cards:req.body.picture_cards,
                    link_carousel:req.body.link_carousel,
                    text_section:req.body.text_section,
                    image:req.body.image,
                   
                })
                .then((l) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/page/')
                })
        
            }

        }
    })




    

})

module.exports = router