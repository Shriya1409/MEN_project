let express = require('express');
let multer = require('multer')
let facultyModel = require('../../model/facultyModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/faculty/',
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
    facultyModel.find({})
    .then((x) => {
        res.render('../views/backend/faculty-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-faculty/:id', (req,res) => {
    facultyModel.findOne({ facultyEmailId: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-faculty-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-faculty/:id', upload.single('faculty_Photo'), (req,res) => {
    if(req.file){
        facultyModel.updateOne({ facultyEmailId: req.params.id }, {$set:{
                    facultyName: req.body.faculty_Name,
                    facultyQualification: req.body.faculty_Qualification,
                    facultyDepartment: req.body.faculty_Department,
                    facultyJoiningYear: req.body.faculty_JoiningYear,
                    facultyEmailId: req.body.faculty_EmailId,
                    facultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/faculty')
       })

    }else {

        facultyModel.updateOne({ facultyEmailId: req.params.id }, {$set:{
                    facultyName: req.body.faculty_Name,
                    facultyQualification: req.body.faculty_Qualification,
                    facultyDepartment: req.body.faculty_Department,
                    facultyJoiningYear: req.body.faculty_JoiningYear,
                    facultyEmailId: req.body.faculty_EmailId,
                    //facultyPhoto: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/faculty')
       })

    }
})

router.delete('/delete-faculty/:id',(req,res) => {
    facultyModel.deleteOne({facultyEmailId:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/faculty')
    })
})


module.exports = router