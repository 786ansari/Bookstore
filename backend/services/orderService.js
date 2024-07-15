const currentAffairsModels = require("../models/currentaffairs")
const R = require("../utils/responseHelper")
const authModel = require("../models/authmodels")
const purchasedBooks = require("../models/purchasedmodels")
const bookModels = require("../models/bookmodels")
const Razorpay = require("razorpay");
const SubscriptionPlan = require("../models/planmodels")
const designModels = require("../models/designmodels")
const {transactionModels, TRANSACTION_TYPE, SUBSCRIPTION_TYPE, STATUS_TYPE, MODELSTYPE } = require("../models/transactionModels")

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
  const { amount,type,itemId,model_type, files, payment_id, order_id, signature} = req.body
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
  if(type == "subscription"){
    Transaction.model_type = model_type == "current_affairs"?MODELSTYPE.CURRENT_AFFAIRS:MODELSTYPE.TEST_SERIES,
    await transactionModels.createTransactions(Transaction)

    await SubscribePlanForUser(itemId,userId,model_type,res)
  }
  else if(type == "design"){
    Transaction.model_type = MODELSTYPE.DESIGN;
    const createTransaction = await transactionModels.createTransactions(Transaction)
    await DesignPurchase(userId,itemId,createTransaction,res)
  }
  else if(type == "cart"){
    Transaction.model_type = MODELSTYPE.BOOK;
    const createTransaction = await transactionModels.createTransactions(Transaction)
    await CartPurchanse(userId,createTransaction,res)
  }
  else{
    Transaction.model_type = MODELSTYPE.BOOK;
    const createTransaction = await transactionModels.createTransactions(Transaction)
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
async function SubscribePlanForUser(itemId,userId,model_type,res) {
  const now = new Date();
  const getUser = await authModel.getUserbyId(userId)
  const getPlan =  await SubscriptionPlan.getPlansById(itemId)
  let days 
  if(model_type == "current_affairs"){
    days = getPlan?.days + getUser.days_for_current_affairs    
  }
  else{
    days = getPlan?.days + getUser.days_for_test_series
  }
  
  console.log('daydaydaysdays',itemId,userId,model_type)
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  const futureTimeInMillis = futureDate.getTime()
  if(model_type == "current_affairs"){
    getUser.amount_for_current_afairs = getPlan.amount;
    getUser.days_for_current_affairs = days;
    getUser.is_subscribed_for_current_affairs = true;
    getUser.subscription_end_for_current_affairs = futureTimeInMillis
  }
  else{
    getUser.amount_for_test_series = getPlan.amount;
    getUser.days_for_test_series = days;
    getUser.is_subscribed_for_test_series = true;
    getUser.subscription_end_for_test_series = futureTimeInMillis
  }
  
  
  getUser.save()
  return R(res,true,"User Subscribed successfully!!",{},200)
  
}

} 
async function CartPurchanse (userId,createTransaction,res){
  console.log("getcartgercart",userId)
  const getCart = await bookModels.getCartByUserId(userId)
  getCart.length>0 && getCart.forEach(async element => {
    let data = {
      txn_id:createTransaction._id,
      bookId:element.bookId,
      fileId:element.fileId,
      userId:userId
    }
     await purchasedBooks.add(data)
  }); 
  return R(res,true,"Item purchase successfully!!",{},200)

}
async function DesignPurchase (userId,itemId,createTransaction,res){
  try {
    const getDesign = await designModels.getDesignById(itemId)
  
if(getDesign?._id){
    let data = {
      txn_id:createTransaction._id,
      designId:getDesign?._id,
      userId:userId
    }
    await designModels.purchased(data)

  return R(res,true,"Item purchase successfully!!",{},200)
}
  return R(res,true,"Design not found please readded it!!",{},200)
  } catch (error) {
    console.log(error)
  }


}

module.exports = orderService