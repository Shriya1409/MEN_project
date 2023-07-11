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

router.post('/', upload.single('itdept_Photo') , (req,res) => {
    ITdeptModel.findOne({itdeptUrl: req.body.itdeptUrl})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/itdepartment/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                ITdeptModel.create({
                    itdeptUrl: req.body.itdept_Url,
                    itdeptNavText: req.body.itdept_Nav_Text,
                    itdeptTitle: req.body.itdept_Title,
                    itdeptHeading: req.body.itdept_Heading,
                    //  itdeptPhoto: req.file.filename,
                    itdeptDetails: req.body.itdept_Details
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/itdepartment/')
                })
        
            } else {
        
                ITdeptModel.create({
                    itdeptUrl: req.body.itdept_Url,
                    itdeptNavText: req.body.itdept_Nav_Text,
                    itdeptTitle: req.body.itdept_Title,
                    itdeptHeading: req.body.itdept_Heading,
                    itdeptPhoto: req.file.filename,
                    itdeptDetails: req.body.itdept_Details
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