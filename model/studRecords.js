let mongoose = require("mongoose");

let studRecordsSchema = mongoose.Schema({
    stud_name :{
        type:String,
        required:true
    },
    rollnoo : {
        type:String,
        required:true
    },
    depart:
    {
        type:String,
        required: true

    },
    yr :{
        type:String,
        required:true
    },
    cgpa : {
        type:String,
       
    },
    pr : {
        type:String,
        required:true
    },
    backlog : {
        type:String,
        required:true
    },
    sem: {
        type: String,
        required: true
    },
    recPhoto:{
        type: String,

    }
})

module.exports = studRecords = mongoose.model('studRecordsTable', studRecordsSchema);