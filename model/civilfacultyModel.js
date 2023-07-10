let mongoose = require("mongoose")

let civilfacultyModelSchema = mongoose.Schema({
    civilfacultyName :{
        type:String,
        required:true
    },
    civilfacultyQualification : {
        type:String,
        required:true
    },
    civilfacultyDepartment :{
        type:String,
        required:true
    },
    civilfacultyJoiningYear : {
        type:String,
        required:true
    },
    civilfacultyEmailId : {
        type:String,
        required:true
    },
    civilfacultyPhoto : {
        type:String
        
    },
})

module.exports = civilFacultyModel = mongoose.model('civilfacultyTable',civilfacultyModelSchema);
