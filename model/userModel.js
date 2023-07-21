const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ['admin', 'faculty', 'placement'],
      required: true
    },

    permissions: {
      type: [String], // Change this to an array of strings
      required: true,
      validate: {
        validator: function (permissions) {
          // Validate permissions based on the role
          if (this.role === 'admin') {
            return permissions.every(permission => ['admin-file', 'page-file', 'add-page-file'].includes(permission));
          } else if (this.role === 'faculty') {
            return permissions.every(permission => ['admin-file', 'faculty-file', 'add-faculty-file'].includes(permission));
          } else if (this.role === 'placement') {
            return permissions.every(permission => ['admin-file', 'placement-file'].includes(permission));
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

   
