let mongoose = require("mongoose");

let plcmtModelSchema = mongoose.Schema({
    pageUrl :{
        type:String,
        required:true
    },
    pageNavText : {
        type:String,
        required:false
    },
    pageTitle :{
        type:String,
        required:true
    },
    pageMetaDescription : {
        type:String,
        required:false
    },
    pageMetaKeyword : {
        type:String,
        required:false
    },
    pageHeading : {
        type:String,
        required:false
    },
    pageDetails : {
        type:String,
        required: false
    },
})

module.exports = plcmtModel = mongoose.model('placementTable', plcmtModelSchema);
