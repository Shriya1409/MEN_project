let mongoose = require("mongoose")

let formModelSchema = mongoose.Schema({
  editorData :{
        type:String,
    },
    inputField : {
        type:String,
    },
    textareaField :{
        type:String,
    },
   
   
})

module.exports = Form = mongoose.model('Form',formModelSchema);
