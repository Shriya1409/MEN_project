let express = require('express');
let multer = require('multer')
let syllabusModel = require('../../model/syllabusModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/syllabus/',
    filename: (req, file, cb) => {
        // cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'application/pdf') {
            cb(null, true)
        }
        else {
            cb(null,false);
             return cb(new Error('Only application format(pdf) are allowed!!'))
        }
    }
})

router.get('/', (req,res) => {
        res.render('../views/backend/add-syllabus-file')
    })

router.post('/', upload.single('syllabuspdf') , (req,res) => {
    syllabusModel.findOne({syllabus_title: req.body.syllabus_title})
    .then((g) => {
        if(g) {
            req.flash('err', 'Url already exists, Please try with another url!!')
            res.redirect('/syllabus/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                syllabusModel.create({
                    syllabus_title: req.body.syllabus_title,
                    department: req.body.department,
                    rc: req.body.rc,
                    // syllabuspdf: req.file.filename,
                })
                .then((g) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/syllabus')
                })
        
            } else {
        
                
                syllabusModel.create({
                    syllabus_title: req.body.syllabus_title,
                    department: req.body.department,
                    rc: req.body.rc,
                    syllabuspdf: req.file.filename
                })
                .then((g) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/syllabus')
                })
        
            }

        }
    })




    

})

module.exports = router