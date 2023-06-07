let mongoose = require("mongoose")

let resultModelSchema = mongoose.Schema({
    pageUrll :{
        type:String,
        required:true
    },
    pageNavTextt : {
        type:String,
        required:false
    },
    pageTitlee :{
        type:String,
        required:true
    },
    pageMetaDescriptionn : {
        type:String,
        required:false
    },
    pageMetaKeywordd : {
        type:String,
        required:false
    },
    pageHeadingg : {
        type:String,
        required:false
    },
    pagePhotoo : {
        type:String,
        
    },
    pageDetailss : {
        type:String,
        required: false
    },
})

module.exports = resultModel = mongoose.model('resultTable',resultModelSchema);
