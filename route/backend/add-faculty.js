let express = require('express');
let multer = require('multer')
let facultyModel = require('../../model/facultyModel')
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

router.post('/', upload.single('faculty_Photo') , (req,res) => {
    facultyModel.findOne({facultyEmailId: req.body.facultyEmailId})
    .then((a) => {
        if(a) {
            req.flash('err', 'Email already exists, Please try with another email!!')
            res.redirect('/faculty/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                facultyModel.create({
                    facultyName: req.body.faculty_Name,
                    facultyQualification: req.body.faculty_Qualification,
                    facultyDepartment: req.body.faculty_Department,
                    facultyJoiningYear: req.body.faculty_JoiningYear,
                    facultyEmailId: req.body.faculty_EmailId,
                    // facultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/faculty/')
                })
        
            } else {
        
                facultyModel.create({
                    facultyName: req.body.faculty_Name,
                    facultyQualification: req.body.faculty_Qualification,
                    facultyDepartment: req.body.faculty_Department,
                    facultyJoiningYear: req.body.faculty_JoiningYear,
                    facultyEmailId: req.body.faculty_EmailId,
                    facultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/faculty/')
                })
        
            }

        }
    })




    

})

module.exports = router