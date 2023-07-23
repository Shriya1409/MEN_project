let express = require('express');
let multer = require('multer')
let eventsModel = require('../../model/eventsModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/events/',
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
    eventsModel.find({})
    .then((x) => {
        res.render('../views/backend/events', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})




router.get('/edit-event/:id', (req,res) => {
    eventsModel.findOne({ eventdepturl: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-events', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-event/:id', upload.single('eventphoto'),(req,res) => {
    if(!req.file){


        eventsModel.updateOne({ eventdepturl: req.params.id }, {$set:{
                    eventdepturl: req.body.eventdepturl,
                    eventdeptnavtext: req.body.eventdeptnavtext,
                    eventdepttitle: req.body.eventdepttitle,
                    eventnav:req.body.eventnav,
                    eventname:req.body.eventname,
                    eventdate:req.body.eventdate,
                    eventperson: req.body.eventperson,
                    eventdesc:req.body.eventdesc,
                    // eventphoto:req.file.filename,
                

        }
    
    })
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/events')
       })

    }else {

        eventsModel.updateOne({ eventdepturl: req.params.id }, {$set:{
            eventdepturl: req.body.eventdepturl,
            eventdeptnavtext: req.body.eventdeptnavtext,
            eventdepttitle: req.body.eventdepttitle,
            eventnav:req.body.eventnav,
            eventname:req.body.eventname,
            eventdate:req.body.eventdate,
            eventperson: req.body.eventperson,
            eventdesc:req.body.eventdesc,
            eventphoto:req.file.filename,
            // eventslider:eventsliders,
        


            
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/events')
       })

    }
})

router.delete('/delete-event/:id',(req,res) => {
    eventsModel.deleteOne({eventdepturl:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/events')
    })
})


module.exports = router