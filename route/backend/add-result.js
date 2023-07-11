let express = require('express');
let multer = require('multer')
let resultModel = require('../../model/resultModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/results/',
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
        res.render('../views/backend/add-result-file')
    })

router.post('/', upload.single('resultpdf') , (req,res) => {
    resultModel.findOne({title: req.body.title})
    .then((a) => {
        if(a) {
            req.flash('err', 'Url already exists, Please try with another url!!')
            res.redirect('/result/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                resultModel.create({
                    title: req.body.title,
                    semester: req.body.semester,
                    rc: req.body.rc,
                    date: req.body.date,
                    // resultpdf: req.file.filename,
                    reval: req.body.reval,
                    department: req.body.department
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/result')
                })
        
            } else {
        
                resultModel.create({
                    title: req.body.title,
                    semester: req.body.semester,
                    rc: req.body.rc,
                    date: req.body.date,
                    resultpdf: req.file.filename,
                    reval: req.body.reval,
                    department: req.body.department
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/result')
                })
        
            }

        }
    })




    

})

module.exports = router