let mongoose = require("mongoose")

let deptTempModelSchema = mongoose.Schema({
    page_Url :{
        type:String,
        required:true
    },
    page_Title :{
        type:String,
        required:true
    },
    page_Heading : {
        type:String,
        required:false
    },
    photo_slider : {
        type:String,
        required: false
    },
    picture_cards:
    {
        type:String,
        required:false
    },
    link_carousel:
    {
    
        type:String,
        required:false
    },
    text_section:{

        type:String,
        required:false
    } ,
    image:{

        type:String,
        required:false
    }    

})

module.exports = deptTempModel = mongoose.model('deptTempTable',deptTempModelSchema);
