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
        if(file.mimetype == 'application/pdf') {
            cb(null, true)
        }
        else {
            cb(null,false);
             return cb(new Error('Only application format(pdf) are allowed!!'))
        }
    }
})

router.get('/', (req,res) => {
        res.render('../views/backend/add-notif')
    })

router.post('/', upload.single('noticeinfo') , upload.single('usefulinfo'), (req,res) => {
    notificationsModel.findOne({date: req.body.date})
    .then((a) => {
        if(a) {
            req.flash('err', 'Url already exists, Please try with another url!!')
            res.redirect('/notifications/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(req.files && req.files>0) {

                notificationsModel.create({
                    date: req.body.date,
                    noticename:req.body.noticename,
                    noticeinfo:req.file.filename,
                    usefulinfoname: req.body.usefulinfoname,
                    usefulinfo: req.file.filename,
                
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/notifications')
                })
        
            // } else {
        
            //     notificationsModel.create({
            //         course: req.body.course,
            //         semester: req.body.semester,
            //         rc: req.body.rc,
            //         date: req.body.date,
            //         resultpdf: req.file.filename,
            //         pageDetails: req.body.page_Details
            //     })
            //     .then((x) => {
            //         req.flash('success', 'Your data has been added successfully')
            //          res.redirect('/notifications')
            //     })
        
            }

        }
    })

})


module.exports = router