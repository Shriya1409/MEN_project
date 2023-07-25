let mongoose = require("mongoose")

let mechdeptModelSchema = mongoose.Schema({
    eventmechnav:{
        type:String,
    },
    eventmechname:{
        type:String,
    }, 
    eventmechdate:{
        type:Date,
    },
    eventmechperson:{
        type: String,
    },
    eventmechdesc:{
        type:String,
    },
    eventmechphoto : {
        type:String,
        
    },
})

module.exports = MechdeptModel = mongoose.model('MechdeptTable',mechdeptModelSchema);
