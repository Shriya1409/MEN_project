let mongoose = require("mongoose")

let compdeptModelSchema = mongoose.Schema({
    compdeptUrl :{
        type:String,
        required:true
    },
    compdeptNavText : {
        type:String,
        required:true
    },
    compdeptTitle :{
        type:String,
        required:true
    },
    compdeptHeading : {
        type:String,
        required:false
    },
    compdeptPhoto : {
        type:String,
        
    },
    compdeptDetails : {
        type:String,
        required: false
    },
})

module.exports = CompdeptModel = mongoose.model('CompdeptTable',compdeptModelSchema);
