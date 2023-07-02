let mongoose = require("mongoose")

let facultyModelSchema = mongoose.Schema({
    faculty_name :{
        type:String,
        required:true
    },
   qualification : {
        type:String,
        required:false
    },
    department :{
        type:String,
        required:true
    },
    joining_year : {
        type:String,
        required:true
    },
    
    emailid : {
        type:String,
        required:true
    },
    facultyPhoto : {
        type:String
        
    },
})

module.exports = FacultyModel = mongoose.model('facultyTable',facultyModelSchema);
