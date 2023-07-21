let express = require('express');
let multer = require('multer')
const infrastructureModel = require('../../model/infrastructureModel');
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/infrastructure/',
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
        res.render('../views/backend/add-infra-file')
    })

router.post('/', upload.array('infradeptphoto', 15) , (req,res) => {
    infrastructureModel.findOne({infradepturl: req.body.infradepturl})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/infra/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.file) {

                infrastructureModel.create({
                    infradepturl: req.body.infradepturl,
                    infradeptnavtext: req.body.infradeptnavtext,
                    infradepttitle: req.body.infradepttitle,
                    infradeptabout: req.body.infradeptabout,
                    
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/infra/')
                })
        
            } else {
        
                const infradeptphotos= req.files.map(file => file.filename);
                infrastructureModel.create({
                    infradepturl: req.body.infradepturl,
                    infradeptnavtext: req.body.infradeptnavtext,
                    infradepttitle: req.body.infradepttitle,
                    infradeptphoto: infradeptphotos,
                    infradeptabout: req.body.infradeptabout,
                  
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/infra/')
                })
        
            }

        }
    })

})

module.exports = router