let mongoose = require("mongoose")

let facultyModelSchema = mongoose.Schema({
    facultyName :{
        type:String,
        required:true
    },
    facultyQualification : {
        type:String,
        required:true
    },
    facultyDepartment :{
        type:String,
        required:true
    },
    facultyJoiningYear : {
        type:String,
        required:true
    },
    facultyEmailId : {
        type:String,
        required:true
    },
    facultyPhoto : {
        type:String
        
    },
})

module.exports = FacultyModel = mongoose.model('facultyTable',facultyModelSchema);
