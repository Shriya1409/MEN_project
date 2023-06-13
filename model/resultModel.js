let mongoose = require("mongoose")

let resultModelSchema = mongoose.Schema({
    course :{
        type:String,
        required:true
    },
   semester : {
        type:String,
        required:false
    },
    rc :{
        type:String,
        required:true
    },
    date : {
        type:String,
        required:false
    },
    
    resultpdf : {
        type:String,
        
    },
    pageDetails : {
        type:String,
        required: false
    },
})

module.exports = ResultModel = mongoose.model('resultTable',resultModelSchema);
