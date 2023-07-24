let express = require('express');
let multer = require('multer')
let ETCdeptModel = require('../../model/etcdeptModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/etcdepartmentevents/',
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
        res.render('../views/backend/add-etcdept-file')
    })

router.post('/', upload.single('eventetcphoto') , (req,res) => {
    ETCdeptModel.findOne({eventetcname: req.body.eventetcname})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/etcdepartment/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                ETCdeptModel.create({
                    eventetcnav:req.body.eventetcnav,
                    eventetcname:req.body.eventetcname,
                    eventetcdate:req.body.eventetcdate,
                    eventetcperson: req.body.eventetcperson,
                    eventetcdesc:req.body.eventetcdesc,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/etcdepartment/')
                })
        
            } else {
        
                ETCdeptModel.create({
                    
                    eventetcnav:req.body.eventetcnav,
                    eventetcname:req.body.eventetcname,
                    eventetcdate:req.body.eventetcdate,
                    eventetcperson: req.body.eventetcperson,
                    eventetcdesc:req.body.eventetcdesc,
                    eventetcphoto:req.file.filename,
                  
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/etcdepartment/')
                })
        
            }

        }
    })

})

module.exports = router