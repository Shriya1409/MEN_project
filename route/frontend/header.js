let express =  require('express')
let multer=require('multer')
let pageModel = require('../../model/pageModel')
let deptModel = require('../../model/deptModel')
let ITdeptModel = require('../../model/itdeptModel')
let CompdeptModel = require('../../model/compdeptModel')
let plcmtModel=require('../../model/plcmtModel')

let plcmtRecords=require('../../model/plcmtRecords')

let contactModel = require('../../model/contactModel');
let studRecords=require('../../model/studRecords')

let facultyModel=require('../../model/facultyModel')
let compfacultyModel=require('../../model/compfacultyModel')
let etcfacultyModel=require('../../model/etcfacultyModel')
let enefacultyModel=require('../../model/enefacultyModel')
let mechfacultyModel=require('../../model/mechfacultyModel')
let civilfacultyModel=require('../../model/civilfacultyModel')

let resultModel=require('../../model/resultModel')
let syllabusModel=require('../../model/syllabusModel')
let noticesModel=require('../../model/noticesModel')
let usefullinkModel=require('../../model/usefullinkModel')
let carouselImgModel=require('../../model/carouselImgModel')
let eventsModel = require('../../model/eventsModel')
let infrastructureModel = require('../../model/infrastructureModel')

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
            
        })
        .catch((q) => {
            console.log(q)
        })
    next()
})

eventsModel.find({})
    .then((p)=> {
        router.locals.eventdata = p;
    })
    .catch((q) => {
        console.log(q)
    })

router.use((req, res, next) => {
    eventsModel.find({})
        .then((p) => {
            res.locals.eventdata = p; //here set local variable  and then value
            //console.log(x)
        })
        .catch((q) => {
            console.log(q)
        })
    next()
})

infrastructureModel.find({})
    .then((p)=> {
        router.locals.infradata = p;
    })
    .catch((q) => {
        console.log(q)
    })

router.use((req, res, next) => {
    infrastructureModel.find({})
        .then((p) => {
            res.locals.infradata = p; //here set local variable  and then value
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

noticesModel.find({})
    .then((e)=> {
        router.locals.noticesdata = e;
    })
    .catch((f) => {
        console.log(f)
    })

router.use((req, res, next) => {
    noticesModel.find({})
        .then((e) => {
            res.locals.noticesdata = e; //here set local variable  and then value
            //console.log(x)
        })
        .catch((f) => {
            console.log(f)
        })
    next()
})
usefullinkModel.find({})
    .then((m)=> {
        router.locals.usefuldata = m;
    })
    .catch((n) => {
        console.log(n)
    })

router.use((req, res, next) => {
    usefullinkModel.find({})
        .then((m) => {
            res.locals.usefuldata = m; //here set local variable  and then value
            //console.log(x)
        })
        .catch((n) => {
            console.log(n)
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
          else if(extractValue === 'faculty.ejs') {
            res.render('../views/backend/faculty.ejs',{x})
          } 
        else if(extractValue === 'login.ejs') {
            res.render('../views/frontend/login.ejs',{x})
        }
        else if(extractValue === 'register.ejs') {
            res.render('../views/frontend/register.ejs',{x})
        }
        else if(extractValue==='contact.ejs'){
            res.render('../views/frontend/contact.ejs', {x})
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
//faculty models

//  router.get('/department/faculty/:compfaculty', (req,res) => {
//     compfacultyModel.findOne({compfacultyName: req.params.compfaculty})
//     .then((i) => {
//        if(i){
//           res.render('../views/frontend/dynamic-compfaculty',{i})
//         } 
        
//        else {
//         res.redirect('/')
//        }
    
//     })
//     .catch((j) => {
//         console.log(j)
//     })
    
//  })
//  router.get('/department/faculty/:itfaculty', (req,res) => {
//     facultyModel.findOne({facultyName: req.params.itfaculty})
//     .then((i) => {
//        if(i){
//           res.render('../views/frontend/dynamic-itfaculty',{i})
//         } 
        
//        else {
//         res.redirect('/')
//        }
    
//     })
//     .catch((j) => {
//         console.log(j)
//     })
    
//  })
 
 //faculty model ends
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

         const extractValue = p.deptUrl;
         if(extractValue) {
        if(extractValue === 'ITFaculty.ejs') {
          res.render('../views/frontend/dynamic-itfaculty',{p})
        } 
        else if(extractValue === 'CompFaculty.ejs') {
            res.render('../views/frontend/dynamic-compfaculty',{p})
        } 
        else if(extractValue === 'ETCFaculty.ejs') {
            res.render('../views/frontend/dynamic-etcfaculty',{p})
        } 
        else if(extractValue === 'ENEFaculty.ejs') {
            res.render('../views/frontend/dynamic-enefaculty',{p})
        } 
        else if(extractValue === 'CivilFaculty.ejs') {
            res.render('../views/frontend/dynamic-civilfaculty',{p})
        } 
        else if(extractValue === 'MechFaculty.ejs') {
            res.render('../views/frontend/dynamic-mechfaculty',{p})
        } //events-section
        if(extractValue === 'ITEvents.ejs') {
            res.render('../views/frontend/dynamic-itevents',{p})
          } 
          else if(extractValue === 'CompEvents.ejs') {
              res.render('../views/frontend/dynamic-compevents',{p})
          } 
          else if(extractValue === 'ETCEvents.ejs') {
              res.render('../views/frontend/dynamic-etcevents',{p})
          } 
          else if(extractValue === 'ENEEvents.ejs') {
              res.render('../views/frontend/dynamic-eneevents',{p})
          } 
          else if(extractValue === 'CivilEvents.ejs') {
              res.render('../views/frontend/dynamic-civilevents',{p})
          } 
          else if(extractValue === 'MechEvents.ejs') {
              res.render('../views/frontend/dynamic-mechevents',{p})
          } 
        else{
        res.render('../views/frontend/dynamic-dept',{p}) 
        }
       }}
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
        res.render('../views/backend/plcmtrecord',{a}) 
       }
       else {
        res.redirect('/')
       }
    })
    .catch((b) => {
        console.log(b)
    })
    

 })

 router.get('/syllabus/syllabus', (req,res) => {
    syllabusModel.find()
    .then((a) => {
       if(a){
        res.render('../views/frontend/syllabus',{a}) 
       }
       else {
        res.redirect('/')
       }
    })
    .catch((b) => {
        console.log(b)
    })

})

router.get('/syllabus/scheme', (req,res) => {
    syllabusModel.find()
    .then((a) => {
       if(a){
        res.render('../views/frontend/scheme',{a}) 
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



//  router.get('/department/events/:events', (req,res) => {
//     eventsModel.findOne({eventdepturl: req.params.events})
//     .then((p) => {
//        if(p){

//         res.render('../views/frontend/dept-events',{p}) 
//        }
//        else {
//         res.redirect('/')
//        }
//     })
//     .catch((q) => {
//         console.log(q)
//     })

//  })

//  router.get('/department/infrastructure/:infra', (req,res) => {
//     infrastructureModel.findOne({infradepturl: req.params.infra})
//     .then((p) => {
//        if(p){

//         res.render('../views/frontend/dept-infra',{p}) 
//        }
//        else {
//         res.redirect('/')
//        }
//     })
//     .catch((q) => {
//         console.log(q)
//     })

//  })

// router.get('/department/it/:itdept', (req,res) => {
//     ITdeptModel.findOne({eventitdepturl: req.params.itdept})
//     .then((p) => {
//        if(p){
//         res.render('../views/frontend/itdept-events',{p}) 
//        }
//        else {
//         res.redirect('/')
//        }
//     })
//     .catch((q) => {
//         console.log(q)
//     })

//  })

//  router.get('/department/comp/:compdept', (req,res) => {
//     CompdeptModel.findOne({eventcompdepturl: req.params.compdept})
//     .then((p) => {
//        if(p){
//         res.render('../views/frontend/compdept-events',{p}) 
//        }
//        else {
//         res.redirect('/')
//        }
//     })
//     .catch((q) => {
//         console.log(q)
//     })

//  })
contactModel.find({})
    .then((x)=> {
        router.locals.contactdata = x;
    })
    .catch((y) => {
        console.log(y)
    })

router.use((req, res, next) => {
    contactModel.find({})
        .then((x) => {
            res.locals.contactdata = x; //here set local variable  and then value
            //console.log(x)
        })
        .catch((y) => {
            console.log(y)
        })
    next()
})

// router.get('/add-contact', (req,res) => {
//     res.render('../views/frontend/contact')
// })

// router.post('/',  (req,res) => {
// contactModel.findOne({cemail: req.body.cemail})
// .then((y) => {
//     if(y) {
//         req.flash('err', 'Urll already exists, Please try with another url!!')
//         res.redirect('/contact/')
//         // console.log('Url already exists, Please try with another url!!')
//     } else {
//             contactModel.create({
//                 cname:req.body.cname,
//                 cemail:req.body.cemail,
//                 csubject:req.body.csubject,
//                 cmessage:req.body.cmessage,
//             })
//             .then((z) => {
//                 req.flash('success', 'Your data has been added successfully')
//                  res.redirect('/contact/')
//             })
    
        

//     }
// })



// })

module.exports = router