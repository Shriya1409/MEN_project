let express = require('express');
let multer = require('multer')
let ITdeptModel = require('../../model/itdeptModel')
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
    ITdeptModel.findOne({ itdeptUrl: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-itdept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-itdepartment/:id', upload.single('itdept_Photo'), (req,res) => {
    if(req.file){
        ITdeptModel.updateOne({ itdeptUrl: req.params.id }, {$set:{
            itdeptUrl: req.body.itdept_Url,
            itdeptNavText: req.body.itdept_Nav_Text,
            itdeptTitle: req.body.itdept_Title,
            itdeptHeading: req.body.itdept_Heading,
            itdeptPhoto: req.file.filename,
            itdeptDetails: req.body.itdept_Details
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/itdepartment')
       })

    }else {

        ITdeptModel.updateOne({ itdeptUrl: req.params.id }, {$set:{
            itdeptUrl: req.body.itdept_Url,
            itdeptNavText: req.body.itdept_Nav_Text,
            itdeptTitle: req.body.itdept_Title,
            itdeptHeading: req.body.itdept_Heading,
            // itdeptPhoto: req.file.filename,
            itdeptDetails: req.body.itdept_Details
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/itdepartment')
       })

    }
})

router.delete('/delete-itdepartment/:id',(req,res) => {
    ITdeptModel.deleteOne({itdeptUrl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/itdepartment')
    })
})


module.exports = router