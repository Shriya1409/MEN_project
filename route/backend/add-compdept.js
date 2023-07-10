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
        res.render('../views/backend/add-compdept-file')
    })

router.post('/', upload.single('compdept_Photo') , (req,res) => {
    CompdeptModel.findOne({compdeptUrl: req.body.compdeptUrl})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/compdepartment/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                CompdeptModel.create({
                    compdeptUrl: req.body.compdept_Url,
                    compdeptNavText: req.body.compdept_Nav_Text,
                    compdeptTitle: req.body.compdept_Title,
                    compdeptHeading: req.body.compdept_Heading,
                    //  compdeptPhoto: req.file.filename,
                    compdeptDetails: req.body.compdept_Details
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/compdepartment/')
                })
        
            } else {
        
                CompdeptModel.create({
                    compdeptUrl: req.body.compdept_Url,
                    compdeptNavText: req.body.compdept_Nav_Text,
                    compdeptTitle: req.body.compdept_Title,
                    compdeptHeading: req.body.compdept_Heading,
                    compdeptPhoto: req.file.filename,
                    compdeptDetails: req.body.compdept_Details
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/compdepartment/')
                })
        
            }

        }
    })

})

module.exports = router