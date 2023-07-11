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
    civilfacultyModel.find({})
    .then((x) => {
        res.render('../views/backend/civilfaculty-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-civilfaculty/:id', (req,res) => {
    civilfacultyModel.findOne({ civilfacultyEmailId: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-civilfaculty-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-civilfaculty/:id', upload.single('civilfaculty_Photo'), (req,res) => {
    if(req.file){
        civilfacultyModel.updateOne({ civilfacultyEmailId: req.params.id }, {$set:{
            civilfacultyName: req.body.civilfaculty_Name,
            civilfacultyQualification: req.body.civilfaculty_Qualification,
            civilfacultyDepartment: req.body.civilfaculty_Department,
            civilfacultyJoiningYear: req.body.civilfaculty_JoiningYear,
            civilfacultyEmailId: req.body.civilfaculty_EmailId,
            civilfacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/civilfaculty')
       })

    }else {

        civilfacultyModel.updateOne({ civilfacultyEmailId: req.params.id }, {$set:{
            civilfacultyName: req.body.civilfaculty_Name,
            civilfacultyQualification: req.body.civilfaculty_Qualification,
            civilfacultyDepartment: req.body.civilfaculty_Department,
            civilfacultyJoiningYear: req.body.civilfaculty_JoiningYear,
            civilfacultyEmailId: req.body.civilfaculty_EmailId,
            //civilfacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/civilfaculty')
       })

    }
})

router.delete('/delete-civilfaculty/:id',(req,res) => {
    civilfacultyModel.deleteOne({civilfacultyEmailId:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/civilfaculty')
    })
})


module.exports = router