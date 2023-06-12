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

//  router.post('/add-placement' , (req,res) => {
//      plcmtModel.findOne({pageUrl: req.body.page_Url})
//   .then((a) => {
//         if(a) {
//              req.flash('err', 'Url already exists, Please try with another url!!')
//              res.redirect('/placement')
//              console.log('Url already exists, Please try with another url!!')        } else {

//             if(!req.file) {

//                 plcmtModel.create({
//                     pageUrl: req.body.page_Url,
//                     pageNavText: req.body.page_Nav_Text,
//                      pageTitle: req.body.page_Title,
//                     pageMetaDescription: req.body.page_Meta_Description,
//                      pageMetaKeyword: req.body.page_Meta_Keyword,
//                     pageHeading: req.body.page_Heading,
//                     // pagePhoto: req.file.filename,
//                     pageDetails: req.body.page_Details
//                  })                 .then((x) => {
//                     req.flash('success', 'Your data has been added successfully')
//                       res.redirect('/placement')
//                 })
        
//             } else {
        
//                 plcmtModel.create({
//                     pageUrl: req.body.page_Url,
//                      pageNavText: req.body.page_Nav_Text,
//                     pageTitle: req.body.page_Title,
//                      pageMetaDescription: req.body.page_Meta_Description,
//                     pageMetaKeyword: req.body.page_Meta_Keyword,
//                      pageHeading: req.body.page_Heading,
//                     //  pagePhoto: req.file.filename,
//                      pageDetails: req.body.page_Details
//                  })
//                  .then((x) => {
//                    req.flash('success', 'Your data has been added successfully')
//                       res.redirect('/placement')
//                 })
        
//              }

//        }
//   })



//  })
    



 router.get('/edit-placement/:id', (req,res) => {
    plcmtModel.findOne({ plcmtUrl: req.params.id })
     .then((x) => {
         res.render('../views/backend/edit-plcmt-file', {x})
     })
     .catch((y) => {
         console.log(y)
     })
 })

 router.put('/edit-placement/:id', upload.single('page_Photo'), (req,res) => {
     if(req.file){
        plcmtModel.updateOne({ plcmtUrl: req.params.id }, {$set:{
            plcmtUrl: req.body.page_Url,
             plcmtNavText: req.body.page_Nav_Text,
             plcmtTitle: req.body.page_Title,
             plcmtMetaDescription: req.body.page_Meta_Description,
             plcmtMetaKeyword: req.body.page_Meta_Keyword,
             plcmtHeading: req.body.page_Heading,
             plcmtPhoto: req.file.filename,
             plcmtDetails: req.body.page_Details,
         }})
        .then((x) => {
                     req.flash('success', 'Your data has been updated successfully')
         res.redirect('/placement')
        })

    }else {

         plcmtModel.updateOne({ plcmtUrl: req.params.id }, {$set:{
             plcmtUrl: req.body.page_Url,             
             plcmtNavText: req.body.page_Nav_Text,
             plcmtTitle: req.body.page_Title,
             plcmtMetaDescription: req.body.page_Meta_Description,
             plcmtMetaKeyword: req.body.page_Meta_Keyword,
            plcmtHeading: req.body.page_Heading,
            //pagePhoto: req.file.filename,
             plcmtDetails: req.body.page_Details,
        }})
                .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/placement')
       })

     }
 })

router.delete('/delete-placement/:id',(req,res) => {
    plcmtModel.deleteOne({plcmtUrl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/placement')
    })
})


module.exports = router;