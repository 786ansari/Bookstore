const planModals = require("../models/planmodels")
const R = require("../utils/responseHelper")

const plansService = {}

plansService.add = async(req,res,next)=>{
    try {
        console.log("req.body",req.body)
        let data = {
            userId:req.doc.userId,
            title:req.body.title,
            amount:req.body.amount,
            days:req.body.days
        }
        let add = await planModals.addPlans(data)
        return R(res,true,"Data added successfully",{},200)
    } catch (error) {
        next(error)
    }
   
}
plansService.get = async(req,res,next)=>{
    try {
        let get = await planModals.getPlans(req.doc)
        return R(res,true,"Data found successfully",get,200)
    } catch (error) {
        next(error)
    }
  
}
plansService.update = async(req,res,next)=>{
    try {
        console.log("updayeupdateplan",req.body)
            let data = {
                userId:req.doc.userId,
                title:req.body.title,
                amount:req.body.amount,
                days:req.body.days         
        }
        let add = await planModals.updatePlans(req.body.id,data)
        return R(res,true,"Data updated successfully",{},200)
    } catch (error) {
        next(error)
    }
    
}
plansService.remove = async(req,res,next)=>{
    try {
        let add = await planModals.deletePlans(req.body.id)
        return R(res,true,"Data removed successfully",{},200)
    } catch (error) {
        next(error)
    }
}


module.exports = plansService