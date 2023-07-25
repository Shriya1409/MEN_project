let express = require('express');
let multer = require('multer')
let ENEdeptModel = require('../../model/enedeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/enedepartmentevents/',
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
        res.render('../views/backend/add-enedept-file')
    })

router.post('/', upload.single('eventenephoto') , (req,res) => {
    ENEdeptModel.findOne({eventenename: req.body.eventenename})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/enedepartment/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                ENEdeptModel.create({
                    eventenenav:req.body.eventenenav,
                    eventenename:req.body.eventenename,
                    eventenedate:req.body.eventenedate,
                    eventeneperson: req.body.eventeneperson,
                    eventenedesc:req.body.eventenedesc,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/enedepartment/')
                })
        
            } else {
        
                ENEdeptModel.create({
                    
                    eventenenav:req.body.eventenenav,
                    eventenename:req.body.eventenename,
                    eventenedate:req.body.eventenedate,
                    eventeneperson: req.body.eventeneperson,
                    eventenedesc:req.body.eventenedesc,
                    eventenephoto:req.file.filename,
                  
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/enedepartment/')
                })
        
            }

        }
    })

})

module.exports = router