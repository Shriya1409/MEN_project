let express = require('express')
let multer = require('multer')


const plcmtRecords = require('../../model/plcmtRecords');
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
    plcmtRecords.find({})
    .then((x) => {
        res.render('../views/backend/plcmt-records', {x})
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
    



 router.get('/edit-placement-records/:id', (req,res) => {
    plcmtRecords.findOne({ rollno: req.params.id })
     .then((x) => {
         res.render('../views/backend/edit-plcmt-records', {x})
     })
     .catch((y) => {
         console.log(y)
     })
 })

 router.put('/edit-placement-records/:id', upload.single('recordPhoto'), (req,res) => {
     if(req.file){
        plcmtRecords.updateOne({ rollno: req.params.id }, {$set:{
            student_name: req.body.student_name,
            rollno: req.body.rollno,
            department: req.body.department,
            batchyr: req.body.batchyr,
            cgpa: req.body.cgpa,
            company: req.body.company,
            semno: req.body.semno,
            package: req.body.package,
            recordPhoto: req.body.recordPhoto
         }})
        .then((x) => {
                     req.flash('success', 'Your data has been updated successfully')
         res.redirect('/placement-records')
        })

    }
     else {

    plcmtRecords.updateOne({ rollno: req.params.id }, {$set:{
        student_name: req.body.student_name,
             rollno: req.body.rollno,
             department: req.body.department,
             batchyr: req.body.batchyr,
             cgpa: req.body.cgpa,
             company: req.body.company,
             semno: req.body.semno,
             package: req.body.package
         }})
                 .then((x) => {
         req.flash('success', 'Your data has been updated successfully')
         res.redirect('/placement-records')
        })

      }
 })

router.delete('/delete-placement-records/:id',(req,res) => {
    plcmtRecords.deleteOne({rollno:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/placement-records')
    })
})


module.exports = router;