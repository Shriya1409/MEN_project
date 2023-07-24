let express = require('express');
let multer = require('multer')
let ITdeptModel = require('../../model/itdeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/itdepartmentevents/',
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

// router.get('/:id', (req,res) => {
//     pageModel.find({})
//     .then((x) => {
//         res.render('../views/backend/add-page-file',{x})
//         // console.log(x)
//     })
//     .catch((y) => {
//         console.log(y)
//     })
// })
router.get('/', (req,res) => {
        res.render('../views/backend/add-itdept-file')
    })

router.post('/', upload.single('eventitphoto') , (req,res) => {
    ITdeptModel.findOne({eventitdepturl: req.body.eventitdepturl})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/itdepartment/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                ITdeptModel.create({
                    eventitdepturl: req.body.eventitdepturl,
                    eventitdeptnavtext: req.body.eventitdeptnavtext,
                    eventitdepttitle: req.body.eventitdepttitle,
                    eventitnav:req.body.eventitnav,
                    eventitname:req.body.eventitname,
                    eventitdate:req.body.eventitdate,
                    eventitperson: req.body.eventitperson,
                    eventitdesc:req.body.eventitdesc,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/itdepartment/')
                })
        
            } else {
        
                ITdeptModel.create({
                    eventitdepturl: req.body.eventitdepturl,
                    eventitdeptnavtext: req.body.eventitdeptnavtext,
                    eventitdepttitle: req.body.eventitdepttitle,
                    eventitname:req.body.eventitname,
                    eventitnav:req.body.eventitnav,
                    eventitdate:req.body.eventitdate,
                    eventitperson: req.body.eventitperson,
                    eventitdesc:req.body.eventitdesc,
                    eventitphoto:req.file.filename,
                  
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/itdepartment/')
                })
        
            }

        }
    })

})

module.exports = router