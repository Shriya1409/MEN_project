let mongoose = require("mongoose")

let deptModelSchema = mongoose.Schema({
    deptUrl :{
        type:String,
        required:true
    },
    deptNavText : {
        type:String,
        required:true
    },
    deptTitle :{
        type:String,
        required:true
    },
    deptHeading : {
        type:String,
        required:false
    },
    deptPhoto : {
        type:Array,
        
    },
    deptDetails : {
        type:String,
        required: false
    },

    aboutDetails : {
        type:String,
        required: false
    },
    abouttDetails : {
        type:String,
        required: false
    },
    aboutttDetails : {
        type:String,
        required: false
    },
    // visionPhoto: {
    //     type:String,
    // },
    visionDetails: {
        type:String,
        required: false
    },
    missionDetails: {
        type:String,
        required: false
    },
    missionnDetails: {
        type:String,
        required: false
    },
    missionnnDetails: {
        type:String,
        required: false
    },
    missionnnnDetails: {
        type:String,
        required: false
    },
    // missionPhoto: {
    //     type:String,
    // },
})

module.exports = deptModel = mongoose.model('deptTable',deptModelSchema);
