let express = require('express');
let multer = require('multer')
let notificationsModel = require('../../model/notificationModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/notifications/',
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
    notificationsModel.find({})
    .then((x) => {
        res.render('../views/backend/notif-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-notifications/:id', (req,res) => {
    notificationsModel.findOne({ date: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-notif', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-notifications/:id', upload.single('noticeinfo'), upload.single('usefulinfo'), (req,res) => {
    if(req.files && req.files>0){
        notificationsModel.update({ date: req.params.id }, {$set:{
            date: req.body.date,
            noticename:req.body.noticename,
            noticeinfo:req.file.filename,
            usefulinfoname: req.body.usefulinfoname,
            usefulinfo: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/notifications')
       })

    }

    }
)

router.delete('/delete-notifications/:id',(req,res) => {
    notificationsModel.deleteOne({date:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/notifications')
    })
})


module.exports = router