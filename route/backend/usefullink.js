let express = require('express');
let multer = require('multer')
let usefullinkModel = require('../../model/usefullinkModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/usefullink/',
    filename: (req, file, cb) => {
        // cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'application/pdf' ) {
            cb(null, true)
        }
        else {
            cb(null,false);
             return cb(new Error('Only application format(pdf) are allowed!!'))
        }
    }
})

router.get('/', (req,res) => {
    usefullinkModel.find({})
    .then((x) => {
        res.render('../views/backend/usefullink', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-usefullink/:id', (req,res) => {
    usefullinkModel.findOne({ usefulinfoname: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-usefullink', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-usefullink/:id', upload.single('usefulinfo'), (req,res) => {
    if(req.file){
        usefullinkModel.update({ usefulinfoname: req.params.id }, {$set:{
            usefulinfoname:req.body.usefulinfoname,
            usefulinfo:req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/usefullink')
       })

    }

    }
)

router.delete('/delete-usefullink/:id',(req,res) => {
    usefullinkModel.deleteOne({usefulinfoname:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/usefullink')
    })
})


module.exports = router