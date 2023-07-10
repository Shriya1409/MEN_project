let express = require('express');
let multer = require('multer')
let compfacultyModel = require('../../model/compfacultyModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/compfaculty/',
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
    compfacultyModel.find({})
    .then((x) => {
        res.render('../views/backend/compfaculty-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-compfaculty/:id', (req,res) => {
    compfacultyModel.findOne({ compfacultyEmailId: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-compfaculty-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-compfaculty/:id', upload.single('compfaculty_Photo'), (req,res) => {
    if(req.file){
        compfacultyModel.updateOne({ compfacultyEmailId: req.params.id }, {$set:{
            compfacultyName: req.body.compfaculty_Name,
            compfacultyQualification: req.body.compfaculty_Qualification,
            compfacultyDepartment: req.body.compfaculty_Department,
            compfacultyJoiningYear: req.body.compfaculty_JoiningYear,
            compfacultyEmailId: req.body.compfaculty_EmailId,
            compfacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/compfaculty')
       })

    }else {

        compfacultyModel.updateOne({ compfacultyEmailId: req.params.id }, {$set:{
            compfacultyName: req.body.compfaculty_Name,
            compfacultyQualification: req.body.compfaculty_Qualification,
            compfacultyDepartment: req.body.compfaculty_Department,
            compfacultyJoiningYear: req.body.compfaculty_JoiningYear,
            compfacultyEmailId: req.body.compfaculty_EmailId,
            //compfacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/compfaculty')
       })

    }
})

router.delete('/delete-compfaculty/:id',(req,res) => {
    compfacultyModel.deleteOne({compfacultyEmailId:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/compfaculty')
    })
})


module.exports = router