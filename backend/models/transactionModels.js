const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;



const TRANSACTION_TYPE = {
    PURCHASE_SUBSCRIPTION:"PURCHASE_SUBSCRIPTION",
    PURCHASE_ITEM:"PURCHASE_ITEM"
}

const SUBSCRIPTION_TYPE = {
    paid:"PAID",
    free:"FREE"
}

const STATUS_TYPE = {
	PENDING: 'PENDING',
	SUCCESS: 'SUCCESS',
	FAILED: 'FAILED',
	REJECT: 'REJECT',
};

const MODELSTYPE = {
    CURRENT_AFFAIRS:"CURRENT_AFFAIRS",
    TEST_SERIES:"TEST_SERIES",
    BOOK:"BOOK",
    DESIGN:"DESIGN"
}


const transactionSchema = mongoose.Schema(
    {
        transaction_id: {
             type: String
        }, 
        payee: {
            type:Schema.Types.ObjectId,
            ref: 'users'
        },
        receiver: {
            type:Schema.Types.ObjectId,
            ref: 'subadmins',
            default:null
        },
        transaction_type: {
            type:String,
            enum:Object.values(TRANSACTION_TYPE)
        },
        subscription_type:{
            type:String,
            enum:Object.values(SUBSCRIPTION_TYPE)
        },
        status: {
			type: String,
			enum: Object.values(STATUS_TYPE),
		},
        model_type: {
            type:String,
            enum: Object.values(MODELSTYPE)
        },
        amount: {
            type:Number
        },
        payment_id: {
            type:String
        },
        order_id: {
            type:String,
        },
        signature: {
            type:String
        },
        date: {
            type:String,
            default:new Date()
        }
    },
    { timestamps: true }
);
transactionModels={}

transactionModels.createTransactions = async(transactions) => {
    try {
        console.log("console.log()",transactions)

        const connect =  await db.connectDb("transactions", transactionSchema);
        let add = await connect.create(transactions);
        return add
    } catch (error) {
        return error
    }
}


module.exports  = {transactionModels,TRANSACTION_TYPE,STATUS_TYPE,SUBSCRIPTION_TYPE,MODELSTYPE}
