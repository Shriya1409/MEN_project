let mongoose = require("mongoose")

let enedeptModelSchema = mongoose.Schema({
    eventenenav:{
        type:String,
    },
    eventenename:{
        type:String,
    }, 
    eventenedate:{
        type:Date,
    },
    eventeneperson:{
        type: String,
    },
    eventenedesc:{
        type:String,
    },
    eventenephoto : {
        type:String,
        
    },
})

module.exports = ENEdeptModel = mongoose.model('ENEdeptTable',enedeptModelSchema);
