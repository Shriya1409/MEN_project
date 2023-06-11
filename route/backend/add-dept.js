let express = require('express');
let multer = require('multer')
let deptModel = require('../../model/deptModel')
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
        res.render('../views/backend/add-dept-file')
    })

router.post('/', upload.single('page_Photoo') , (req,res) => {
    deptModel.findOne({deptUrl: req.body.deptUrl})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/department/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                deptModel.create({
                    deptUrl: req.body.dept_Url,
                    deptNavText: req.body.dept_Nav_Text,
                    deptTitle: req.body.dept_Title,
                    deptHeading: req.body.dept_Heading,
                    // pagePhoto: req.file.filename,
                    deptDetails: req.body.dept_Details
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/department/')
                })
        
            } else {
        
                deptModel.create({
                    deptUrl: req.body.dept_Url,
                    deptNavText: req.body.dept_Nav_Text,
                    deptTitle: req.body.dept_Title,
                    deptHeading: req.body.dept_Heading,
                    deptPhoto: req.file.filename,
                    deptDetails: req.body.dept_Details
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/department/')
                })
        
            }

        }
    })

})

module.exports = router