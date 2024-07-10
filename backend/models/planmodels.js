const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

const SubscriptionPlanSchema = mongoose.Schema({
    userId: { type: String },
    amount: { type: Number },
    title: { type: String },
    days: { type: Number },
    
},{ timestamps: true }
);

SubscriptionPlan = {}

SubscriptionPlan.addPlans = async(data) => {
    try{
        let plans =await db.connectDb("plans",SubscriptionPlanSchema);
        let addPlans = await plans.create(data)
        if(addPlans){
            return true
        }
    }
    catch(err){
        return err
    }
}
SubscriptionPlan.getPlans = async() => {
    try{
        let plans = await db.connectDb("plans",SubscriptionPlanSchema);
        let getPlans = await plans.find()
        if(getPlans){
            return getPlans
        }
    }
    catch(err){
        return err
    }
}
SubscriptionPlan.getPlansById = async(_id) => {
    try{
        let plans = await db.connectDb("plans",SubscriptionPlanSchema);
        let getPlans = await plans.findOne({_id:_id})
        if(getPlans){
            return getPlans
        }
    }
    catch(err){
        return err
    }
}
SubscriptionPlan.updatePlans = async(id,data) => {
    console.log(id,data)
    try{
        let plans =await db.connectDb("plans",SubscriptionPlanSchema);
        let updatePlans = await plans.updateOne({_id:id},{$set:data})
        if (updatePlans.modifiedCount > 0 || updatePlans.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
SubscriptionPlan.deletePlans = async(id) => {
    try{
        let plans = await db.connectDb("plans",SubscriptionPlanSchema);
        let removePlans = await plans.deleteOne({_id:id})
        if (removePlans) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

module.exports = SubscriptionPlan