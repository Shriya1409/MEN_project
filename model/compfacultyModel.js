let mongoose = require("mongoose")

let compfacultyModelSchema = mongoose.Schema({
    compfacultyName :{
        type:String,
        required:true
    },
    compfacultyQualification : {
        type:String,
        required:true
    },
    compfacultyDepartment :{
        type:String,
        required:true
    },
    compfacultyJoiningYear : {
        type:String,
        required:true
    },
    compfacultyEmailId : {
        type:String,
        required:true
    },
    compfacultyPhoto : {
        type:String
        
    },
})

module.exports = compFacultyModel = mongoose.model('compfacultyTable',compfacultyModelSchema);
