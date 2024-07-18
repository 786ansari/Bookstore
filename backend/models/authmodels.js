const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const R = require("../utils/responseHelper");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

authModel={}
const signmode = {
    FACEBOOK:"FACEBOOK",
    GOOGLE:"GOOGLE",
    MANUAL:'MANUAL'
}


const loginSchema = mongoose.Schema(
    {
        name: { type: String },
        // lastName: { type: String, required: false },
        emailId: { type: String },
        gender: { type: String },
        mobileNumber: { type: String },
        dob: { type: String },
        address1: { type: String },
        profileIcon: { type: String },
        address2: { type: String },
        city: { type: String },
        pincode: { type: String },
        pMode: { type: String },
        country: { type: String },
        otp:{type:String},
        sign_mode:{type:String,enum:Object.values(signmode)},
        is_active: { type: Boolean,default:true },
        is_deleted: { type: Boolean, default:false },
        state: { type: String },
        password: { type: String},
        is_subscribed_for_current_affairs: {type:Boolean,default:true},
        is_subscribed_for_test_series: {type:Boolean,default:false},
        subscription_end_for_current_affairs:{type:String},
        subscription_end_for_test_series:{type:String},
        days_for_current_affairs: {type:Number,default:30 },
        days_for_test_series: {type:Number,default:0 },
        amount_for_current_afairs: {type:Number,default:0},
        amount_for_test_series: {type:Number,default:0},
        // client_ip: { type: String, default: "" }, //1 verify, 2 reject, 0 pending
        userType: { type: Number, default: 0, enum: [0, 1] }, // 1 for admin
    },
    { timestamps: true }
);

const subadmin = mongoose.Schema({
    name: { type: String },
    // last_name: { type: String },
    gender: { type: String },
    address: { type: String },
    state: { type: String },
    district: { type: String },
    pincode: { type: String },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    dor: { type: String },
    dob: { type: String },
    role:{type:String},
    password: { type: String, required: true },
    active: { type: String, default: 1 },
    designation: { type: Array, default: [] },
    permissions: { type: Array, default: [] }
},
{ timestamps: true }
);

authModel.cronForOneHour = async() => {
    const nowInMillis = Date.now();

    const check = await db.connectDb("users",loginSchema)
    const resultForCurrentAffairs = await check.updateMany(
      { is_subscribed_for_current_affairs:true, subscription_end_for_current_affairs: { $lt: nowInMillis } }, // Replace 'subscriptionDate' with your date field
      { $set: { is_subscribed_for_current_affairs: false,days_for_current_affairs:0 } }
    );
    const resultForTestSeries = await check.updateMany(
        { is_subscribed_for_test_series:true, subscription_end_for_test_series: { $lt: nowInMillis } }, // Replace 'subscriptionDate' with your date field
        { $set: { is_subscribed_for_test_series: false,days_for_test_series:0 } }
      );
}
authModel.cronForOneDay = async() => {
    const check = await db.connectDb("users",loginSchema)
    const resultForCurrentAffairs = await check.updateMany(
        { is_subscribed_for_current_affairs: true,days_for_current_affairs: { $gt: 0 } },
        { $inc: { days_for_current_affairs: -1 } }
      );
      const resultForTestSeries = await check.updateMany(
        { is_subscribed_for_test_series: true,days_for_test_series: { $gt: 0 } },
        { $inc: { days_for_test_series: -1 } }
      );
}

authModel.findAdminByRole = async(emailId, password) => {
    let findadmin = await db.connectDb("subadmins",subadmin)
    let val = await findadmin.findOne(
        { role: "admin" },
        { __v: 0 }
    );
    console.log("findfindfind======>>>",val)
    if(Object.keys(val).length>0){
        return val
    }
    else{
        return false
    }
}

authModel.findAdmin = async(emailId, password) => {
    let findadmin = await db.connectDb("subadmins",subadmin)
    let val = await findadmin.findOne(
        { email: emailId },
        { __v: 0 }
    );
    console.log("findfindfind======>>>",val)
    if(Object.keys(val).length>0){
        return val
    }
    else{
        return false
    }
}
authModel.getUser = async()=> {
    const add = await db.connectDb("users",loginSchema)
    const getUser = await add.find({})
    return getUser
}


authModel.getUserByMobileOrEmail = async()=> {
    const add = await db.connectDb("users",loginSchema)
    const getUser = await add.find({})
    return getUser
}

authModel.changeStatus = async(data) => {
    try{
        let userstatus = await db.connectDb("users",loginSchema)
        let statusCategory = await userstatus.updateOne({_id:data.id},{$set:{is_active:data.isActive}})
        if (statusCategory) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

authModel.changeDeleteStatus = async(data) => {
    try{
        let userstatus = await db.connectDb("users",loginSchema)
        let statusCategory = await userstatus.updateOne({_id:data.id},{$set:{is_deleted:data.isDelete}})
        if (statusCategory) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

authModel.findPermission = async(userId) => {
    let connect = await db.connectDb("subadmins",subadmin)
    let find = await connect.findOne({_id:userId})
    if(Object.keys(find).length>0){
        return find
    }
    else{
        return false
    }
}

authModel.login = async (key, email) => {
    console.log(key, email);
    let check = {};
    check[key] = email;
    console.log(check, "Check obj");
    const Login = await db.connectDb("users", loginSchema);
    let val = await Login.findOne(check, { __v: 0 });
    
    if (!val) {
        // console.log("resolve");
        return false 

    }
    
    return val;
};
authModel.checkAvailablityWithUserId = async(user_id)=>{
    const checkUser = await db.connectDb("users", loginSchema);
    let val = await checkUser.findOne({_id:user_id})
      return val
}

authModel.checkAvailablity = async(email,mobile)=>{
    const checkUser = await db.connectDb("users", loginSchema);
    let val = await checkUser.find({
        $or: [
          { emailId: email },
          { mobileNumber: mobile }
        ]
      })
      return val
}
authModel.checkAvailablityForAdmin = async(email)=>{
    const checkUser = await db.connectDb("subadmins",subadmin)
    let val = await checkUser.find({ email: email })
      return val
}

authModel.checkAvailablityWithoutASpecificUser = async(userId,email,mobile)=>{
    const checkUser = await db.connectDb("users", loginSchema);
    let val = await checkUser.find({
        $and: [
            { _id: { $ne: userId } },
            { $or: [{ emailId: email }, { mobileNumber: mobile }] }
         
        ]
      })
      return val
}

authModel.signUp = async (data) => {
    const Login = await db.connectDb("users", loginSchema);
    let insData = await Login.insertMany(data);
    console.log(insData);
    if (insData.length > 0) {
        return insData[0];
    } else {
       return false
        // return apiResponse.err("Registration Failed", 403);
    }
};

authModel.profileupdate = async (id,data) => {
    const Login = await db.connectDb("users", loginSchema);
    let insData = await Login.updateOne({_id:id},{$set:data});
    if (insData.modifiedCount > 0 || insData.upsertedCount > 0) {
        return true;
    } else {
        return false
        // return apiResponse.err("Registration Failed", 403);
    }
};
authModel.showprofile = async (id) => {
    try{
    const user = await db.connectDb("users", loginSchema);
    let insData = await user.findOne({_id:id});
        return insData
    }catch(error){
        // return R(res, false, "Error occurs", {},403)
        console.log(error)
    }
};
authModel.updateemailandmobile = async (id,data) => {
    console.log('changestatus=======>>>>>>>>',id,data);
    const Login = await db.connectDb("users", loginSchema);
    let insData = await Login.updateOne({_id:id},{$set:{emailId:data.emailId,mobileNumber:data.mobileNumber}});
    if (insData.modifiedCount > 0 || insData.upsertedCount > 0) {
        return true;
    } else {
        return false
        // return apiResponse.err("Registration Failed", 403);
    }
};

authModel.subadmin = async (data) => {
    const sub = await db.connectDb("subadmins", subadmin);
    let insData = await sub.create(data);
    console.log(insData)
    if (insData || insData.length > 0) {
        return insData;
    } else {
        return apiResponse.err("Registration Failed", 403);
    }
};
authModel.findsubadmin = async (emailId) => {
    const sub = await db.connectDb("subadmin", subadmin);
    let val = await sub.findOne(
        { email: emailId },
        { __v: 0 }
    );
    // console.log(val);
    if (val) {
        console.log("resolve");
        return val;
    }
}
authModel.findsubadminlist = async (type) => {
    const sub = await db.connectDb("subadmins", subadmin);
    let val = await sub.find({
        $and: [
            { email: { $ne: "admin@gmail.com" } }, // Condition 1: email not equal to 'admin@gmail.com'
            { role: type } // Condition 2: role equals a certain value stored in the variable 'type'
        ]
    });
    
    if (val.length>0) {
        return val;
    }
    else{
        return false
    }
}
authModel.setsubadmin = async (data) => {
    const login = await db.connectDb("subadmin", subadmin);
    const insdata = await login.updateOne(
        { _id: ObjectId(data._id) },
        {
            $set:data
        },
        { upsert: true, runValidators: true }
    );

    if (insdata.modifiedCount > 0 || insdata.upsertedCount > 0) {
        return true;
    } else {
        return false;
    }
};
authModel.userstatus = async (_id, status) => {
    const login = await db.connectDb("subadmin", subadmin);
    const insdata = await login.updateOne(
        { _id: ObjectId(_id) },
        { $set: { active: status }},
        { upsert: true, runValidators: true }
    );

    if (insdata.modifiedCount > 0 || insdata.upsertedCount > 0) {
        return true;
    } else {
        return false;
    }
};

authModel.userdelete = async (_id) => {
    const Login = await db.connectDb("subadmin", subadmin);
    const getId = await Login.findByIdAndDelete(_id);
    // console.log('mob', getId, val, pro)
    if (getId) {
        return getId;
    } else {
        return apiResponse.err("User not Found!!", 403);
    }
};

authModel.changePassword = async (userId, pass) => {
    const Login = await db.connectDb("users", loginSchema);
    const passData = await Login.updateOne(
        { _id: userId },
        { $set: { password: pass } },
        { runValidators: true }
    );
    if (passData.modifiedCount > 0) {
        return true;
    } else {
        return false;
    }
};

authModel.forgotPassword = async (emailId, pass) => {
    const Login = await db.connectDb("users", loginSchema);
    const passData = await Login.updateOne(
        { emailId: emailId },
        { $set: { password: pass } },
        { runValidators: true }
    );
    if (passData.modifiedCount > 0) {
        return true;
    } else {
        return false;
    }
};

authModel.forgotPasswordForAdmin = async (emailId, pass) => {
    const dbConnect = await db.connectDb("subadmins",subadmin)
    const passData = await dbConnect.updateOne(
        { email: emailId },
        { $set: { password: pass } },
        { runValidators: true }
    );
    if (passData.modifiedCount > 0) {
        return true;
    } else {
        return false;
    }
};

authModel.getUserbyId = async (userId) => {
    const Login = await db.connectDb("users", loginSchema);
    let val = await Login.findOne({ _id: ObjectId(userId) }, { __v: 0 });
    if (val) {
        console.log("resolve");
        console.log('val: ', val);
        return val;
    }
};

module.exports = authModel