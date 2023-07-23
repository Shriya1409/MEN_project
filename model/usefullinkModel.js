let mongoose = require("mongoose")

let usefullinkSchema = mongoose.Schema({
    
    usefulinfoname:{
        type:String,
    },
    usefulinfo:{
        type:String,
    },
    
   
})

module.exports = usefullinkModel = mongoose.model('usefullinktable',usefullinkSchema);
