let express = require('express')
let multer = require('multer')
let facultyModel = require('../../model/facultyModel');
let router = express();

// storage & file name setting
 let storage = multer.diskStorage({
     destination:'public/backend/faculty/',
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
        res.render('../views/backend/add-faculty-file')
    })

router.post('/', upload.single('facultyPhoto'),  (req,res) => {
    facultyModel.findOne({faculty_name: req.body.faculty_name})
    .then((i) => {
        if(i) {
            req.flash('err', 'Url already exists, Please try with another url!!')
            res.redirect('/faculty/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.body) {

                facultyModel.create({
                  faculty_name:req.body.faculty_name,
                  qualification:req.body.qualification,
                  department:req.body.department,
                  joining_year: req.body.joining_year,
                  emailid:req.body.emailid
                    //  facultyPhoto: req.body.facultyPhoto
                })
                .then((i) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/faculty/')
                })
        
            }
         else {
        
                 facultyModel.create({
                    faculty_name:req.body.faculty_name,
                    qualification:req.body.qualification,
                    department:req.body.department,
                    joining_year:req.body.joining_year,
                    emailid:req.body.emailid,
                    facultyPhoto: req.body.facultyPhoto
                 })
                 .then((i) => {
                     req.flash('success', 'Your data has been added successfully')
                      res.redirect('/faculty/')
                 })
        
             }

         }
    })
 

})

module.exports = router;