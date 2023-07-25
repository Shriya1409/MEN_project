let mongoose = require("mongoose")

let itdeptModelSchema = mongoose.Schema({
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
