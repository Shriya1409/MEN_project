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
    eventslider : {
        type:Array,
        
    },
    
})

module.exports = eventsModel = mongoose.model('eventstable',eventsModelSchema);
