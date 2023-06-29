let express = require('express')
let multer = require('multer')

const studRecords = require('../../model/studRecords');
let router = express();

// storage & file name setting
 let storage = multer.diskStorage({
     destination:'public/backend/studentR/',
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
//  router.get('/:id', (req,res) => {
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
        res.render('../views/backend/add-stud-records')
    })

router.post('/', upload.single('recPhoto'),  (req,res) => {
    studRecords.findOne({rollnoo: req.body.rollnoo})
    .then((o) => {
        if(o) {
            req.flash('err', 'Url already exists, Please try with another url!!')
            res.redirect('/student-records/')
            // console.log('Url already exists, Please try with another url!!')
        } else {

            if(!req.body) {

                studRecords.create({
                    stud_name: req.body.stud_name,
                     rollnoo: req.body.rollnoo,
                     depart: req.body.depart,
                     yr: req.body.yr,
                     cgpa: req.body.cgpa,
                     pr: req.body.pr,
                     sem: req.body.sem,
                     backlog: req.body.backlog,
                    //  recPhoto: req.body.recPhoto
                })
                .then((a) => {
                    req.flash('success', 'Your data has been added successfully')
                     res.redirect('/placement-records/')
                })
        
            }
         else {
        
            studRecords.create({
                stud_name: req.body.stud_name,
                 rollnoo: req.body.rollnoo,
                 depart: req.body.depart,
                 yr: req.body.yr,
                 cgpa: req.body.cgpa,
                 pr: req.body.pr,
                 sem: req.body.sem,
                 backlog: req.body.backlog,
                 recPhoto: req.body.recPhoto
            })
                 .then((a) => {
                     req.flash('success', 'Your data has been added successfully')
                      res.redirect('/student-records/')
                 })
        
             }

         }
    })




    

})

module.exports = router;