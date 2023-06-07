let mongoose = require("mongoose")

let pageModelSchema = mongoose.Schema({
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
    pagePhoto : {
        type:String,
        
    },
    pageDetails : {
        type:String,
        required: false
    },
})

module.exports = PageModel = mongoose.model('pageTable',pageModelSchema);
