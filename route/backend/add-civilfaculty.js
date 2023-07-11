let express = require('express');
let multer = require('multer')
let civilfacultyModel = require('../../model/civilfacultyModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/civilfaculty/',
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
        res.render('../views/backend/add-civilfaculty-file')
    })

router.post('/', upload.single('civilfaculty_Photo') , (req,res) => {
    civilfacultyModel.findOne({civilfacultyEmailId: req.body.civilfacultyEmailId})
    .then((a) => {
        if(a) {
            req.flash('err', 'Email already exists, Please try with another email!!')
            res.redirect('/civilfaculty/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                civilfacultyModel.create({
                    civilfacultyName: req.body.civilfaculty_Name,
                    civilfacultyQualification: req.body.civilfaculty_Qualification,
                    civilfacultyDepartment: req.body.civilfaculty_Department,
                    civilfacultyJoiningYear: req.body.civilfaculty_JoiningYear,
                    civilfacultyEmailId: req.body.civilfaculty_EmailId,
                    //civilfacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/civilfaculty/')
                })
        
            } else {
        
            civilfacultyModel.create({
            civilfacultyName: req.body.civilfaculty_Name,
            civilfacultyQualification: req.body.civilfaculty_Qualification,
            civilfacultyDepartment: req.body.civilfaculty_Department,
            civilfacultyJoiningYear: req.body.civilfaculty_JoiningYear,
            civilfacultyEmailId: req.body.civilfaculty_EmailId,
            civilfacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/civilfaculty/')
                })
        
            }

        }
    })




    

})

module.exports = router