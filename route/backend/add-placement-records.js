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
        res.render('../views/backend/add-plcmt-records')
    })

router.post('/',  (req,res) => {
    plcmtRecords.findOne({RollNo: req.body.rollno})
    .then((a) => {
        if(a) {
            req.flash('err', 'Url already exists, Please try with another url!!')
            res.redirect('/placement-records/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.body) {

                plcmtRecords.create({
                    student_name: req.body.student_name,
                     rollno: req.body.rollno,
                     department: req.body.department,
                     batchyr: req.body.batchyr,
                     cgpa: req.body.cgpa,
                     company: req.body.company,
                     semno: req.body.semno,
                     package: req.body.package
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/placement-records/')
                })
        
            }
         else {
        
                 plcmtRecords.create({
                    student_name: req.body.student_name,
                     rollno: req.body.rollno,
                     department: req.body.department,
                     batchyr: req.body.batchyr,
                     cgpa: req.body.cgpa,
                     company: req.body.company,
                     semno: req.body.semno,
                     package: req.body.package
                 })
                 .then((x) => {
                     req.flash('success', 'Your data has been added successfully')
                      res.redirect('/placement-records/')
                 })
        
             }

         }
    })




    

})

module.exports = router;