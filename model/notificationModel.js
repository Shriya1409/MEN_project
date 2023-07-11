let mongoose = require("mongoose")

let notificationModelSchema = mongoose.Schema({
    date:{
        type:Date,
        required:true,
    },
    noticename:{
        type:String,
    },
    noticeinfo:{
        type:String,
    },
    usefulinfoname:{
        type:String,
    },
    usefulinfo:{
        type:String,
    },
    
   
})

module.exports = notificationModel = mongoose.model('notificationtable',notificationModelSchema);
