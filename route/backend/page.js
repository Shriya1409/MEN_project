let express = require('express');
let multer = require('multer')
let pageModel = require('../../model/pageModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/images/',
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
    pageModel.find({})
    .then((x) => {
        res.render('../views/backend/page-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})

// router.get('/add-page', (req,res) => {
//     res.render('../views/backend/add-page-file')
// })

// router.post('/add-page', upload.single('page_Photo') , (req,res) => {
//     pageModel.findOne({pageUrl: req.body.page_Url})
//     .then((a) => {
//         if(a) {
//             req.flash('err', 'Url already exists, Please try with another url!!')
//             res.redirect('/admin/page/')
//             // console.log('Url already exists, Please try with another url!!')
//         } else {

//             if(!req.file) {

//                 pageModel.create({
//                     pageUrl: req.body.page_Url,
//                     pageNavText: req.body.page_Nav_Text,
//                     pageTitle: req.body.page_Title,
//                     pageMetaDescription: req.body.page_Meta_Description,
//                     pageMetaKeyword: req.body.page_Meta_Keyword,
//                     pageHeading: req.body.page_Heading,
//                     // pagePhoto: req.file.filename,
//                     pageDetails: req.body.page_Details
//                 })
//                 .then((x) => {
//                     req.flash('success', 'Your data has been added successfully')
//                      res.redirect('/admin/page/')
//                 })
        
//             } else {
        
//                 pageModel.create({
//                     pageUrl: req.body.page_Url,
//                     pageNavText: req.body.page_Nav_Text,
//                     pageTitle: req.body.page_Title,
//                     pageMetaDescription: req.body.page_Meta_Description,
//                     pageMetaKeyword: req.body.page_Meta_Keyword,
//                     pageHeading: req.body.page_Heading,
//                     pagePhoto: req.file.filename,
//                     pageDetails: req.body.page_Details
//                 })
//                 .then((x) => {
//                     req.flash('success', 'Your data has been added successfully')
//                      res.redirect('/admin/page/')
//                 })
        
//             }

//         }
//     })




    

// })

router.get('/edit-page/:id', (req,res) => {
    pageModel.findOne({ pageUrl: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-page-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-page/:id', upload.single('page_Photo'), (req,res) => {
    if(req.file){
        pageModel.updateOne({ pageUrl: req.params.id }, {$set:{
            pageUrl: req.body.page_Url,
            pageNavText: req.body.page_Nav_Text,
            pageTitle: req.body.page_Title,
            pageMetaDescription: req.body.page_Meta_Description,
            pageMetaKeyword: req.body.page_Meta_Keyword,
            pageHeading: req.body.page_Heading,
            pagePhoto: req.file.filename,
            pageDetails: req.body.page_Details,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/page')
       })

    }else {

        pageModel.updateOne({ pageUrl: req.params.id }, {$set:{
            pageUrl: req.body.page_Url,
            pageNavText: req.body.page_Nav_Text,
            pageTitle: req.body.page_Title,
            pageMetaDescription: req.body.page_Meta_Description,
            pageMetaKeyword: req.body.page_Meta_Keyword,
            pageHeading: req.body.page_Heading,
            // pagePhoto: req.file.filename,
            pageDetails: req.body.page_Details,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/page')
       })

    }
})

router.delete('/delete-page/:id',(req,res) => {
    pageModel.deleteOne({pageUrl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/page')
    })
})


module.exports = router