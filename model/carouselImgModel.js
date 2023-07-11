let mongoose = require("mongoose")

let carouselImgModelSchema=mongoose.Schema(
{
    photoId:{
        type:String,
        required:false
    },
    datePhoto:{
        type:Date,
        required:false
    },
    sliderPhoto : {
        type:Array,
        
    },
    
}
)


module.exports = carouselImgModel = mongoose.model('carouselTable',carouselImgModelSchema);