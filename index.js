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


app.set('view engine', 'ejs')
//app.set("views", "./views"); 
// app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))
//middleware
app.use(session({
    secret: 'First-web',
    resave: false,
    saveUninitialized: true
}))

app.use(flash())

let pageModel = require('./model/pageModel')

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.err = req.flash('err')

    pageModel.find({})
    .then((x) => {
        res.locals.navdata = x
    })

    next()
})



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

let addcarouselroute=require('./route/backend/add-carousel-imgs')
let carouselroute=require('./route/backend/carousel-imgs')

let addnotifications=require('./route/backend/add-notifications')
let notificationsroute=require('./route/backend/notifications')

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
let addeventsroute=require('./route/backend/add-events')
let eventsroute=require('./route/backend/events')

app.use('/admin', adminroute)
app.use('/page', pageroute)
app.use('/department', deptroute)
app.use('/itdepartment', itdeptroute)
app.use('/compdepartment', compdeptroute)

app.use('/add-page', addpageroute)
app.use('/add-department', adddeptroute)
app.use('/add-itdepartment', additdeptroute)
app.use('/add-compdepartment', addcompdeptroute)

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
app.use('/add-notifications', addnotifications)
app.use('/notifications', notificationsroute)
app.use('/add-infra', addinfraroute)
app.use('/infra', infraroute)
app.use('/add-events', addeventsroute)
app.use('/events', eventsroute)

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



app.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user; // Store the authenticated user in the session
        res.redirect('/admin');
      } else {
        res.redirect('/login');
      }
    })
    .catch((error) => {
      console.log(error);
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
    permissions: ['admin-file'] // Default permission for all registered users
  });

  newUser.save()
    .then(() => {
      req.session.user = newUser; // Store the registered user in the session
      res.redirect('/login');
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/register');
    });
});


//middleware
const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.redirect('/login'); // User is not authenticated, redirect to the login page
  }
};

const requirePermission = (permission) => (req, res, next) => {
  if (req.session.user.permissions.includes(permission)) {
    next(); // User has the required permission, proceed to the next middleware or route handler
  } else {
    res.redirect('/admin'); // User does not have the required permission, redirect to the dashboard
  }
};



//admin routes
// app.get('/admin', requireAuth , (req, res) => {
//   res.render('admin-file', { user: req.session.user });
// });

// // Example route that requires admin permission
// app.get('/page/:id', requireAuth, requirePermission('admin'), (req, res) => {
//   res.render('page-file', { user: req.session.user });
// });

// app.get('/add-page/:id', requireAuth, requirePermission('admin'), (req, res) => {
//   res.render('add-page-file', { user: req.session.user });
// });




//   // Example route that requires placement permission
// app.get('/admin/placement', requireAuth, requirePermission('placement'), (req, res) => {
//   res.render('placement-file', { user: req.session.user });
// });

//logout
app.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session upon logout
  res.redirect('/login');
});





app.listen(process.env.PORT, () => {
  
    console.log(process.env.PORT, 'port working')
})