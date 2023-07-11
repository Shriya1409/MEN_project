let mongoose = require("mongoose")

let mechfacultyModelSchema = mongoose.Schema({
    mechfacultyName :{
        type:String,
        required:true
    },
    mechfacultyQualification : {
        type:String,
        required:true
    },
    mechfacultyDepartment :{
        type:String,
        required:true
    },
    mechfacultyJoiningYear : {
        type:String,
        required:true
    },
    mechfacultyEmailId : {
        type:String,
        required:true
    },
    mechfacultyPhoto : {
        type:String
        
    },
})

module.exports = mechFacultyModel = mongoose.model('mechfacultyTable',mechfacultyModelSchema);
