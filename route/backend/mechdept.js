let express = require('express');
let multer = require('multer')
let MechdeptModel = require('../../model/mechdeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/mechdepartmentevents',
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
    MechdeptModel.find({})
    .then((x) => {
        res.render('../views/backend/mechdept-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-mechdepartment/:id', (req,res) => {
    MechdeptModel.findOne({ eventmechname: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-mechdept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-mechdepartment/:id', upload.single('eventmechphoto'), (req,res) => {
    if(req.file){
        MechdeptModel.updateOne({ eventmechname: req.params.id }, {$set:{
            eventmechnav:req.body.eventmechnav,
            eventmechname:req.body.eventmechname,
            eventmechdate:req.body.eventmechdate,
            eventmechperson: req.body.eventmechperson,
            eventmechdesc:req.body.eventmechdesc,
            eventmechphoto:req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/mechdepartment')
       })

    }else {

        MechdeptModel.updateOne({ eventmechname: req.params.id }, {$set:{
            eventmechnav:req.body.eventmechnav,
            eventmechname:req.body.eventmechname,
            eventmechdate:req.body.eventmechdate,
            eventmechperson: req.body.eventmechperson,
            eventmechdesc:req.body.eventmechdesc,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/mechdepartment')
       })

    }
})

router.delete('/delete-mechdepartment/:id',(req,res) => {
    MechdeptModel.deleteOne({eventmechname:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/mechdepartment')
    })
})


module.exports = router