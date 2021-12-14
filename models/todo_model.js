const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
title: {
    type: String,
    required:true
},
body:{
    type:String,
    required:true
},
status:{
    type: Boolean,
    default:false
},
endDate:{
    type:Date,
    default:Date.now()
},
});

module.exports = mongoose.model('TodoModel',todoSchema);