const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

designModels={}


const designSchema = mongoose.Schema(
    {
        designType:{type:String},
        file:{type:String},
        amount:{type:Number,default:0},
        plan:{type:String},
        icon:{type:String},
        date:{type: Date, default: Date.now}
    },
    { timestamps: true }
);

const designPurchasedSchema = mongoose.Schema(
    {
        txn_id: {
             type:Schema.Types.ObjectId,
            ref: 'transactions'
        },
        userId: {
            type:Schema.Types.ObjectId,
            ref: 'users'
        },
        designId: {
            type:Schema.Types.ObjectId,
            ref: 'designs'
        },
    },
    { timestamps: true }
)

designModels.purchased = async(data) => {
    const fileAdd = await db.connectDb("designorders", designPurchasedSchema);
    let insData = await fileAdd.create(data);
    if (insData) {
        return true;
    } else {
        return false
    };
}

designModels.getDesignById = async(_id) =>{
    const fileAdd = await db.connectDb("designs", designSchema);
    let insData = await fileAdd.findOne({_id:_id});
    if (insData) {
        return insData;
    } else {
        return false
    };
}

designModels.addDesign = async(data) =>{
    const fileAdd = await db.connectDb("designs", designSchema);
    let insData = await fileAdd.create(data);
    if (insData) {
        return true;
    } else {
        return false
    };
}
designModels.getDesign = async(data) =>{
    const fileAdd = await db.connectDb("designs", designSchema);
    let insData
    if(data.role == "admin"){
        insData = await fileAdd.find();
    }else{
        insData = await fileAdd.find({userId:data.userId});
    }
    if (insData) {
        return insData;
    } else {
        return false
    };
}

designModels.checkForDesign = async(data) =>{
    const fileAdd = await db.connectDb("designs", designSchema);
    let insData = await fileAdd.findOne({_id:data._id});
    if (insData) {
        return insData;
    } else {
        return false
    };
}



designModels.updateDesign = async(details,id) =>{
    const fileAdd = await db.connectDb("designs", designSchema);
    let insData = await fileAdd.update({_id:id},{$set:details});
    if (insData) {
        return true;
    } else {
        return false
    };
}
designModels.deleteDesign = async(data) =>{
    const fileAdd = await db.connectDb("designs", designSchema);
    let insData = await fileAdd.deleteOne({_id:data.id});
    if (insData) {
        return true;
    } else {
        return false
    };
}

designModels.findDesigns = async(data) =>{
    const fileAdd = await db.connectDb("designs", designSchema);
    let insData = await fileAdd.find({designType:data.designType});
    if (insData) {
        return insData;
    } else {
        return false
    };
}

module.exports = designModels