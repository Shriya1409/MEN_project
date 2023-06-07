let express = require('express');
let pageModel = require('../../model/pageModel')
let router = express();
// let requireAuth = require('../../index')


router.get('/', (req,res) => {
   pageModel.find({}).count()
   .then((x) => {
      res.render('../views/backend/admin-file', {x})
   })
   .catch((y) => {
      console.log(y)
   })
})

module.exports = router