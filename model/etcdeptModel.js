let mongoose = require("mongoose")

let etcdeptModelSchema = mongoose.Schema({
    eventetcnav:{
        type:String,
    },
    eventetcname:{
        type:String,
    }, 
    eventetcdate:{
        type:Date,
    },
    eventetcperson:{
        type: String,
    },
    eventetcdesc:{
        type:String,
    },
    eventetcphoto : {
        type:String,
        
    },
})

module.exports = ETCdeptModel = mongoose.model('ETCdeptTable',etcdeptModelSchema);
