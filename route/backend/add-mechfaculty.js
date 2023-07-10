let express = require('express');
let multer = require('multer')
let mechfacultyModel = require('../../model/mechfacultyModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/mechfaculty/',
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
        res.render('../views/backend/add-mechfaculty-file')
    })

router.post('/', upload.single('mechfaculty_Photo') , (req,res) => {
    mechfacultyModel.findOne({mechfacultyEmailId: req.body.mechfacultyEmailId})
    .then((a) => {
        if(a) {
            req.flash('err', 'Email already exists, Please try with another email!!')
            res.redirect('/mechfaculty/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                mechfacultyModel.create({
                    mechfacultyName: req.body.mechfaculty_Name,
                    mechfacultyQualification: req.body.mechfaculty_Qualification,
                    mechfacultyDepartment: req.body.mechfaculty_Department,
                    mechfacultyJoiningYear: req.body.mechfaculty_JoiningYear,
                    mechfacultyEmailId: req.body.mechfaculty_EmailId,
                    // mechfacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/mechfaculty/')
                })
        
            } else {
        
                mechfacultyModel.create({
                    mechfacultyName: req.body.mechfaculty_Name,
                    mechfacultyQualification: req.body.mechfaculty_Qualification,
                    mechfacultyDepartment: req.body.mechfaculty_Department,
                    mechfacultyJoiningYear: req.body.mechfaculty_JoiningYear,
                    mechfacultyEmailId: req.body.mechfaculty_EmailId,
                    mechfacultyPhoto: req.file.filename,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/mechfaculty/')
                })
        
            }

        }
    })




    

})

module.exports = router