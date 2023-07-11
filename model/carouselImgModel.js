let mongoose = require("mongoose")

let carouselImgModelSchema=mongoose.Schema(
{
    datePhoto:{
        type:Date,
    },
    sliderPhoto : {
        type:Array,
        
    },
    
}
)


module.exports = carouselImgModel = mongoose.model('carouseltable',carouselImgModelSchema);