let mongoose = require("mongoose");

let plcmtRecordsSchema = mongoose.Schema({
    student_name :{
        type:String,
        required:true
    },
    rollno : {
        type:String,
        required:true
    },
    department:
    {
        type:String,
        required: true

    },
    batchyr :{
        type:String,
        required:true
    },
    cgpa : {
        type:String,
        required:false
    },
    company : {
        type:String,
        required:true
    },
    semno : {
        type:String,
        required:true
    },
    package: {
        type: String,
        required: true
    }
})

module.exports = plcmtRecords = mongoose.model('plcmtRecordsTable', plcmtRecordsSchema);