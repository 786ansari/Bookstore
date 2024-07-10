const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

const bookOrderShcema = mongoose.Schema({
    txn_id: {
        type:Schema.Types.ObjectId,
        ref:"transactions"
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref: 'users'
    },
    bookId: {
        type:Schema.Types.ObjectId,
        ref: 'bookdetails'
    },
    fileId: {
        type:Schema.Types.ObjectId,
        ref: 'bookfiles'
    },
},{ timestamps: true }
);

purchasedBooks = {}

purchasedBooks.add = async(data) => {
    try{
        let connect =await db.connectDb("bookorders",bookOrderShcema);
        let add = await connect.create(data)
        if(add){
            return true
        }
    }
    catch(err){
        return err
    }
}


module.exports = purchasedBooks