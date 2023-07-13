let mongoose = require("mongoose")

let infrastructureModelSchema = mongoose.Schema({
    infradepturl :{
        type:String,
       required:true,
    },
    infradeptnavtext : {
        type:String,
        required:true,
    },
    infradepttitle :{
        type:String,
        required:true,
    },
    infradeptphoto : {
        type:Array,
        
    },
   
    
})

module.exports = infrastructureModel = mongoose.model('infrastructuretable',infrastructureModelSchema);
