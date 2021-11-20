const Moment=require('../models/Moment')
exports.getMoments=async(req,res,next)=>{
    try {
        const moments=await Moment.find(req.query)
        if(moments.length==0) return res.status(404).json({error:'no result'})
        return res.status(200).json({payload:moments})
    } catch (error) {
        res.status(400).json({error:'something went wrong'})
    }
}

exports.addMoment=async(req,res,next)=>{
    try {
        const moment=await Moment.create({})
        if(!moment) return res.status(400).json({error:'something went wrong'})
        return res.status(201).json({payload:moment})
    } catch (error) {
       res.status(400).json({error:'something went wrong'})
    }
}

exports.updateMoment=async(req,res,next)=>{
    try {
        const moment=await Moment.findByIdAndUpdate(req.params.id,req.body)
        if(!moment) return res.status(400).json({error:'no such entity'})
    } catch (error) {
       res.status(400).json({error:'something went wrong'})
    }
}


exports.deleteMoment=async(req,res,next)=>{
    try {
        const moment=await Moment.findByIdAndDelete(req.params.id)
        if(!moment) return res.status(400).json({error:'no such entity'})
    } catch (error) {
       res.status(400).json({error:'something went wrong'})
    }
}