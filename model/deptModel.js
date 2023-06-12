let mongoose = require("mongoose")

let deptModelSchema = mongoose.Schema({
    deptUrl :{
        type:String,
        required:true
    },
    deptNavText : {
        type:String,
        required:true
    },
    deptTitle :{
        type:String,
        required:true
    },
    deptHeading : {
        type:String,
        required:false
    },
    deptPhoto : {
        type:String,
        
    },
    deptDetails : {
        type:String,
        required: false
    },
})

module.exports = deptModel = mongoose.model('deptTable',deptModelSchema);
