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

router.get('/', (req,res) => {
    infrastructureModel.find({})
    .then((x) => {
        res.render('../views/backend/infra-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})




router.get('/edit-infra/:id', (req,res) => {
    infrastructureModel.findOne({ infradepturl: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-infra', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-infra/:id', upload.array('infradeptphoto',15),(req,res) => {
    if(req.files && req.files.length > 0){
        const infradeptphotos = req.files.map(file => file.filename);
        
        infrastructureModel.create({
            infradepturl: req.body.infradepturl,
            infradeptnavtext: req.body.infradeptnavtext,
            infradepttitle: req.body.infradepttitle,
            infradeptphoto: infradeptphotos,
            infradeptabout: req.body.infradeptabout,
            
    
    })
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/infra')
       })

    }else {

        infrastructureModel.create({
            infradepturl: req.body.infradepturl,
            infradeptnavtext: req.body.infradeptnavtext,
            infradepttitle: req.body.infradepttitle,
            infradeptabout: req.body.infradeptabout,
          
        })
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/infra')
       })

    }
})

router.delete('/delete-infra/:id',(req,res) => {
    infrastructureModel.deleteOne({infradepturl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/infra')
    })
})


module.exports = router