let express = require('express');
let multer = require('multer')
let CivildeptModel = require('../../model/civildeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/civildepartmentevents/',
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
        res.render('../views/backend/add-civildept-file')
    })

router.post('/', upload.single('eventcivilphoto') , (req,res) => {
    CivildeptModel.findOne({eventcivilname: req.body.eventcivilname})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/civildepartment/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                CivildeptModel.create({
                    eventcivilnav:req.body.eventcivilnav,
                    eventcivilname:req.body.eventcivilname,
                    eventcivildate:req.body.eventcivildate,
                    eventcivilperson: req.body.eventcivilperson,
                    eventcivildesc:req.body.eventcivildesc,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/civildepartment/')
                })
        
            } else {
        
                CivildeptModel.create({
                    
                    eventcivilnav:req.body.eventcivilnav,
                    eventcivilname:req.body.eventcivilname,
                    eventcivildate:req.body.eventcivildate,
                    eventcivilperson: req.body.eventcivilperson,
                    eventcivildesc:req.body.eventcivildesc,
                    eventcivilphoto:req.file.filename,
                  
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/civildepartment/')
                })
        
            }

        }
    })

})

module.exports = router