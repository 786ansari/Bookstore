const currentAffairsModels = require("../models/currentaffairs")
const R = require("../utils/responseHelper")
const authModel = require("../models/authmodels")
const purchasedBooks = require("../models/purchasedmodels")
const Razorpay = require("razorpay");
const SubscriptionPlan = require("../models/planmodels")
const {transactionModels, TRANSACTION_TYPE, SUBSCRIPTION_TYPE, STATUS_TYPE } = require("../models/transactionModels")

const orderService = {}

orderService.createOrder = async(req,res,next) => {
    
  try {
      const { amount } = req.body
      const instance = new Razorpay({
          key_id: process.env.KEY_ID,
          key_secret: process.env.KEY_SECRET,
        });
        
        const options = {
          amount: Number(amount)*100,  // Amount in the smallest currency unit (e.g., 50000 paisa = INR 500)
          currency: 'INR',
          receipt: 'receipt#1',
          payment_capture: '1'
        };
        
        instance.orders.create(options, (err, order) => {
          if (err) {
              return R(res,true,"Error!!",err,200)
          } else {
              return R(res,true,"Order created successfully!!",order,200)
            // The order ID will be in order.id
          }
        });
     
  } catch (error) {
      next(error)
  }
 

}

orderService.getSubsPlan = async(req,res,next) => {
    
        try {
           const getplan = await SubscriptionPlan.getPlans()
           return R(res,true,"Data found successfully!!",getplan,200)
        } catch (error) {
            next(error)
        }
       
    
}

orderService.capturePayment = async(req,res,next) => {
try {
  const { userId } = req.doc
  const { amount,type,planId,  files, payment_id, order_id, signature} = req.body
  const admin = await authModel.findAdminByRole()
  const Transaction = {
    payee:userId,
    amount:amount,
    receiver:admin._id,
    payment_id:payment_id,
    order_id:order_id,
    signature:signature,
    transaction_type:type == "subscription"?TRANSACTION_TYPE.PURCHASE_SUBSCRIPTION:TRANSACTION_TYPE.PURCHASE_ITEM,
    subscription_type:SUBSCRIPTION_TYPE.paid,
    status:STATUS_TYPE.SUCCESS
  }
  const createTransaction =  await transactionModels.createTransactions(Transaction)
  if(type == "subscription"){
    await SubscribePlanForUser(planId,userId)
  }
  else{
    const file_array = JSON.parse(files)

    file_array.forEach(async element => {
      let data = {
        txn_id:createTransaction._id,
        bookId:element.bookId,
        fileId:element.fileId,
        userId:userId
      }
    console.log("console.log()",data)
       await purchasedBooks.add(data)
    }); 
    return R(res,true,"Item purchase successfully!!",{},200)
  }
} catch (error) {
  next(error)
}
async function SubscribePlanForUser(planId,userId) {
  const now = new Date();
  const getUser = await authModel.getUserbyId(userId)
  const getPlan =  await SubscriptionPlan.getPlansById(planId)
  const days = getPlan?.days + getUser.days
  console.log('daydaydaysdays',days)
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  const futureTimeInMillis = futureDate.getTime()

  getUser.amount = getPlan.amount;
  getUser.days = days;
  getUser.is_subscribed = true;
  getUser.subscription_end = futureTimeInMillis
  
  getUser.save()
  return R(res,true,"User Subscribed successfully!!",{},200)
  
}

} 

module.exports = orderService