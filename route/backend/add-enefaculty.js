let express = require('express');
let multer = require('multer')
let enefacultyModel = require('../../model/enefacultyModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/enefaculty/',
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
        res.render('../views/backend/add-enefaculty-file')
    })

router.post('/', upload.single('enefaculty_Photo') , (req,res) => {
    enefacultyModel.findOne({enefacultyEmailId: req.body.enefacultyEmailId})
    .then((a) => {
        if(a) {
            req.flash('err', 'Email already exists, Please try with another email!!')
            res.redirect('/enefaculty/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                enefacultyModel.create({
                    enefacultyName: req.body.enefaculty_Name,
                    enefacultyQualification: req.body.enefaculty_Qualification,
                    enefacultyDepartment: req.body.enefaculty_Department,
                    enefacultyJoiningYear: req.body.enefaculty_JoiningYear,
                    enefacultyEmailId: req.body.enefaculty_EmailId,
                    // enefacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/enefaculty/')
                })
        
            } else {
        
                enefacultyModel.create({
                    enefacultyName: req.body.enefaculty_Name,
                    enefacultyQualification: req.body.enefaculty_Qualification,
                    enefacultyDepartment: req.body.enefaculty_Department,
                    enefacultyJoiningYear: req.body.enefaculty_JoiningYear,
                    enefacultyEmailId: req.body.enefaculty_EmailId,
                    enefacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/enefaculty/')
                })
        
            }

        }
    })




    

})

module.exports = router