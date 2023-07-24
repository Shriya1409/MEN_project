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
        res.render('../views/backend/add-usefullink')
    })

router.post('/', upload.single('usefulinfo'), (req,res) => {
    usefullinkModel.findOne({usefulinfoname: req.body.usefulinfoname})
    .then((a) => {
        // const noticeinfo=req.files.map(file=>file.noticeinfo);
        // const usefulinfo=req.files.map(file=>file.usefulinfo);

        if(a) {
            req.flash('err', 'Url already exists, Please try with another url!!')
            res.redirect('/usefullink/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(req.file) {

                usefullinkModel.create({
                   
                    usefulinfoname:req.body.usefulinfoname,
                    usefulinfo:req.file.filename,
                   
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/usefullink')
                })
        
             } 
            //  else {
        
            //     notificationsModel.create({
            //         course: req.body.course,
            //         semester: req.body.semester,
            //         rc: req.body.rc,
            //         date: req.body.date,
            //         resultpdf: req.file.filename,
            //         pageDetails: req.body.page_Details
            //     })
            //     .then((x) => {
            // req.flash('success', 'Not added any data')
            // //          res.redirect('/notifications')
            //     })
        
            

        }
    })

})


module.exports = router