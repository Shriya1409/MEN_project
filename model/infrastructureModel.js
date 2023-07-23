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
    infranav:{
        type: String,
    },
    infradeptphoto : {
        type:Array,
        
    },
    infradeptabout : {
        type:String,
        required: false
    },
    
})

module.exports = infrastructureModel = mongoose.model('infrastructuretable',infrastructureModelSchema);
