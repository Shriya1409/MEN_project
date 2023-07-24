let express = require('express')
let multer = require('multer')

const contactModel = require('../../model/contactModel');
let router = express();

// storage & file name setting
//  let storage = multer.diskStorage({
//      destination:'public/backend/contact/',
//      filename: (req, file, cb) => {
//         // cb(null, Date.now(+file+originalname))
//          cb(null, file.originalname)
//     }
//  })

//  let upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
//             cb(null, true)
//         }
//         else {
//             cb(null,false);
//              return cb(new Error('Only Image format(jpeg,jpg,png,gif) are allowed!!'))
//         }
//     }
// })
 router.get('/', (req,res) => {
    contactModel.find({})
    .then((x) => {
        res.render('../views/frontend/contact',{x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})

router.post('/',  (req,res) => {
    contactModel.findOne({cemail: req.body.cemail})
    .then((a) => {
        if(a) {
            req.flash('err', 'Urll already exists, Please try with another url!!')
            res.redirect('/contact/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

                

                contactModel.create({
                    cname:req.body.cname,
                    cemail:req.body.cemail,
                    csubject:req.body.csubject,
                    cmessage:req.body.cmessage,
                })
                .then((x) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/contact/')
                })
        
            

        }
    })

 

})

module.exports = router