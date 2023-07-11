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
    enefacultyModel.find({})
    .then((x) => {
        res.render('../views/backend/enefaculty-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-enefaculty/:id', (req,res) => {
    enefacultyModel.findOne({ enefacultyEmailId: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-enefaculty-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-enefaculty/:id', upload.single('enefaculty_Photo'), (req,res) => {
    if(req.file){
        enefacultyModel.updateOne({ enefacultyEmailId: req.params.id }, {$set:{
            enefacultyName: req.body.enefaculty_Name,
            enefacultyQualification: req.body.enefaculty_Qualification,
            enefacultyDepartment: req.body.enefaculty_Department,
            enefacultyJoiningYear: req.body.enefaculty_JoiningYear,
            enefacultyEmailId: req.body.enefaculty_EmailId,
            enefacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/enefaculty')
       })

    }else {

        enefacultyModel.updateOne({ enefacultyEmailId: req.params.id }, {$set:{
            enefacultyName: req.body.enefaculty_Name,
            enefacultyQualification: req.body.enefaculty_Qualification,
            enefacultyDepartment: req.body.enefaculty_Department,
            enefacultyJoiningYear: req.body.enefaculty_JoiningYear,
            enefacultyEmailId: req.body.enefaculty_EmailId,
            //enefacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/enefaculty')
       })

    }
})

router.delete('/delete-enefaculty/:id',(req,res) => {
    enefacultyModel.deleteOne({enefacultyEmailId:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/enefaculty')
    })
})


module.exports = router