let express = require('express');
let multer = require('multer')
let CompdeptModel = require('../../model/compdeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/compdepartmentevents/',
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
    CompdeptModel.find({})
    .then((x) => {
        res.render('../views/backend/compdept-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-compdepartment/:id', (req,res) => {
    CompdeptModel.findOne({ eventcompname: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-compdept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-compdepartment/:id', upload.single('compdept_Photo'), (req,res) => {
    if(req.file){
        CompdeptModel.updateOne({ eventcompname: req.params.id }, {$set:{
            eventcompnav:req.body.eventcompnav,
            eventcompname:req.body.eventcompname,
            eventcompdate:req.body.eventcompdate,
            eventcompperson: req.body.eventcompperson,
            eventcompdesc:req.body.eventcompdesc,
            eventcompphoto:req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/compdepartment')
       })

    }else {

        CompdeptModel.updateOne({ eventcompname: req.params.id }, {$set:{
            eventcompnav:req.body.eventcompnav,
            eventcompname:req.body.eventcompname,
            eventcompdate:req.body.eventcompdate,
            eventcompperson: req.body.eventcompperson,
            eventcompdesc:req.body.eventcompdesc,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/compdepartment')
       })

    }
})

router.delete('/delete-compdepartment/:id',(req,res) => {
    CompdeptModel.deleteOne({eventcompname:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/compdepartment')
    })
})


module.exports = router