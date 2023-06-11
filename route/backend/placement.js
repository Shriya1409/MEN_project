let express = require('express');
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



router.get('/', (req,res) => {
    plcmtModel.find({})
    .then((x) => {
        res.render('../views/backend/placement-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})

//  router.get('/add-placement', (req,res) => {
//      res.render('../views/backend/add-placement-file') })

 router.post('/add-placement' , (req,res) => {
     plcmtModel.findOne({pageUrl: req.body.page_Url})
  .then((a) => {
        if(a) {
             req.flash('err', 'Url already exists, Please try with another url!!')
             res.redirect('/placement')
             console.log('Url already exists, Please try with another url!!')        } else {

            if(!req.file) {

                plcmtModel.create({
                    pageUrl: req.body.page_Url,
                    pageNavText: req.body.page_Nav_Text,
                     pageTitle: req.body.page_Title,
                    pageMetaDescription: req.body.page_Meta_Description,
                     pageMetaKeyword: req.body.page_Meta_Keyword,
                    pageHeading: req.body.page_Heading,
                    // pagePhoto: req.file.filename,
                    pageDetails: req.body.page_Details
                 })                 .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                      res.redirect('/placement')
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
                      res.redirect('/placement')
                })
        
             }

       }
  })



 })
    



 router.get('/edit-placement/:id', (req,res) => {
    plcmtModel.findOne({ pageUrl: req.params.id })
     .then((x) => {
         res.render('../views/backend/edit-placement-file', {x})
     })
     .catch((y) => {
         console.log(y)
     })
 })

 router.put('/edit-placement/:id', (req,res) => {
     if(req.file){
        plcmtModel.updateOne({ pageUrl: req.params.id }, {$set:{
            pageUrl: req.body.page_Url,
             pageNavText: req.body.page_Nav_Text,
             pageTitle: req.body.page_Title,
             pageMetaDescription: req.body.page_Meta_Description,
             pageMetaKeyword: req.body.page_Meta_Keyword,
            pageHeading: req.body.page_Heading,
             pageDetails: req.body.page_Details,
         }})
        .then((x) => {
                     req.flash('success', 'Your data has been updated successfully')
         res.redirect('/placement')
        })

    }else {

         plcmtModel.updateOne({ pageUrl: req.params.id }, {$set:{
             pageUrl: req.body.page_Url,             
             pageNavText: req.body.page_Nav_Text,
             pageTitle: req.body.page_Title,
             pageMetaDescription: req.body.page_Meta_Description,
             pageMetaKeyword: req.body.page_Meta_Keyword,
            pageHeading: req.body.page_Heading,
             pageDetails: req.body.page_Details,
        }})
                .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/placement')
       })

     }
 })

router.delete('/delete-placement/:id',(req,res) => {
    plcmtModel.deleteOne({pageUrl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/placement')
    })
})


module.exports = router;