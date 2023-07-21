const { text } = require("body-parser");
let mongoose = require("mongoose")

let eventsModelSchema = mongoose.Schema({
    eventdepturl :{
        type:String,
       required:true,
    },
    eventdeptnavtext: {
        type:String,
        required:true,
    },
    eventdepttitle :{
        type:String,
        required:true,
    },
    eventnav:{
        type:String,
    },
    eventname:{
        type:String,
    }, 
    eventdate:{
        type:Date,
    },
    eventperson:{
        type: String,
    },
    eventdesc:{
        type:String,
    },
    eventphoto : {
        type:String,
        
    },
    
})

module.exports = eventsModel = mongoose.model('eventstable',eventsModelSchema);
