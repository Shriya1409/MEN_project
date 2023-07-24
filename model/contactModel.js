let mongoose = require("mongoose")

let contactModelSchema = mongoose.Schema({
 cname:{
    type:String,
    required:true,
 },

 cemail:{
    type:String,
    required:false,
 },
 csubject:{
    type:String,
    required:false,
 },
 cmessage:{
    type:String,
    required:false,
 }
})

module.exports = contactModel = mongoose.model('contacttable',contactModelSchema);
