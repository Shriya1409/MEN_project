let express = require('express');
let multer = require('multer')
let syllabusModel = require('../../model/syllabusModel')
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
        if(file.mimetype == 'application/pdf' ) {
            cb(null, true)
        }
        else {
            cb(null,false);
             return cb(new Error('Only application format(pdf) are allowed!!'))
        }
    }
})

router.get('/', (req,res) => {
    syllabusModel.find({})
    .then((g) => {
        res.render('../views/backend/syllabus-file', {g})
        // console.log(x)
    })
    .catch((h) => {
        console.log(h)
    })
})



router.get('/edit-syllabus/:id', (req,res) => {
    syllabusModel.findOne({ syllabus_title: req.params.id })
    .then((g) => {
        res.render('../views/backend/edit-syllabus-file', {g})
    })
    .catch((h) => {
        console.log(h)
    })
})

router.put('/edit-syllabus/:id', upload.single('syllabuspdf'), (req,res) => {
    if(req.file){
        syllabusModel.updateOne({ syllabus_title: req.params.id }, {$set:{
                    syllabus_title: req.body.syllabus_title,
                    department: req.body.department,
                    rc: req.body.rc,
                    syllabuspdf: req.file.filename
        }})
       .then((g) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/syllabus')
       })

    }else {
        syllabusModel.updateOne({ syllabus_title: req.params.id }, {$set:{
            syllabus_title: req.body.syllabus_title,
            department: req.body.department,
            rc: req.body.rc,
            // syllabuspdf: req.file.filename
}})
.then((g) => {
req.flash('success', 'Your data has been updated successfully')
res.redirect('/syllabus')
})

    }
})

router.delete('/delete-syllabus/:id',(req,res) => {
    syllabusModel.deleteOne({syllabus_title:req.params.id})
    .then((g) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/syllabus')
    })
})


module.exports = router