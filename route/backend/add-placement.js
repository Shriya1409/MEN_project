let express = require('express')
let multer = require('multer')

const plcmtModel = require('../../model/plcmtModel');
let router = express();

// storage & file name setting
 let storage = multer.diskStorage({
     destination:'public/backend/placements/',
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
//  router.get('/:id', (req,res) => {
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
        res.render('../views/backend/add-plcmt-file')
    })

router.post('/', upload.single('page_Photo'), (req,res) => {
    plcmtModel.findOne({pageUrl: req.body.page_Url})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/placement/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                plcmtModel.create({
                    pageUrl: req.body.page_Url,
                    pageNavText: req.body.page_Nav_Text,
                    pageTitle: req.body.page_Title,
                    pageMetaDescription: req.body.page_Meta_Description,
                    pageMetaKeyword: req.body.page_Meta_Keyword,
                    pageHeading: req.body.page_Heading,
                  //  pagePhoto: req.file.filename,
                    pageDetails: req.body.page_Details
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/placement/')
                })
        
            } else {
        
                plcmtModel.create({
                    pageUrl: req.body.page_Url,
                    pageNavText: req.body.page_Nav_Text,
                    pageTitle: req.body.page_Title,
                    pageMetaDescription: req.body.page_Meta_Description,
                    pageMetaKeyword: req.body.page_Meta_Keyword,
                    pageHeading: req.body.page_Heading,
                    pagePhoto: req.file.filename,
                    pageDetails: req.body.page_Details
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/placement/')
                })
        
            }

        }
    })




    

})

module.exports = router