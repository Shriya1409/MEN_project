let express = require('express');
let multer = require('multer')
let eventsModel = require('../../model/eventsModel')
let router = express.Router();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/events/',
    filename: (req, file, cb) => {
        // cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
})
// const upload = multer({ dest: 'uploads/' });

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
        res.render('../views/backend/add-events')
    })

router.post('/', upload.single('eventphoto') ,  (req,res) => {
    eventsModel.findOne({eventdepturl: req.body.eventdepturl})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/events/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if (!req.file) {

                eventsModel.create({
                    eventdepturl: req.body.eventdepturl,
                    eventdeptnavtext: req.body.eventdeptnavtext,
                    eventdepttitle: req.body.eventdepttitle,
                    eventnav:req.body.eventnav,
                    eventname:req.body.eventname,
                    eventdate:req.body.eventdate,
                    eventperson: req.body.eventperson,
                    eventdesc:req.body.eventdesc,
                    // eventslider:eventsliders,
                    
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/events/')
                })
            }
        else{
                
                
                eventsModel.create({
                    eventdepturl: req.body.eventdepturl,
                    eventdeptnavtext: req.body.eventdeptnavtext,
                    eventdepttitle: req.body.eventdepttitle,
                    eventname:req.body.eventname,
                    eventnav:req.body.eventnav,
                    eventdate:req.body.eventdate,
                    eventperson: req.body.eventperson,
                    eventdesc:req.body.eventdesc,
                    eventphoto:req.file.filename,
                  
                    



                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/events/')
                })
        
            }

        }
    })

})

module.exports = router