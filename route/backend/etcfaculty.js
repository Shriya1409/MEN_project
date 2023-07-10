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
    etcfacultyModel.find({})
    .then((x) => {
        res.render('../views/backend/etcfaculty-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-etcfaculty/:id', (req,res) => {
    etcfacultyModel.findOne({ etcfacultyEmailId: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-etcfaculty-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-etcfaculty/:id', upload.single('etcfaculty_Photo'), (req,res) => {
    if(req.file){
        etcfacultyModel.updateOne({ etcfacultyEmailId: req.params.id }, {$set:{
            etcfacultyName: req.body.etcfaculty_Name,
            etcfacultyQualification: req.body.etcfaculty_Qualification,
            etcfacultyDepartment: req.body.etcfaculty_Department,
            etcfacultyJoiningYear: req.body.etcfaculty_JoiningYear,
            etcfacultyEmailId: req.body.etcfaculty_EmailId,
            etcfacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/etcfaculty')
       })

    }else {

        etcfacultyModel.updateOne({ etcfacultyEmailId: req.params.id }, {$set:{
            etcfacultyName: req.body.etcfaculty_Name,
            etcfacultyQualification: req.body.etcfaculty_Qualification,
            etcfacultyDepartment: req.body.etcfaculty_Department,
            etcfacultyJoiningYear: req.body.etcfaculty_JoiningYear,
            etcfacultyEmailId: req.body.etcfaculty_EmailId,
           // etcfacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/etcfaculty')
       })

    }
})

router.delete('/delete-etcfaculty/:id',(req,res) => {
    etcfacultyModel.deleteOne({etcfacultyEmailId:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/etcfaculty')
    })
})


module.exports = router