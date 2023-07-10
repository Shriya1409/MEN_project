let express = require('express');
let multer = require('multer')
let CompdeptModel = require('../../model/compdeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/departments/',
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
    CompdeptModel.findOne({ compdeptUrl: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-compdept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-compdepartment/:id', upload.single('compdept_Photo'), (req,res) => {
    if(req.file){
        CompdeptModel.updateOne({ compdeptUrl: req.params.id }, {$set:{
            compdeptUrl: req.body.compdept_Url,
            compdeptNavText: req.body.compdept_Nav_Text,
            compdeptTitle: req.body.compdept_Title,
            compdeptHeading: req.body.compdept_Heading,
            compdeptPhoto: req.file.filename,
            compdeptDetails: req.body.compdept_Details
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/compdepartment')
       })

    }else {

        CompdeptModel.updateOne({ compdeptUrl: req.params.id }, {$set:{
            compdeptUrl: req.body.compdept_Url,
            compdeptNavText: req.body.compdept_Nav_Text,
            compdeptTitle: req.body.compdept_Title,
            compdeptHeading: req.body.compdept_Heading,
            // compdeptPhoto: req.file.filename,
            compdeptDetails: req.body.compdept_Details
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/compdepartment')
       })

    }
})

router.delete('/delete-compdepartment/:id',(req,res) => {
    CompdeptModel.deleteOne({compdeptUrl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/compdepartment')
    })
})


module.exports = router