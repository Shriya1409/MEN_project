let express = require('express');
let multer = require('multer')
let resultModel = require('../../model/resultModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/results/',
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
        res.render('../views/backend/add-result-file')
    })

router.post('/', upload.single('page_Photoo') , (req,res) => {
    resultModel.findOne({pageUrll: req.body.page_Urll})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/result/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                resultModel.create({
                    pageUrll: req.body.page_Urll,
                    pageNavTextt: req.body.page_Nav_Textt,
                    pageTitlee: req.body.page_Titlee,
                    pageMetaDescriptionn: req.body.page_Meta_Descriptionn,
                    pageMetaKeywordd: req.body.page_Meta_Keywordd,
                    pageHeadingg: req.body.page_Headingg,
                    // pagePhoto: req.file.filename,
                    pageDetailss: req.body.page_Detailss
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/result/')
                })
        
            } else {
        
                resultModel.create({
                    pageUrll: req.body.page_Urll,
                    pageNavTextt: req.body.page_Nav_Textt,
                    pageTitlee: req.body.page_Titlee,
                    pageMetaDescriptionn: req.body.page_Meta_Descriptionn,
                    pageMetaKeywordd: req.body.page_Meta_Keywordd,
                    pageHeadingg: req.body.page_Headingg,
                    pagePhotoo: req.file.filename,
                    pageDetailss: req.body.page_Detailss
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/result/')
                })
        
            }

        }
    })




    

})

module.exports = router