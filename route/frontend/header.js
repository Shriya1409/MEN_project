let express =  require('express')
let pageModel = require('../../model/pageModel')
let deptModel = require('../../model/deptModel')
let ITdeptModel = require('../../model/itdeptModel')
let plcmtModel=require('../../model/plcmtModel')
let plcmtRecords=require('../../model/plcmtRecords')
let router = express()

deptModel.find({})
    .then((p)=> {
        router.locals.deptdata = p;
    })
    .catch((q) => {
        console.log(q)
    })

router.use((req, res, next) => {
    deptModel.find({})
        .then((p) => {
            res.locals.deptdata = p; //here set local variable  and then value
            //console.log(x)
        })
        .catch((q) => {
            console.log(q)
        })
    next()
})

plcmtModel.find({})
    .then((x)=> {
        router.locals.plcmtdata = x;
    })
    .catch((y) => {
        console.log(y)
    })

router.use((req, res, next) => {
    plcmtModel.find({})
        .then((x) => {
            res.locals.plcmtdata = x; //here set local variable  and then value
            //console.log(x)
        })
        .catch((y) => {
            console.log(y)
        })
    next()
})
ITdeptModel.find({})
    .then((p)=> {
        router.locals.itdeptdata = p;
    })
    .catch((q) => {
        console.log(q)
    })

router.use((req, res, next) => {
    ITdeptModel.find({})
        .then((p) => {
            res.locals.itdeptdata = p; //here set local variable  and then value
            //console.log(x)
        })
        .catch((q) => {
            console.log(q)
        })
    next()
})
plcmtRecords.find({})
    .then((a)=> {
        router.locals.plcrec = a;
    })
    .catch((b) => {
        console.log(b)
    })

router.use((req, res, next) => {
    plcmtRecords.find({})
        .then((a) => {
            res.locals.plcrec = a; //here set local variable  and then value
            //console.log(x)
        })
        .catch((b) => {
            console.log(b)
        })
    next()
})

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


 router.get('/:id', (req,res) => {
    pageModel.findOne({pageUrl: req.params.id})
    .then((x) => {
       if(x){
        const extractValue = x.pageUrl;
        if(extractValue === 'result.ejs') {
          res.render('../views/frontend/dynamic-page',{x})
        } else if(extractValue === 'register') {
            res.render('../views/frontend/register',{x})
        } 
        else {
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

 router.get('/placement/:plcmt', (req,res) => {
    plcmtModel.findOne({plcmtUrl: req.params.plcmt})
    .then((x) => {
       if(x){
      
       
          res.render('../views/frontend/dynamic-plcmt',{x})
        } 
        
       else {
        res.redirect('/')
       }
    
    })
    .catch((y) => {
        console.log(y)
    })
    
 })


//  router.get('/placementrecords', (req,res) => {
//     plcmtRecords.find({})
//     .then((x) => {
//         res.render('../views/frontend/plcmtrecord', {x})
//         // console.log(x)
//     })
//     .catch((y) => {
//         console.log(y)
//     })
// })

 router.get('/department/:dept', (req,res) => {
    deptModel.findOne({deptUrl: req.params.dept})
    .then((p) => {
       if(p){

        //  const extractValue = p.deptUrl;
        //  if(extractValue) {
        // if(extractValue === 'result.ejs') {
        //   res.render('../views/frontend/dynamic-page',{p})
        // } else if(extractValue === 'register') {
        //     res.render('../views/frontend/register',{p})
        // } else {
        //   res.render('../views/frontend/register',{p})
        // }
        res.render('../views/frontend/dynamic-dept',{p}) 
       }
       else {
        res.redirect('/')
       }
    })
    .catch((q) => {
        console.log(q)
    })

 })
 router.get('/placementrecords/:plc', (req,res) => {
    plcmtRecords.findOne({student_name: req.params.plc})
    .then((a) => {
       if(a){

        //  const extractValue = p.deptUrl;
        //  if(extractValue) {
        // if(extractValue === 'result.ejs') {
        //   res.render('../views/frontend/dynamic-page',{p})
        // } else if(extractValue === 'register') {
        //     res.render('../views/frontend/register',{p})
        // } else {
        //   res.render('../views/frontend/register',{p})
        // }
        res.render('../views/frontend/plcmtrecord',{a}) 
       }
       else {
        res.redirect('/')
       }
    })
    .catch((b) => {
        console.log(b)
    })

 })

//  router.get('/placement/placement-records/:plc', (req,res) => {
//     plcmtRecords.findOne({rollno: req.params.plc})
//     .then((p) => {
//        if(p){

//         //  const extractValue = p.deptUrl;
//         //  if(extractValue) {
//         // if(extractValue === 'result.ejs') {
//         //   res.render('../views/frontend/dynamic-page',{p})
//         // } else if(extractValue === 'register') {
//         //     res.render('../views/frontend/register',{p})
//         // } else {
//         //   res.render('../views/frontend/register',{p})
//         // }
//         res.render('../views/frontend/plcmtrecord',{p}) 
//        }
//        else {
//         res.redirect('/')
//        }
//     })
//     .catch((q) => {
//         console.log(q)
//     })

//  })



 router.get('/department/it/:itdept', (req,res) => {
    ITdeptModel.findOne({itdeptUrl: req.params.itdept})
    .then((p) => {
       if(p){

        //  const extractValue = p.deptUrl;
        //  if(extractValue) {
        // if(extractValue === 'result.ejs') {
        //   res.render('../views/frontend/dynamic-page',{p})
        // } else if(extractValue === 'register') {
        //     res.render('../views/frontend/register',{p})
        // } else {
        //   res.render('../views/frontend/register',{p})
        // }
        res.render('../views/frontend/dynamic-itdept',{p}) 
       }
       else {
        res.redirect('/')
       }
    })
    .catch((q) => {
        console.log(q)
    })

 })




module.exports = router