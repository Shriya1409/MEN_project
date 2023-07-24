let express = require('express');
let multer = require('multer')
let ETCdeptModel = require('../../model/etcdeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/etcdepartmentevents',
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
    ETCdeptModel.find({})
    .then((x) => {
        res.render('../views/backend/etcdept-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-etcdepartment/:id', (req,res) => {
    ETCdeptModel.findOne({ eventetcname: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-etcdept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-etcdepartment/:id', upload.single('eventetcphoto'), (req,res) => {
    if(req.file){
        ETCdeptModel.updateOne({ eventetcname: req.params.id }, {$set:{
            eventetcnav:req.body.eventetcnav,
            eventetcname:req.body.eventetcname,
            eventetcdate:req.body.eventetcdate,
            eventetcperson: req.body.eventetcperson,
            eventetcdesc:req.body.eventetcdesc,
            eventetcphoto:req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/etcdepartment')
       })

    }else {

        ETCdeptModel.updateOne({ eventetcname: req.params.id }, {$set:{
            eventetcnav:req.body.eventetcnav,
            eventetcname:req.body.eventetcname,
            eventetcdate:req.body.eventetcdate,
            eventetcperson: req.body.eventetcperson,
            eventetcdesc:req.body.eventetcdesc,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/etcdepartment')
       })

    }
})

router.delete('/delete-etcdepartment/:id',(req,res) => {
    ETCdeptModel.deleteOne({eventetcname:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/etcdepartment')
    })
})


module.exports = router