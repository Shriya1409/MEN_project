const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ['admin','adminn', 'faculty', 'placement'],
      required: true
    },

    permissions: {
      type: [String], // Change this to an array of strings
      required: true,
      validate: {
        validator: function (permissions) {
          // Validate permissions based on the role
          if (this.role === 'admin') {
            return permissions.every(permission => ['admin-file', 'page-file', 'add-page-file', 'carousel-imgs-file','add-carousel-imgs-file','notif-file','add-notif'].includes(permission));
          } else if (this.role === 'adminn') {
            return permissions.every(permission => ['admin-file', 'page-file','add-page-file', 'carousel-imgs-file','add-carousel-imgs-file','notif-file', 'add-notif','dept-file','add-dept-file','infra-file','add-infra-file','events','add-events','result-file','add-result-file','syllabus-file','add-syllabus-file','student-record','add-student-records','faculty-file','add-faculty-file','compfaculty-file','add-compfaculty-file','etcfaculty-file','add-etcfaculty-file','enefaculty-file','add-enefaculty-file','mechfaculty-file','add-mechfaculty-file','civilfaculty-file','add-civilfaculty-file'].includes(permission));
          }else if (this.role === 'faculty') {
            return permissions.every(permission => ['admin-file'].includes(permission));
          } else if (this.role === 'placement') {
            return permissions.every(permission => ['admin-file', 'placement-file','add-plcmt-file','plcmt-records','add-plcmt-records'].includes(permission));
          }
          return false;
        },
        message: 'Invalid permissions for the role'
      }
    }

  });
  
  module.exports = User = mongoose.model('User', userSchema);

//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   department: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['admin', 'faculty', 'placement'],
//     // required: true
//   },
//   permissions: {
//     type: String,
//     // required: true
//   }

   
