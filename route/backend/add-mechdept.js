let express = require('express');
let multer = require('multer')
let MechdeptModel = require('../../model/mechdeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/mechdepartmentevents/',
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
        res.render('../views/backend/add-mechdept-file')
    })

router.post('/', upload.single('eventmechphoto') , (req,res) => {
    MechdeptModel.findOne({eventmechname: req.body.eventmechname})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/mechdepartment/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                MechdeptModel.create({
                    eventmechnav:req.body.eventmechnav,
                    eventmechname:req.body.eventmechname,
                    eventmechdate:req.body.eventmechdate,
                    eventmechperson: req.body.eventmechperson,
                    eventmechdesc:req.body.eventmechdesc,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/mechdepartment/')
                })
        
            } else {
        
                MechdeptModel.create({
                    
                    eventmechnav:req.body.eventmechnav,
                    eventmechname:req.body.eventmechname,
                    eventmechdate:req.body.eventmechdate,
                    eventmechperson: req.body.eventmechperson,
                    eventmechdesc:req.body.eventmechdesc,
                    eventmechphoto:req.file.filename,
                  
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/mechdepartment/')
                })
        
            }

        }
    })

})

module.exports = router