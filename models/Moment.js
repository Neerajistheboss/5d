const mongoose=require('mongoose')
const MomentSchema=mongoose.Schema({
    file:{type:String,unique:true,required:false},
    title:{type:String,required:true},
    tags:[String]
})

module.exports=mongoose.model('Moment',MomentSchema)