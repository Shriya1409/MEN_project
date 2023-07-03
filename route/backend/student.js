let express = require('express')
let multer = require('multer')


const studRecords = require('../../model/studRecords');
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/studentR/',
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
    studRecords.find({})
    .then((o) => {
        res.render('../views/backend/student-record', {o})
        // console.log(x)
    })
    .catch((u) => {
        console.log(u)
    })
})







 router.get('/edit-student/:id', (req,res) => {
    studRecords.findOne({ rollnoo: req.params.id })
     .then((o) => {
         res.render('../views/backend/edit-student-records', {o})
     })
     .catch((u) => {
         console.log(u)
     })
 })

 router.put('/edit-student/:id', upload.single('recPhoto'), (req,res) => {
     if(req.file){
        studRecords.updateOne({ rollnoo: req.params.id }, {$set:{
            stud_name: req.body.stud_name,
            rollnoo: req.body.rollnoo,
            depart: req.body.depart,
            yr: req.body.yr,
            cgpa: req.body.cgpa,
            pr: req.body.pr,
            sem: req.body.sem,
            backlog: req.body.backlog,
            recPhoto: req.body.recPhoto
         }})
        .then((o) => {
                     req.flash('success', 'Your data has been updated successfully')
         res.redirect('/student')
        })

    }
     else {

        studRecords.updateOne({ rollnoo: req.params.id }, {$set:{
            stud_name: req.body.stud_name,
            rollnoo: req.body.rollnoo,
            depart: req.body.depart,
            yr: req.body.yr,
            cgpa: req.body.cgpa,
            pr: req.body.pr,
            sem: req.body.sem,
            backlog: req.body.backlog,
         }})
                 .then((o) => {
         req.flash('success', 'Your data has been updated successfully')
         res.redirect('/student')
        })

      }
 })

router.delete('/delete-student/:id',(req,res) => {
    studRecords.deleteOne({rollnoo:req.params.id})
    .then((o) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/student')
    })
})


module.exports = router;