let express = require('express');
let multer = require('multer')
let ITdeptModel = require('../../model/itdeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/itdepartmentevents',
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
    ITdeptModel.find({})
    .then((x) => {
        res.render('../views/backend/itdept-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-itdepartment/:id', (req,res) => {
    ITdeptModel.findOne({ eventitdepturl: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-itdept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-itdepartment/:id', upload.single('eventitphoto'), (req,res) => {
    if(req.file){
        ITdeptModel.updateOne({ eventitdepturl: req.params.id }, {$set:{
            eventitdepturl: req.body.eventitdepturl,
            eventitdeptnavtext: req.body.eventitdeptnavtext,
            eventitdepttitle: req.body.eventitdepttitle,
            eventitnav:req.body.eventitnav,
            eventitname:req.body.eventitname,
            eventitdate:req.body.eventitdate,
            eventitperson: req.body.eventitperson,
            eventitdesc:req.body.eventitdesc,
            eventitphoto:req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/itdepartment')
       })

    }else {

        ITdeptModel.updateOne({ eventitdepturl: req.params.id }, {$set:{
            eventitdepturl: req.body.eventitdepturl,
            eventitdeptnavtext: req.body.eventitdeptnavtext,
            eventitdepttitle: req.body.eventitdepttitle,
            eventitnav:req.body.eventitnav,
            eventitname:req.body.eventitname,
            eventitdate:req.body.eventitdate,
            eventitperson: req.body.eventitperson,
            eventitdesc:req.body.eventitdesc,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/itdepartment')
       })

    }
})

router.delete('/delete-itdepartment/:id',(req,res) => {
    ITdeptModel.deleteOne({eventitdepturl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/itdepartment')
    })
})


module.exports = router