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

router.post('/', upload.array('dept_Photo',4) , (req,res) => {
    deptModel.findOne({deptUrl: req.body.deptUrl})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/department/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.files && req.files.length > 0) {

                deptModel.create({
                    deptUrl: req.body.dept_Url,
                    deptNavText: req.body.dept_Nav_Text,
                    deptTitle: req.body.dept_Title,
                    deptHeading: req.body.dept_Heading,
                    //deptPhoto: deptPhotos,
                    deptDetails: req.body.dept_Details,
                    about1Details: req.body.about1_Details,
                    about2Details: req.body.about2_Details,
                    about3Details: req.body.about3_Details,
                    //visionPhoto: req.file.filename,
                    visionDetails: req.body.vision_Details,
                    missionDetails: req.body.mission_Details,
                    missionnDetails: req.body.missionn_Details,
                    missionnnDetails: req.body.missionnn_Details,
                    missionnnnDetails: req.body.missionnnn_Details,
                   // missionPhoto: req.file.filename,
                    
                    
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/department/')
                })
        
            } else {
                const deptPhotos = req.files.map(file => file.filename);
                
                deptModel.create({
                    deptUrl: req.body.dept_Url,
                    deptNavText: req.body.dept_Nav_Text,
                    deptTitle: req.body.dept_Title,
                    deptHeading: req.body.dept_Heading,
                    deptPhoto: deptPhotos,
                    deptDetails: req.body.dept_Details,
                    about1Details: req.body.about1_Details,
                    about2Details: req.body.about2_Details,
                    about3Details: req.body.about3_Details,
                    //visionPhoto: req.file.filename,
                    visionDetails: req.body.vision_Details,
                    missionDetails: req.body.mission_Details,
                    missionnDetails: req.body.missionn_Details,
                    missionnnDetails: req.body.missionnn_Details,
                    missionnnnDetails: req.body.missionnnn_Details,
                   // missionPhoto: req.file.filename,
                    



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