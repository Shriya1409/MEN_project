let express = require('express');
let multer = require('multer')
let ENEdeptModel = require('../../model/enedeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/enedepartmentevents',
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
    ENEdeptModel.find({})
    .then((x) => {
        res.render('../views/backend/enedept-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-enedepartment/:id', (req,res) => {
    ENEdeptModel.findOne({ eventenename: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-enedept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-enedepartment/:id', upload.single('eventenephoto'), (req,res) => {
    if(req.file){
        ENEdeptModel.updateOne({ eventenename: req.params.id }, {$set:{
            eventenenav:req.body.eventenenav,
            eventenename:req.body.eventenename,
            eventenedate:req.body.eventenedate,
            eventeneperson: req.body.eventeneperson,
            eventenedesc:req.body.eventenedesc,
            eventenephoto:req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/enedepartment')
       })

    }else {

        ENEdeptModel.updateOne({ eventenename: req.params.id }, {$set:{
            eventenenav:req.body.eventenenav,
            eventenename:req.body.eventenename,
            eventenedate:req.body.eventenedate,
            eventeneperson: req.body.eventeneperson,
            eventenedesc:req.body.eventenedesc,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/enedepartment')
       })

    }
})

router.delete('/delete-enedepartment/:id',(req,res) => {
    ENEdeptModel.deleteOne({eventenename:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/enedepartment')
    })
})


module.exports = router