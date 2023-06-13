let mongoose = require("mongoose");

let plcmtRecordsSchema = mongoose.Schema({
    StudentName :{
        type:String,
        required:true
    },
    RollNo : {
        type:String,
        required:true
    },
    Dept:
    {
        type:String,
        required: true

    },
    BatchYr :{
        type:String,
        required:true
    },
    Cgpa : {
        type:String,
        required:false
    },
    Company : {
        type:String,
        required:true
    },
    SemNo : {
        type:String,
        required:true
    },
    Package: {
        type: String,
        required: true
    }
})

module.exports = plcmtRecords = mongoose.model('plcmtRecordsTable', plcmtRecordsSchema);