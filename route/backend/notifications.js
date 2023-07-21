let express = require('express');
let multer = require('multer')
let notificationModel = require('../../model/notificationModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/notifications/',
    filename: (req, file, cb) => {
        // cb(null, Date.now(+file+originalname))
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'application/pdf' ) {
            cb(null, true)
        }
        else {
            cb(null,false);
             return cb(new Error('Only application format(pdf) are allowed!!'))
        }
    }
})

router.get('/', (req,res) => {
    notificationModel.find({})
    .then((x) => {
        res.render('../views/backend/notif-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-notifications/:id', (req,res) => {
    notificationModel.findOne({ date: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-notif', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-notifications/:id', upload.fields([
    { name: 'noticeinfo', maxCount: 1 },
    { name: 'usefulinfo', maxCount: 1 }
  ]), (req,res) => {
    if(req.files){
        notificationModel.update({ date: req.params.id }, {$set:{
            date: req.body.date,
            noticename:req.body.noticename,
            noticeinfo:req.file.filename,
            usefulinfoname: req.body.usefulinfoname,
            usefulinfo: req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/notifications')
       })

    }

    }
)

router.delete('/delete-notifications/:id',(req,res) => {
    notificationModel.deleteOne({date:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/notifications')
    })
})

 // Replace './yourModel' with the path to your model definition

// Example route to delete a field from a document
// router.patch('/delete-notifications/:id', (req, res) => {
//   const documentId = req.params.id;
//   const noticeinfo = req.body.noticeinfo;
//   const usefulinfo=req.body.usefulinfo;

//   notificationModel.findById(documentId, (err, document) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error finding document' });
//     }

//     if (!document) {
//       return res.status(404).json({ error: 'Document not found' });
//     }

//     // Delete the field from the document
//     document.set(noticeinfo, undefined);

//     // Save the updated document
//     document.save((err, updatedDocument) => {
//       if (err) {
//         return res.status(500).json({ error: 'Error saving updated document' });
//       }

//       res.json(updatedDocument);
//     });
//   });
// });
module.exports = router