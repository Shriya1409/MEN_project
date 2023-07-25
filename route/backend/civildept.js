let express = require('express');
let multer = require('multer')
let CivildeptModel = require('../../model/civildeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/civildepartmentevents',
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
    CivildeptModel.find({})
    .then((x) => {
        res.render('../views/backend/civildept-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-civildepartment/:id', (req,res) => {
    CivildeptModel.findOne({ eventcivilname: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-civildept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-civildepartment/:id', upload.single('eventcivilphoto'), (req,res) => {
    if(req.file){
        CivildeptModel.updateOne({ eventcivilname: req.params.id }, {$set:{
            eventcivilnav:req.body.eventcivilnav,
            eventcivilname:req.body.eventcivilname,
            eventcivildate:req.body.eventcivildate,
            eventcivilperson: req.body.eventcivilperson,
            eventcivildesc:req.body.eventcivildesc,
            eventcivilphoto:req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/civildepartment')
       })

    }else {

        CivildeptModel.updateOne({ eventcivilname: req.params.id }, {$set:{
            eventcivilnav:req.body.eventcivilnav,
            eventcivilname:req.body.eventcivilname,
            eventcivildate:req.body.eventcivildate,
            eventcivilperson: req.body.eventcivilperson,
            eventcivildesc:req.body.eventcivildesc,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/civildepartment')
       })

    }
})

router.delete('/delete-civildepartment/:id',(req,res) => {
    CivildeptModel.deleteOne({eventcivilname:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/civildepartment')
    })
})


module.exports = router