let express = require('express');
let Form = require('../../model/formModel')
//let pageModel = require('../../model/pageModel')
let router = express();



router.post('/', (req, res) => {
    const formData = req.body;
    
    // Save form data to MongoDB
    const form = new Form({
      editorData: formData.editor,
      inputField: formData.inputField,
      textareaField: formData.textareaField
    });
  
    form.save()
      .then(() => res.redirect('/data'))
      .catch(err => res.status(400).send('Failed to save form data'));
  
  });
  
  // Display form data
  router.get('/data', (req, res) => {
    Form.find()
      .then(data => {
         res.render('../views/backend/data', { formData: data })
        //console.log({formData: data})
      })
      .catch(err => {
        console.error('Failed to fetch form data', err);
        res.status(500).send('Failed to fetch form data');
      });
  });

  module.exports = router
  