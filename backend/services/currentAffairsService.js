const currentAffairsModels = require("../models/currentaffairs")
const R = require("../utils/responseHelper")
const authModal = require("../models/authmodels");

const CurrentAffairsService = {}

CurrentAffairsService.add = async(req,res,next)=>{
    try {
        const {fileType,type,plan,range} = req.body
        const {filename} = req.file
        const { userId } = req.doc
        let data = {
            userId:userId,
            fileType:fileType,
            type:type,
            plan:plan,
            range:range
        }
        if(req?.file){
            data.file = filename
        }
        let add = await currentAffairsModels.addcurrentAffairsFile(data)
        return R(res,true,"Data added successfully",{},200) 
    } catch (error) {
        next(error)
    }
    
}
CurrentAffairsService.get = async(req,res,next)=>{
    try {
        let get = await currentAffairsModels.getcurrentAffairsFile(req.doc)
        return R(res,true,"Data found successfully",get,200)
    } catch (error) {
        next(error)
    }
 
}
CurrentAffairsService.update = async(req,res,next)=>{
    try {
        const {fileType,type,plan,range} = req.body
        const {filename} = req.file
        const { userId } = req.doc
        let details = {
            userId:userId,
            fileType:fileType,
            type:type,
            plan:plan,
            range:range
        }
        if(req.file && req.file.filename){
            details.file = filename
        }
        else{
            details.file = req.body.file
        }
        let add = await currentAffairsModels.updatecurrentAffairsFile(details,req.body.id)
        return R(res,true,"Data updated successfully",{},200)
    } catch (error) {
        next(error)
    }
    
}
CurrentAffairsService.remove = async(req,res,next)=>{
    try {
        const { id } = req.body
        let add = await currentAffairsModels.deletecurrentAffairsFile(id)
        return R(res,true,"Data removed successfully",{},200)
    } catch (error) {
        next(error)
    }   
}

CurrentAffairsService.find = async(req,res,next) => {
    try {
        let find = await currentAffairsModels.findfiles(req.body)
        return R(res,true,"Data found successfully",find,200)
    } catch (error) {
        next(error)
    }
    

}
CurrentAffairsService.check_is_user_subscribed = async(req,res,next) => {
    
        try {
            let {
                _id,type,fileType,plan
            } = req.body
            const user_id = req.doc.userId
            if(plan == "Free"){
                const getFile = await currentAffairsModels.getFileForSubscribedUser(_id,type,fileType)
                return R(res,true,"Data found successfully!!",getFile,200)
            }
            let check = await authModal.checkAvailablityWithUserId(user_id)
           
            if (!check.is_subscribed) {
                return R(res,false,"You are not subscribed yet!!",{},200)
            }
            const getFile = await currentAffairsModels.getFileForSubscribedUser(_id,type,fileType)
            return R(res,true,"Data found successfully!!",getFile,200)
        } catch (error) {
            next(error)
        }
       
    
}

module.exports = CurrentAffairsService