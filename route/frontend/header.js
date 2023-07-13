let express =  require('express')
let pageModel = require('../../model/pageModel')
let deptModel = require('../../model/deptModel')
let ITdeptModel = require('../../model/itdeptModel')
let CompdeptModel = require('../../model/compdeptModel')
let plcmtModel=require('../../model/plcmtModel')

let plcmtRecords=require('../../model/plcmtRecords')
let studRecords=require('../../model/studRecords')

let facultyModel=require('../../model/facultyModel')
let compfacultyModel=require('../../model/compfacultyModel')
let etcfacultyModel=require('../../model/etcfacultyModel')
let enefacultyModel=require('../../model/enefacultyModel')
let mechfacultyModel=require('../../model/mechfacultyModel')
let civilfacultyModel=require('../../model/civilfacultyModel')

let resultModel=require('../../model/resultModel')
let syllabusModel=require('../../model/syllabusModel')
let notificationModel=require('../../model/notificationModel')
let carouselImgModel=require('../../model/carouselImgModel')
let eventsModel = require('../../model/eventsModel')

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

eventsModel.find({})
    .then((x)=> {
        router.locals.eventdata = x;
    })
    .catch((y) => {
        console.log(y)
    })

router.use((req, res, next) => {
    eventsModel.find({})
        .then((x) => {
            res.locals.eventdata = x; //here set local variable  and then value
            //console.log(x)
        })
        .catch((y) => {
            console.log(y)
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

resultModel.find({})
    .then((s)=> {
        router.locals.resultdata = s;
    })
    .catch((t) => {
        console.log(t)
    })

router.use((req, res, next) => {
   resultModel.find({})
        .then((s) => {
            res.locals.resultdata = s; //here set local variable  and then value
            //console.log(x)
        })
        .catch((t) => {
            console.log(t)
        })
    next()
})

syllabusModel.find({})
    .then((g)=> {
        router.locals.syllabusdata = g;
    })
    .catch((h) => {
        console.log(h)
    })

router.use((req, res, next) => {
   syllabusModel.find({})
        .then((g) => {
            res.locals.syllabusdata = g; //here set local variable  and then value
            //console.log(x)
        })
        .catch((h) => {
            console.log(h)
        })
    next()
})

carouselImgModel.find({})
    .then((p)=> {
        router.locals.carouseldata = p;
    })
    .catch((q) => {
        console.log(q)
    })

router.use((req, res, next) => {
   carouselImgModel.find({})
        .then((p) => {
            res.locals.carouseldata = p; //here set local variable  and then value
            //console.log(x)
        })
        .catch((q) => {
            console.log(q)
        })
    next()
})

notificationModel.find({})
    .then((e)=> {
        router.locals.notifdata = e;
    })
    .catch((f) => {
        console.log(f)
    })

router.use((req, res, next) => {
    notificationModel.find({})
        .then((e) => {
            res.locals.notifdata = e; //here set local variable  and then value
            //console.log(x)
        })
        .catch((f) => {
            console.log(f)
        })
    next()
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

CompdeptModel.find({})
    .then((p)=> {
        router.locals.compdeptdata = p;
    })
    .catch((q) => {
        console.log(q)
    })

router.use((req, res, next) => {
    CompdeptModel.find({})
        .then((p) => {
            res.locals.compdeptdata = p; //here set local variable  and then value
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

studRecords.find({})
    .then((o)=> {
        router.locals.studrec = o;
    })
    .catch((u) => {
        console.log(u)
    })

router.use((req, res, next) => {
    studRecords.find({})
        .then((o) => {
            res.locals.studrec = o; //here set local variable  and then value
        })
        .catch((u) => {
            console.log(u)
        })
    next()
})

facultyModel.find({})
    .then((i)=> {
        router.locals.facultydata = i;
    })
    .catch((j) => {
        console.log(j)
    })

router.use((req, res, next) => {
    facultyModel.find({})
        .then((i) => {
            res.locals.facultydata = i; //here set local variable  and then value
        })
        .catch((j) => {
            console.log(j)
        })
    next()
})

compfacultyModel.find({})
    .then((i)=> {
        router.locals.compfacultydata = i;
    })
    .catch((j) => {
        console.log(j)
    })

router.use((req, res, next) => {
    compfacultyModel.find({})
        .then((i) => {
            res.locals.compfacultydata = i; //here set local variable  and then value
        })
        .catch((j) => {
            console.log(j)
        })
    next()
})

etcfacultyModel.find({})
    .then((i)=> {
        router.locals.etcfacultydata = i;
    })
    .catch((j) => {
        console.log(j)
    })

router.use((req, res, next) => {
    etcfacultyModel.find({})
        .then((i) => {
            res.locals.etcfacultydata = i; //here set local variable  and then value
        })
        .catch((j) => {
            console.log(j)
        })
    next()
})

enefacultyModel.find({})
    .then((i)=> {
        router.locals.enefacultydata = i;
    })
    .catch((j) => {
        console.log(j)
    })

router.use((req, res, next) => {
    enefacultyModel.find({})
        .then((i) => {
            res.locals.enefacultydata = i; //here set local variable  and then value
        })
        .catch((j) => {
            console.log(j)
        })
    next()
})

mechfacultyModel.find({})
    .then((i)=> {
        router.locals.mechfacultydata = i;
    })
    .catch((j) => {
        console.log(j)
    })

router.use((req, res, next) => {
    mechfacultyModel.find({})
        .then((i) => {
            res.locals.mechfacultydata = i; //here set local variable  and then value
        })
        .catch((j) => {
            console.log(j)
        })
    next()
})

civilfacultyModel.find({})
    .then((i)=> {
        router.locals.civilfacultydata = i;
    })
    .catch((j) => {
        console.log(j)
    })

router.use((req, res, next) => {
    civilfacultyModel.find({})
        .then((i) => {
            res.locals.civilfacultydata = i; //here set local variable  and then value
        })
        .catch((j) => {
            console.log(j)
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
          res.render('../views/backend/result.ejs',{x})
        } 
        else if(extractValue === 'syllabus.ejs') {
            res.render('../views/frontend/syllabus.ejs',{x})
          } 
          else if(extractValue === 'faculty.ejs') {
            res.render('../views/backend/faculty.ejs',{x})
          } 
        else if(extractValue === 'register') {
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
 router.get('/placementrecords/plcmtrecord', (req,res) => {
    plcmtRecords.find()
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

          const extractValue = p.itdeptUrl;
          if(extractValue) {
            if (extractValue==='ITfaculty.ejs')
            {
                res.render('../views/frontend/dynamic-itfaculty', {p})
            }
        // if(extractValue === 'result.ejs') {
        //   res.render('../views/frontend/dynamic-page',{p})
        // } else if(extractValue === 'register') {
        //     res.render('../views/frontend/register',{p})
        // } else {
        //   res.render('../views/frontend/register',{p})
         }
        // res.render('../views/frontend/dynamic-itdept',{p}) 
       }
       else {
        res.redirect('/')
       }
    })
    .catch((q) => {
        console.log(q)
    })

 })



 router.get('/department/comp/:compdept', (req,res) => {
    CompdeptModel.findOne({compdeptUrl: req.params.compdept})
    .then((p) => {
       if(p){
        res.render('../views/frontend/dynamic-compdept',{p}) 
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