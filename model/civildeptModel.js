let mongoose = require("mongoose")

let civildeptModelSchema = mongoose.Schema({
    eventcivilnav:{
        type:String,
    },
    eventcivilname:{
        type:String,
    }, 
    eventcivildate:{
        type:Date,
    },
    eventcivilperson:{
        type: String,
    },
    eventcivildesc:{
        type:String,
    },
    eventcivilphoto : {
        type:String,
        
    },
})

module.exports = CivildeptModel = mongoose.model('CivildeptTable',civildeptModelSchema);
