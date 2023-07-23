let mongoose=require("mongoose")

let noticesSchema= mongoose.Schema({
     noticedate:{
        type:Date,
     },
    noticename:{
        type:String,
    },

    noticeinfo:{
        type:String,
    },

})




module.exports = noticesModel = mongoose.model('noticestable',noticesSchema);