let mongoose = require("mongoose")

let enefacultyModelSchema = mongoose.Schema({
    enefacultyName :{
        type:String,
        required:true
    },
    enefacultyQualification : {
        type:String,
        required:true
    },
    enefacultyDepartment :{
        type:String,
        required:true
    },
    enefacultyJoiningYear : {
        type:String,
        required:true
    },
    enefacultyEmailId : {
        type:String,
        required:true
    },
    enefacultyPhoto : {
        type:String
        
    },
})

module.exports = eneFacultyModel = mongoose.model('enefacultyTable',enefacultyModelSchema);
