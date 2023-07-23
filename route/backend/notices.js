let express = require('express');
let multer = require('multer')
let noticesModel = require('../../model/noticesModel')
let router = express();

// storage & file name setting
let storage = multer.diskStorage({
    destination:'public/backend/notices/',
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
    noticesModel.find({})
    .then((x) => {
        res.render('../views/backend/notices-file', {x})
        // console.log(x)
    })
    .catch((y) => {
        console.log(y)
    })
})



router.get('/edit-notices/:id', (req,res) => {
    noticesModel.findOne({ noticename: req.params.id })
    .then((x) => {
        res.render('../views/backend/edit-notices', {x})
    })
    .catch((y) => {
        console.log(y)
    })
})

router.put('/edit-notices/:id', upload.single('noticeinfo'), (req,res) => {
    if(req.file){
        noticesModel.update({ noticename: req.params.id }, {$set:{
            noticedate: req.body.noticedate,
            noticename:req.body.noticename,
            noticeinfo:req.file.filename,
        }})
       .then((x) => {
        req.flash('success', 'Your data has been updated successfully')
        res.redirect('/notices')
       })

    }

    }
)

router.delete('/delete-notices/:id',(req,res) => {
    noticesModel.deleteOne({noticename:req.params.id})
    .then((x) => {
        req.flash('success', 'Your data has been deleted successfully')
        res.redirect('/notices')
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