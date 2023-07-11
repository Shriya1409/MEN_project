let express = require('express');
let multer = require('multer')
let etcfacultyModel = require('../../model/etcfacultyModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/etcfaculty/',
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
        res.render('../views/backend/add-etcfaculty-file')
    })

router.post('/', upload.single('etcfaculty_Photo') , (req,res) => {
    etcfacultyModel.findOne({etcfacultyEmailId: req.body.etcfacultyEmailId})
    .then((a) => {
        if(a) {
            req.flash('err', 'Email already exists, Please try with another email!!')
            res.redirect('/etcfaculty/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                etcfacultyModel.create({
                    etcfacultyName: req.body.etcfaculty_Name,
                    etcfacultyQualification: req.body.etcfaculty_Qualification,
                    etcfacultyDepartment: req.body.etcfaculty_Department,
                    etcfacultyJoiningYear: req.body.etcfaculty_JoiningYear,
                    etcfacultyEmailId: req.body.etcfaculty_EmailId,
                    // etcfacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/etcfaculty/')
                })
        
            } else {
        
                etcfacultyModel.create({
                    etcfacultyName: req.body.etcfaculty_Name,
                    etcfacultyQualification: req.body.etcfaculty_Qualification,
                    etcfacultyDepartment: req.body.etcfaculty_Department,
                    etcfacultyJoiningYear: req.body.etcfaculty_JoiningYear,
                    etcfacultyEmailId: req.body.etcfaculty_EmailId,
                    etcfacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/etcfaculty/')
                })
        
            }

        }
    })




    

})

module.exports = router