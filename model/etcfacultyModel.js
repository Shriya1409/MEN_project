let mongoose = require("mongoose")

let etcfacultyModelSchema = mongoose.Schema({
    etcfacultyName :{
        type:String,
        required:true
    },
    etcfacultyQualification : {
        type:String,
        required:true
    },
    etcfacultyDepartment :{
        type:String,
        required:true
    },
    etcfacultyJoiningYear : {
        type:String,
        required:true
    },
    etcfacultyEmailId : {
        type:String,
        required:true
    },
    etcfacultyPhoto : {
        type:String
        
    },
})

module.exports = etcFacultyModel = mongoose.model('etcfacultyTable',etcfacultyModelSchema);
