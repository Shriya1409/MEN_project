let express = require('express');
let multer = require('multer')
let compfacultyModel = require('../../model/compfacultyModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/compfaculty/',
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
        res.render('../views/backend/add-compfaculty-file')
    })

router.post('/', upload.single('compfaculty_Photo') , (req,res) => {
    compfacultyModel.findOne({compfacultyEmailId: req.body.compfacultyEmailId})
    .then((a) => {
        if(a) {
            req.flash('err', 'Email already exists, Please try with another email!!')
            res.redirect('/compfaculty/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                compfacultyModel.create({
                    compfacultyName: req.body.compfaculty_Name,
                    compfacultyQualification: req.body.compfaculty_Qualification,
                    compfacultyDepartment: req.body.compfaculty_Department,
                    compfacultyJoiningYear: req.body.compfaculty_JoiningYear,
                    compfacultyEmailId: req.body.compfaculty_EmailId,
                    // compfacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/compfaculty/')
                })
        
            } else {
        
                compfacultyModel.create({
                    compfacultyName: req.body.compfaculty_Name,
                    compfacultyQualification: req.body.compfaculty_Qualification,
                    compfacultyDepartment: req.body.compfaculty_Department,
                    compfacultyJoiningYear: req.body.compfaculty_JoiningYear,
                    compfacultyEmailId: req.body.compfaculty_EmailId,
                    compfacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/compfaculty/')
                })
        
            }

        }
    })




    

})

module.exports = router