let express =  require('express')
let pageModel = require('../../model/pageModel')
let router = express()

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
        res.render('../views/frontend/index',{x})
    })
})

// router.get('/:id', (req,res) => {
//         pageModel.findOne({pageUrl: req.params.id})
//         .then((x) => {
//            if(x){
//             res.render('../views/frontend/dynamic-page',{x})
//            }
//            else{
//             res.redirect('/')
//            }
//         })
    
//         .catch((y) => { 
//             console.log(y)
//         })
//     })

 router.get('/:id', (req,res) => {
    pageModel.findOne({pageUrl: req.params.id})
    .then((x) => {
       if(x){
        const extractValue = x.pageUrl;
        if(extractValue === 'result.ejs') {
          res.render('../views/frontend/dynamic-page',{x})
        } else if(extractValue === 'register') {
            res.render('../views/frontend/register',{x})
        } else {
          res.render('../views/frontend/dynamic-page',{x})
        }
       }
       else {
        res.redirect('/')
       }
    })
    .catch((y) => {
        console.log(y)
    })

 })




module.exports = router