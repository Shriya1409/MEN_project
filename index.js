let express = require('express');
let session = require('express-session')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
const bcrypt = require('bcrypt');
let dotenv = require('dotenv')
let flash = require('connect-flash')
let methodOverride = require('method-override')
const jwt = require('jsonwebtoken');
var cors = require('cors')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const connectDB = require('./config/db');


// Load env variables
dotenv.config();

let app = express();
app.use(express.json());
app.use(cors())

// cors
app.use(cors({ origin: true, credentials: true }));
connectDB();

//middleware
app.use(session({
  secret: 'First-web',
  resave: false,
  saveUninitialized: true
}))


app.set('view engine', 'ejs')
//app.set("views", "./views"); 
// app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(flash())

let pageModel = require('./model/pageModel')
let carouselImgModel=require('./model/carouselImgModel')
let noticesModel=require('./model/noticesModel')
let deptModel = require('./model/deptModel')
let infrastructureModel = require('./model/infrastructureModel')
let eventsModel = require('./model/eventsModel')
let resultModel=require('./model/resultModel')
let syllabusModel=require('./model/syllabusModel')
let studRecords=require('./model/studRecords')
let facultyModel=require('./model/facultyModel')
let compfacultyModel=require('./model/compfacultyModel')
let etcfacultyModel=require('./model/etcfacultyModel')
let enefacultyModel=require('./model/enefacultyModel')
let mechfacultyModel=require('./model/mechfacultyModel')
let civilfacultyModel=require('./model/civilfacultyModel')
let plcmtModel=require('./model/plcmtModel')
let plcmtRecords=require('./model/plcmtRecords')

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.err = req.flash('err')

    pageModel.find({})
    .then((x) => {
        res.locals.navdata = x
    })

    next()
})






//middleware
const requireAuth = (req, res, next) => {
  console.log('Checking login status...');
  if(req.session && req.session.user) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    console.log('User not logged in. Redirecting to login page.');
    req.session.destroy();
    // req.flash('err', 'User is not authenticated!! Try again...');
    res.redirect('/login'); // User is not authenticated, redirect to the login page
  }
};


// Helper function to get default permissions based on the role
function getPermissionsForRole(role) {
  switch (role) {
    case 'admin':
      return ['admin-file', 'page-file', 'add-page-file', 'carousel-imgs-file','add-carousel-imgs-file','notif-file','add-notif', 'dept-file','add-dept-file','infra-file','add-infra-file','result-file','add-result-file','syllabus-file','add-syllabus-file','student-record','add-student-records','faculty-file','add-faculty-file','compfaculty-file','add-compfaculty-file','etcfaculty-file','add-etcfaculty-file','enefaculty-file','add-enefaculty-file','mechfaculty-file','add-mechfaculty-file','civilfaculty-file','add-civilfaculty-file','placement-file','add-plcmt-file'];
    case 'adminn':
      return ['admin-file','page-file', 'add-page-file','carousel-imgs-file','add-carousel-imgs-file','notif-file','add-notif', 'dept-file','add-dept-file','infra-file','add-infra-file','result-file','add-result-file','syllabus-file','add-syllabus-file','student-record','add-student-records','faculty-file','add-faculty-file','compfaculty-file','add-compfaculty-file','etcfaculty-file','add-etcfaculty-file','enefaculty-file','add-enefaculty-file','mechfaculty-file','add-mechfaculty-file','civilfaculty-file','add-civilfaculty-file','placement-file','add-plcmt-file'];
    case 'faculty':
      return ['admin-file'];
    case 'placement':
      return ['admin-file' ,'placement-file','add-plcmt-file','plcmt-records','add-plcmt-records'];
      
    default:
      return []; // Return an empty array or handle unknown roles as per your requirements
  }
}


const requirePermission = (permission) => (req, res, next) => {
  console.log('Checking permission status...');
  console.log('User permissions:', req.session.user.permissions);
  if(req.session.user.permissions.includes(permission)) {
    next(); // User has the required permission, proceed to the next middleware or route handler
  } else {
    console.log('User doesnt have permission. Redirecting to login page.');
    // req.flash('err', 'User doesnt have permission.!! Try again...');
    res.redirect('/admin'); // User does not have the required permission, redirect to the dashboard
  }
};







//admin routes
app.get('/admin', requireAuth , (req, res) => {
  res.render('../views/backend/admin-file', { user: req.session.user });
});


//PAGE
app.get('/page', requireAuth, requirePermission('page-file'), (req, res) => {
  pageModel.find({})
    .then((navdata) => {
      res.render('../views/backend/page-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

// app.get('/page/edit-page/:id', requireAuth, requirePermission('edit-page-file'), (req, res) => {
//   pageModel.find({})
//     .then((navdata) => {
//       res.render('../views/backend/edit-page-file', { user: req.session.user, navdata: navdata });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.redirect('/admin'); // Handle the error and redirect to the appropriate page
//     });
// });

app.get('/add-page', requireAuth, requirePermission('add-page-file'), (req, res) => {
  res.render('../views/backend/add-page-file', { user: req.session.user });
});

//HOME - CAROUSEL
app.get('/carousel-imgs', requireAuth, requirePermission('carousel-imgs-file'), (req, res) => {
  carouselImgModel.find({})
    .then((navdata) => {
      res.render('../views/backend/carousel-imgs-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-carousel-imgs', requireAuth, requirePermission('add-carousel-imgs-file'), (req, res) => {
  res.render('../views/backend/add-carousel-imgs-file', { user: req.session.user });
});

//HOME - LINKS
app.get('/notifications', requireAuth, requirePermission('notif-file'), (req, res) => {
  notificationModel.find({})
    .then((navdata) => {
      res.render('../views/backend/notif-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-notifications', requireAuth, requirePermission('add-notif'), (req, res) => {
  res.render('../views/backend/add-notif', { user: req.session.user });
});

//DEPARTMENTS - EACH DEPT
app.get('/department', requireAuth, requirePermission('dept-file'), (req, res) => {
  deptModel.find({})
    .then((navdata) => {
      res.render('../views/backend/dept-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-department', requireAuth, requirePermission('add-dept-file'), (req, res) => {
  res.render('../views/backend/add-dept-file', { user: req.session.user });
});

//DEPARTMENTS - Infrstructure
app.get('/infra', requireAuth, requirePermission('infra-file'), (req, res) => {
  infrastructureModel.find({})
    .then((navdata) => {
      res.render('../views/backend/infra-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-infra', requireAuth, requirePermission('add-infra-file'), (req, res) => {
  res.render('../views/backend/add-infra-file', { user: req.session.user });
});

//DEPARTMENTS - Events
// app.get('/events', requireAuth, requirePermission('events'), (req, res) => {
//   eventsModel.find({})
//     .then((navdata) => {
//       res.render('../views/backend/events', { user: req.session.user, navdata: navdata });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.redirect('/admin'); // Handle the error and redirect to the appropriate page
//     });
// });

// app.get('/add-events', requireAuth, requirePermission('add-events'), (req, res) => {
//   res.render('../views/backend/add-events', { user: req.session.user });
// });

//RESULT
app.get('/result', requireAuth, requirePermission('result-file'), (req, res) => {
  resultModel.find({})
    .then((navdata) => {
      res.render('../views/backend/result-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-result', requireAuth, requirePermission('add-result-file'), (req, res) => {
  res.render('../views/backend/add-result-file', { user: req.session.user });
});

//SYLLABUS
app.get('/syllabus', requireAuth, requirePermission('syllabus-file'), (req, res) => {
  syllabusModel.find({})
    .then((syllabusdata) => {
      res.render('../views/backend/syllabus-file', { user: req.session.user, syllabusdata: syllabusdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-syllabus', requireAuth, requirePermission('add-syllabus-file'), (req, res) => {
  res.render('../views/backend/add-syllabus-file', { user: req.session.user });
});

//STUDENT
app.get('/student', requireAuth, requirePermission('student-record'), (req, res) => {
  studRecords.find({})
    .then((studrec) => {
      res.render('../views/backend/student-record', { user: req.session.user, studrec: studrec });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-student', requireAuth, requirePermission('add-student-records'), (req, res) => {
  res.render('../views/backend/add-student-records', { user: req.session.user });
});

//FACULTY - IT
app.get('/faculty', requireAuth, requirePermission('faculty-file'), (req, res) => {
  facultyModel.find({})
    .then((navdata) => {
      res.render('../views/backend/faculty-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-faculty', requireAuth, requirePermission('add-faculty-file'), (req, res) => {
  res.render('../views/backend/add-faculty-file', { user: req.session.user });
});

//FACULTY - COMP
app.get('/compfaculty', requireAuth, requirePermission('compfaculty-file'), (req, res) => {
  compfacultyModel.find({})
    .then((navdata) => {
      res.render('../views/backend/compfaculty-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-compfaculty', requireAuth, requirePermission('add-compfaculty-file'), (req, res) => {
  res.render('../views/backend/add-compfaculty-file', { user: req.session.user });
});

//FACULTY - ETC
app.get('/etcfaculty', requireAuth, requirePermission('etcfaculty-file'), (req, res) => {
  etcfacultyModel.find({})
    .then((navdata) => {
      res.render('../views/backend/etcfaculty-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-etcfaculty', requireAuth, requirePermission('add-etcfaculty-file'), (req, res) => {
  res.render('../views/backend/add-etcfaculty-file', { user: req.session.user });
});

//FACULTY - ENE
app.get('/enefaculty', requireAuth, requirePermission('enefaculty-file'), (req, res) => {
  enefacultyModel.find({})
    .then((navdata) => {
      res.render('../views/backend/enefaculty-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-enefaculty', requireAuth, requirePermission('add-enefaculty-file'), (req, res) => {
  res.render('../views/backend/add-enefaculty-file', { user: req.session.user });
});

//FACULTY - MECH
app.get('/mechfaculty', requireAuth, requirePermission('mechfaculty-file'), (req, res) => {
  mechfacultyModel.find({})
    .then((navdata) => {
      res.render('../views/backend/mechfaculty-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-mechfaculty', requireAuth, requirePermission('add-mechfaculty-file'), (req, res) => {
  res.render('../views/backend/add-mechfaculty-file', { user: req.session.user });
});

//FACULTY - CIVIL
app.get('/civilfaculty', requireAuth, requirePermission('civilfaculty-file'), (req, res) => {
  civilfacultyModel.find({})
    .then((navdata) => {
      res.render('../views/backend/civilfaculty-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-civilfaculty', requireAuth, requirePermission('add-civilfaculty-file'), (req, res) => {
  res.render('../views/backend/add-civilfaculty-file', { user: req.session.user });
});



//PLACEMENT ADMIN PAGES
app.get('/placement', requireAuth, requirePermission('placement-file'), (req, res) => {
  plcmtModel.find({})
    .then((navdata) => {
      res.render('../views/backend/placement-file', { user: req.session.user, navdata: navdata });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-placement', requireAuth, requirePermission('add-plcmt-file'), (req, res) => {
  res.render('../views/backend/add-plcmt-file', { user: req.session.user });
});

//PLACEMENT ADMIN - records
app.get('/placement-records', requireAuth, requirePermission('plcmt-records'), (req, res) => {
  plcmtRecords.find({})
    .then((plcrec) => {
      res.render('../views/backend/plcmt-records', { user: req.session.user, plcrec: plcrec });
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/admin'); // Handle the error and redirect to the appropriate page
    });
});

app.get('/add-placement-records', requireAuth, requirePermission('add-plcmt-records'), (req, res) => {
  res.render('../views/backend/add-plcmt-records', { user: req.session.user });
});











// Create a form schema and model

//const Form = mongoose.model('Form', FormSchema);
// let Form = require('./model/formModel')

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
// let plcmtModel=require('./model/plcmtModel');


//backend route
let adminroute = require('./route/backend/admin')
let pageroute = require('./route/backend/page')
let deptroute = require('./route/backend/dept')
let itdeptroute = require('./route/backend/itdept')
let compdeptroute = require('./route/backend/compdept')
let etcdeptroute = require('./route/backend/etcdept')
let enedeptroute = require('./route/backend/enedept')
let mechdeptroute = require('./route/backend/mechdept')
let civildeptroute = require('./route/backend/civildept')

let addcarouselroute=require('./route/backend/add-carousel-imgs')
let carouselroute=require('./route/backend/carousel-imgs')

let addnotices=require('./route/backend/add-notices')
let noticesroute=require('./route/backend/notices')
let adduseful=require('./route/backend/add-usefullink')
let usefullinkroute=require('./route/backend/usefullink')

let facultyroute = require('./route/backend/faculty')
let addfacultyroute=require('./route/backend/add-faculty')
let compfacultyroute = require('./route/backend/compfaculty')
let addcompfacultyroute=require('./route/backend/add-compfaculty')
let etcfacultyroute = require('./route/backend/etcfaculty')
let addetcfacultyroute=require('./route/backend/add-etcfaculty')
let enefacultyroute = require('./route/backend/enefaculty')
let addenefacultyroute=require('./route/backend/add-enefaculty')
let mechfacultyroute = require('./route/backend/mechfaculty')
let addmechfacultyroute=require('./route/backend/add-mechfaculty')
let civilfacultyroute = require('./route/backend/civilfaculty')
let addcivilfacultyroute=require('./route/backend/add-civilfaculty')

let addpageroute = require('./route/backend/add-page')
let adddeptroute = require('./route/backend/add-dept')
let additdeptroute = require('./route/backend/add-itdept')
let addcompdeptroute = require('./route/backend/add-compdept')
let addetcdeptroute = require('./route/backend/add-etcdept')
let addenedeptroute = require('./route/backend/add-enedept')
let addmechdeptroute = require('./route/backend/add-mechdept')
let addcivildeptroute = require('./route/backend/add-civildept')

let resultroute = require('./route/backend/result')
let addresultroute = require('./route/backend/add-result')

let plcmtroute= require('./route/backend/placement')
let  addplcmtroute= require('./route/backend/add-placement')
let addplcmtrecordroute=require('./route/backend/add-placement-records')
let plcmtrecordroute=require('./route/backend/placement-records')

let addstudrecroute=require('./route/backend/add-student')
let studrecroute=require('./route/backend/student')

let syllabusroute = require('./route/backend/syllabus')
let addsyllabusroute = require('./route/backend/add-syllabus')
let adddepttemproute=require('./route/backend/dept-temp')

let addinfraroute=require('./route/backend/add-infra')
let infraroute=require('./route/backend/infra')
// let addeventsroute=require('./route/backend/add-events')
// let eventsroute=require('./route/backend/events')
let addcontactroute=require('./route/backend/add-contact')
let showcontactroute=require('./route/backend/show-contact')

app.use('/admin', adminroute)
app.use('/page', pageroute)
app.use('/department', deptroute)
app.use('/itdepartment', itdeptroute)
app.use('/compdepartment', compdeptroute)
app.use('/etcdepartment', etcdeptroute)
app.use('/enedepartment', enedeptroute)
app.use('/mechdepartment', mechdeptroute)
app.use('/civildepartment', civildeptroute)

app.use('/add-page', addpageroute)
app.use('/add-department', adddeptroute)
app.use('/add-itdepartment', additdeptroute)
app.use('/add-compdepartment', addcompdeptroute)
app.use('/add-etcdepartment', addetcdeptroute)
app.use('/add-enedepartment', addenedeptroute)
app.use('/add-mechdepartment', addmechdeptroute)
app.use('/add-civildepartment', addcivildeptroute)

app.use('/result', resultroute)
app.use('/add-result', addresultroute)


app.use('/syllabus', syllabusroute)
app.use('/add-syllabus', addsyllabusroute)

app.use('/placement', plcmtroute)
app.use('/add-placement', addplcmtroute)
app.use('/placement-records', plcmtrecordroute)
app.use('/add-placement-records', addplcmtrecordroute)

app.use('/student', studrecroute)
app.use('/add-student', addstudrecroute)

app.use('/dept-temp', adddepttemproute)

app.use('/faculty', facultyroute)
app.use('/add-faculty', addfacultyroute)
app.use('/compfaculty', compfacultyroute)
app.use('/add-compfaculty', addcompfacultyroute)
app.use('/etcfaculty', etcfacultyroute)
app.use('/add-etcfaculty', addetcfacultyroute)
app.use('/enefaculty', enefacultyroute)
app.use('/add-enefaculty', addenefacultyroute)
app.use('/mechfaculty', mechfacultyroute)
app.use('/add-mechfaculty', addmechfacultyroute)
app.use('/civilfaculty', civilfacultyroute)
app.use('/add-civilfaculty', addcivilfacultyroute)


app.use('/add-carousel-imgs', addcarouselroute)
app.use('/carousel-imgs', carouselroute)

app.use('/add-notices', addnotices)
app.use('/notices', noticesroute)
app.use('/add-usefullink', adduseful)
app.use('/usefullink', usefullinkroute)
app.use('/add-infra', addinfraroute)
app.use('/infra', infraroute)
// app.use('/add-events', addeventsroute)
// app.use('/events', eventsroute)

app.use('/add-contact', addcontactroute)
app.use('/show-contact', showcontactroute)

let formroute = require('./route/backend/editor-form')
app.use('/', formroute)


let loginroute = require('./route/backend/login')
app.use('/login', loginroute)

let registerroute = require('./route/backend/register')
app.use('/register', registerroute)



//frontend route
let headerroute = require('./route/frontend/header')
app.use('/', headerroute)


let User = require('./model/userModel')




//image
app.post('/upload',multipartMiddleware,(req,res)=>{
  try {
      fs.readFile(req.files.upload.path, function (err, data) {
          var newPath = __dirname + '/public/backend/images/' + req.files.upload.name;
          fs.writeFile(newPath, data, function (err) {
              if (err) console.log({err: err});
              else {
                  console.log(req.files.upload.originalFilename);
              //     imgl = '/images/req.files.upload.originalFilename';
              //     let img = "<script>window.parent.CKEDITOR.tools.callFunction('','"+imgl+"','ok');</script>";
              //    res.status(201).send(img);
               
                  let fileName = req.files.upload.name;
                  let url = '/backend/images/'+fileName;                    
                  let msg = 'Upload successfully';
                  let funcNum = req.query.CKEditorFuncNum;
                 // console.log({url,msg,funcNum});
                 
                  res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+url+"','"+msg+"');</script>");
              }
          });
      });
     } catch (error) {
         console.log(error.message);
     }
})
//login route
// app.get('/', (req, res) => {
//     res.render('./views/frontend/login');
//     // console.log(error)
//   });

// //register route
  // app.get('/register', (req, res) => {
  //   res.render('register');
  // });

// //login

//logout
// app.get('/logout', (req, res) => {
//   if (req.session) {
//     req.session.destroy(); // Destroy the session if it exists
//   }
//   res.redirect('/login'); // Redirect to the login page
// });

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const permissions = getPermissionsForRole(user.role);
        // req.session.user = user; // Store the authenticated user in the session
        // Store the authenticated user in the session
        req.session.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
          permissions, // Store the user's permissions in the session
        };

        console.log('User logged in:', req.session.user);
        res.redirect('/admin');
      } else {
        res.redirect('/login');
      }
    })
    .catch((error) => {
      console.log(error);
      req.flash('err', 'Invalid Details. Please try again!!');
      res.redirect('/login');
    });
});



//register
app.post('/register', (req, res) => {
  const { email, password, role } = req.body;

  // Hash the password using bcrypt
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new user
  const newUser = new User({
    email,
    password: hashedPassword,
    role,
    permissions: getPermissionsForRole(role) // Default permission for all registered users
  });

  newUser.save()
    .then(() => {
      req.session.user = newUser; // Store the registered user in the session
      console.log('User registered:', req.session.user);
      req.flash('success', 'User registered successfully! You can now log in.');
      res.redirect('/login');
    })
    .catch((error) => {
      console.log(error);
      req.flash('err', 'Failed to register user. Please try again.');
      res.redirect('/register');
    });
});


//logout
app.post('/logout', (req, res) => {
  // Check if the session exists before destroying it
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      } else {
        console.log('User logged out. Session destroyed.');
      }
      res.redirect('/login'); // Redirect to the login page after session destruction
    });
  } else {
    // If the session doesn't exist, simply redirect to the login page
    res.redirect('/login');
  }
});






app.listen(process.env.PORT, () => {
  
    console.log(process.env.PORT, 'port working')
})


