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
    mechfacultyModel.find({})
    .then((x) => {
        res.render('../views/backend/mechfaculty-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-mechfaculty/:id', (req,res) => {
    mechfacultyModel.findOne({ mechfacultyEmailId: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-mechfaculty-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-mechfaculty/:id', upload.single('mechfaculty_Photo'), (req,res) => {
    if(req.file){
        mechfacultyModel.updateOne({ mechfacultyEmailId: req.params.id }, {$set:{
            mechfacultyName: req.body.mechfaculty_Name,
            mechfacultyQualification: req.body.mechfaculty_Qualification,
            mechfacultyDepartment: req.body.mechfaculty_Department,
            mechfacultyJoiningYear: req.body.mechfaculty_JoiningYear,
            mechfacultyEmailId: req.body.mechfaculty_EmailId,
            mechfacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/mechfaculty')
       })

    }else {

        mechfacultyModel.updateOne({ mechfacultyEmailId: req.params.id }, {$set:{
            mechfacultyName: req.body.mechfaculty_Name,
            mechfacultyQualification: req.body.mechfaculty_Qualification,
            mechfacultyDepartment: req.body.mechfaculty_Department,
            mechfacultyJoiningYear: req.body.mechfaculty_JoiningYear,
            mechfacultyEmailId: req.body.mechfaculty_EmailId,
           // mechfacultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/mechfaculty')
       })

    }
})

router.delete('/delete-mechfaculty/:id',(req,res) => {
    mechfacultyModel.deleteOne({mechfacultyEmailId:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/mechfaculty')
    })
})


module.exports = router