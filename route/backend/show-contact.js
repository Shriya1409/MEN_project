let express = require('express');
let multer = require('multer')
let contactModel = require('../../model/contactModel')
let router = express();

// // storage & file name setting
// let storage = multer.diskStorage({
//     destination:'public/backend/results/',
//     filename: (req, file, cb) => {
//         // cb(null, Date.now(+file+originalname))
//         cb(null, file.originalname)
//     }
// })

// let upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if(file.mimetype == 'application/pdf' ) {
//             cb(null, true)
//         }
//         else {
//             cb(null,false);
//              return cb(new Error('Only application format(pdf) are allowed!!'))
//         }
//     }
// })

router.get('/', (req,res) => {
    contactModel.find({})
    .then((x) => {
        res.render('../views/backend/show-contact', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.delete('/delete-contact/:id',(req,res) => {
    contactModel.deleteOne({cname:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/show-contact')
    })
})


module.exports = router