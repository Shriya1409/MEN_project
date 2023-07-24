let mongoose = require("mongoose")

let itdeptModelSchema = mongoose.Schema({
    eventitdepturl :{
        type:String,
       required:true,
    },
    eventitdeptnavtext: {
        type:String,
        required:true,
    },
    eventitdepttitle :{
        type:String,
        required:true,
    },
    eventitnav:{
        type:String,
    },
    eventitname:{
        type:String,
    }, 
    eventitdate:{
        type:Date,
    },
    eventitperson:{
        type: String,
    },
    eventitdesc:{
        type:String,
    },
    eventitphoto : {
        type:String,
        
    },
})

module.exports = ITdeptModel = mongoose.model('ITdeptTable',itdeptModelSchema);
