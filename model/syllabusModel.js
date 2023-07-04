let mongoose = require("mongoose")

let syllabusModelSchema = mongoose.Schema({
    syllabus_title :{
        type:String,
        required:true
    },
    department : {
        type:String,
        required:false
    },
    rc :{
        type:String,
        required:true
    },
    syllabuspdf : {
        type:String,
        
    }
})

module.exports = syllabusModel = mongoose.model('syllabusTable',syllabusModelSchema);
