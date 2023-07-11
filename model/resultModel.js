let mongoose = require("mongoose")

let resultModelSchema = mongoose.Schema({
    title :{
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
    reval : {
        type:String,
        
    },
    resultpdf : {
        type:String,
        
    },
   department: {
        type:String,
        required: false
    },
})

module.exports = ResultModel = mongoose.model('resultTable',resultModelSchema);
