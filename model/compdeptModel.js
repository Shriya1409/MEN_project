let mongoose = require("mongoose")

let compdeptModelSchema = mongoose.Schema({

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
