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

router.get('/', (req,res) => {
    deptModel.find({})
    .then((x) => {
        res.render('../views/backend/dept-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})




router.get('/edit-department/:id', (req,res) => {
    deptModel.findOne({ deptUrl: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-dept-file', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-department/:id', upload.array('dept_Photo',4), (req,res) => {
    if(req.files && req.files.length > 0){
        const deptPhotos = req.files.map(file => file.filename);
        deptModel.updateOne({ deptUrl: req.params.id }, {$set:{
                    deptUrl: req.body.dept_Url,
                    deptNavText: req.body.dept_Nav_Text,
                    deptTitle: req.body.dept_Title,
                    deptHeading: req.body.dept_Heading,
                    deptPhoto: deptPhotos,
                    deptDetails: req.body.dept_Details,
                    aboutDetails: req.body.about_Details,
                    abouttDetails: req.body.aboutt_Details,
                    aboutttDetails: req.body.abouttt_Details,
                   // visionPhoto: req.file.filename,
                    visionDetails: req.body.vision_Details,
                    missionDetails: req.body.mission_Details,
                    missionnDetails: req.body.missionn_Details,
                    missionnnDetails: req.body.missionnn_Details,
                    missionnnnDetails: req.body.missionnnn_Details,
                   // missionPhoto: req.file.filename,
            
        }
    
    })
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/department')
       })

    }else {

        deptModel.updateOne({ deptUrl: req.params.id }, {$set:{

                    deptUrl: req.body.dept_Url,
                    deptNavText: req.body.dept_Nav_Text,
                    deptTitle: req.body.dept_Title,
                    deptHeading: req.body.dept_Heading,
                   // deptPhoto: deptPhotos,
                    deptDetails: req.body.dept_Details,
                    aboutDetails: req.body.about_Details,
                    abouttDetails: req.body.aboutt_Details,
                    aboutttDetails: req.body.abouttt_Details,
                   // visionPhoto: req.file.filename,
                    visionDetails: req.body.vision_Details,
                    missionDetails: req.body.mission_Details,
                    missionnDetails: req.body.missionn_Details,
                    missionnnDetails: req.body.missionnn_Details,
                    missionnnnDetails: req.body.missionnnn_Details,
                   // missionPhoto: req.file.filename,
            
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/department')
       })

    }
})

router.delete('/delete-department/:id',(req,res) => {
    deptModel.deleteOne({deptUrl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/department')
    })
})


module.exports = router