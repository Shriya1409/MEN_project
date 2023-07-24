let mongoose = require("mongoose")

let compdeptModelSchema = mongoose.Schema({
    eventcompdepturl :{
        type:String,
       required:true,
    },
    eventcompdeptnavtext: {
        type:String,
        required:true,
    },
    eventcompdepttitle :{
        type:String,
        required:true,
    },
    eventcompnav:{
        type:String,
    },
    eventcompname:{
        type:String,
    }, 
    eventcompdate:{
        type:Date,
    },
    eventcompperson:{
        type: String,
    },
    eventcompdesc:{
        type:String,
    },
    eventcompphoto : {
        type:String,
        
    },
})

module.exports = CompdeptModel = mongoose.model('CompdeptTable',compdeptModelSchema);
