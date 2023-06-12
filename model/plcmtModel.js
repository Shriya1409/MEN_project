let mongoose = require("mongoose");

let plcmtModelSchema = mongoose.Schema({
    plcmtUrl :{
        type:String,
        required:true
    },
    plcmtNavText : {
        type:String,
        required:false
    },
    plcmtTitle :{
        type:String,
        required:true
    },
    plcmtMetaDescription : {
        type:String,
        required:false
    },
    plcmtMetaKeyword : {
        type:String,
        required:false
    },
    plcmtHeading : {
        type:String,
        required:false
    },
    plcmtPhoto : {
        type:String,
        
    },
    plcmtDetails : {
        type:String,
        required: false
    },
})

module.exports = plcmtModel = mongoose.model('placementTable', plcmtModelSchema);
