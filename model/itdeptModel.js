let mongoose = require("mongoose")

let itdeptModelSchema = mongoose.Schema({
    itdeptUrl :{
        type:String,
        required:true
    },
    itdeptNavText : {
        type:String,
        required:true
    },
    itdeptTitle :{
        type:String,
        required:true
    },
    itdeptHeading : {
        type:String,
        required:false
    },
    itdeptPhoto : {
        type:String,
        
    },
    itdeptDetails : {
        type:String,
        required: false
    },
})

module.exports = ITdeptModel = mongoose.model('ITdeptTable',itdeptModelSchema);
