let express = require('express')
let multer = require('multer')


let facultyModel = require('../../model/facultyModel');
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
    .then((i) => {
        res.render('../views/backend/faculty-file', {i})
        // console.log(x)
    })
    .catch((j) => {
        console.log(j)
    })
})



 router.get('/edit-faculty/:id', (req,res) => {
    facultyModel.findOne({ faculty_name: req.params.id })
     .then((i) => {
         res.render('../views/backend/edit-faculty-file', {i})
     })
     .catch((j) => {
         console.log(j)
     })
 })

 router.put('/edit-faculty/:id', upload.single('facultyPhoto'), (req,res) => {
     if(req.file){
    facultyModel.updateOne({ faculty_name: req.params.id }, {$set:{
            faculty_name: req.body.faculty_name,
            qualification: req.body.qualification,
            department: req.body.department,
            joining_year: req.body.joining_year,
            emailid: req.body.emailid,
            facultyPhoto: req.body.facultyPhoto
         }})
        .then((i) => {
                     req.flash('success', 'Your data has been updated successfully')
         res.redirect('/faculty')
        })

    }
     else {

        facultyModel.updateOne({ faculty_name: req.params.id }, {$set:{
            faculty_name: req.body.faculty_name,
            qualification: req.body.qualification,
            department: req.body.department,
            joining_year: req.body.joining_year,
            emailid: req.body.emailid
         }})
                 .then((i) => {
         req.flash('success', 'Your data has been updated successfully')
         res.redirect('/faculty')
        })

      }
 })

router.delete('/delete-faculty/:id',(req,res) => {
    facultyModel.deleteOne({faculty_name:req.params.id})
    .then((i) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/faculty')
    })
})


module.exports = router;