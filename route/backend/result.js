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

router.get('/', (req,res) => {
    resultModel.find({})
    .then((x) => {
        res.render('../views/backend/result-file', {x})
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

router.get('/edit-result/:id', (req,res) => {
    resultModel.findOne({ pageUrll: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-result-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-result/:id', upload.single('page_Photoo'), (req,res) => {
    if(req.file){
        resultModel.updateOne({ pageUrll: req.params.id }, {$set:{
            pageUrll: req.body.page_Urll,
            pageNavTextt: req.body.page_Nav_Textt,
            pageTitlee: req.body.page_Titlee,
            pageMetaDescriptionn: req.body.page_Meta_Descriptionn,
            pageMetaKeywordd: req.body.page_Meta_Keywordd,
            pageHeadingg: req.body.page_Headingg,
            pagePhotoo: req.file.filename,
            pageDetailss: req.body.page_Detailss,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/result')
       })

    }else {

        resultModel.updateOne({ pageUrll: req.params.id }, {$set:{
            pageUrll: req.body.page_Urll,
            pageNavTextt: req.body.page_Nav_Textt,
            pageTitlee: req.body.page_Titlee,
            pageMetaDescriptionn: req.body.page_Meta_Descriptionn,
            pageMetaKeywordd: req.body.page_Meta_Keywordd,
            pageHeadingg: req.body.page_Headingg,
            // pagePhoto: req.file.filename,
            pageDetailss: req.body.page_Detailss,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/result')
       })

    }
})

router.delete('/delete-result/:id',(req,res) => {
    resultModel.deleteOne({pageUrll:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/result')
    })
})


module.exports = router