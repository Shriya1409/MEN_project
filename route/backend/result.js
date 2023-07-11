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
    resultModel.find({})
    .then((x) => {
        res.render('../views/backend/result-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-result/:id', (req,res) => {
    resultModel.findOne({ title: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-result-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-result/:id', upload.single('resultpdf'), (req,res) => {
    if(req.file){
        resultModel.updateOne({ title: req.params.id }, {$set:{
            title: req.body.title,
                    semester: req.body.semester,
                    rc: req.body.rc,
                    date: req.body.date,
                    resultpdf: req.file.filename,
                    reval: req.body.reval,
                    department: req.body.department
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/result')
       })

    }else {

        resultModel.updateOne({ title: req.params.id }, {$set:{
            title: req.body.title,
                    semester: req.body.semester,
                    rc: req.body.rc,
                    date: req.body.date,
                    // resultpdf: req.file.filename,
                    reval: req.body.reval,
                    department: req.body.department
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/result')
       })

    }
})

router.delete('/delete-result/:id',(req,res) => {
    resultModel.deleteOne({title:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/result')
    })
})


module.exports = router