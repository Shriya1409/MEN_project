let express = require('express');
let pageModel = require('../../model/pageModel')
let router = express();

pageModel.find({})
    .then((x)=> {
        router.locals.navdata = x;
    })
    .catch((y) => {
        console.log(y)
    })

router.use((req, res, next) => {
    pageModel.find({})
        .then((x) => {
            res.locals.navdata = x; //here set local variable  and then value
            //console.log(x)
        })
        .catch((y) => {
            console.log(y)
        })
    next()
})

router.get('/', (req,res) => {
   pageModel.find({})
   .then((x) => {
      res.render('../views/frontend/login', {x})
   })
   .catch((y) => {
      console.log(y)
   })
})

module.exports = router