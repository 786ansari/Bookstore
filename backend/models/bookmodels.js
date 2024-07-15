const db = require("../utils/dbConn");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const apiResponse = require("../utils/apiResponses");
// const AppErr = require("../utils/error");
//const { x } = require("pdfkit");
let ObjectId = require("mongodb").ObjectID;

BookModel = {}

const categorySchema = mongoose.Schema({
    userId: { type:String },
    categoryName: { type: String },
    isActive: { type: Boolean,default:true },
    date:{type:Date}
});

const newsLetters = mongoose.Schema({
    name:{ type:String },
    emailId:{ type:String },
    mobileNumber:{type:String},
    date:{type:Date}

})

const trendingTitles = mongoose.Schema({
    userId:{ type:String },
    title:{ type:String },
    icon:{ type:String },
    date:{ type:Date }
})
const promotionAndOffers = mongoose.Schema({
    userId:{ type:String },
    categoryId:{ type:String },
    icon:{ type:String },
    date:{ type:Date }
})
const adminInfoSchema = mongoose.Schema({
    userId:{ type:String },
    emailId:{ type:String },
    mobileNumber:{ type:String },
    whatsAppNumber:{ type:String },
    address:{ type:String },
    date:{ type:Date }
})


const cartSchema = mongoose.Schema({
    systemIp:{ type:String },
    fileId:{ type:String },
    bookId:{ type:String },
    userId:{ type:String }
})

const reviewSchema = mongoose.Schema({
    bookId:{ type:String },
    name:{ type:String },
    email:{ type:String },
    discription:{ type:String },
    isActive:{type:Boolean,default:true},
    date:{ type:Date }
})

const posterSchema = mongoose.Schema({
    categoryId: { type: String },
    userId: { type:String },
    posterIcon: { type: String },
    isActive: { type: Boolean,default:true },
    date:{type:Date}
});

const bookSchema = mongoose.Schema({
    categoryId: { type:String },
    itemType: { type:String },
    userId: { type:String },
    bookName: { type:String },
    bookIcon: { type:String },
    samplePdf: { type:String },
    chapterCount: { type:Number },
    pdf: { type:String },
    ppt: { type:String },
    pptPdf: { type:String },
    editableFile: { type:String },
    MRP: { type:Number },
    ISBN: { type:String },
    author: { type:String },
    bookCode: { type:String },
    type: { type:String },
    language: { type:String },
    sellingPrice: { type:Number },
    discount: { type:Number },
    features: { type:String },
    isActive: { type: Boolean,default:false },
    date: { type:Date }
})


const bookFilesSchema = mongoose.Schema(
    {
        userId:{type:String},
        bookId:{type:String},
        fileType:{type:String},
        file:{type:String},
        chapter:{type:String},
        // ppt:{type:String},
        // pptPdf:{type:String},
        // editableFile:{type:String},
        date:{type:Date}
    },
    { timestamps: true }
);

BookModel.addCategory = async(data) => {
    try{
        let category =await db.connectDb("categories",categorySchema);
        let addCategory = await category.create(data)
        if(addCategory){
            return addCategory
        }
    }
    catch(err){
        return err
    }
}
BookModel.getCategory = async(data) => {
    try{
        let category =await db.connectDb("categories",categorySchema);
        let getCategory = await category.find()
        return getCategory

    }
    catch(err){
        return err
    }
}
BookModel.updateCategory = async(id,categoryName) => {
    try{
        let category =await db.connectDb("categories",categorySchema);
        let updateCategory = await category.updateOne({_id:id},{$set:{categoryName:categoryName}})
        console.log("updateCategoryupdateCategory",category)
        if (updateCategory.modifiedCount > 0 || updateCategory.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.deleteCategory = async(id) => {
    try{
        let category =await db.connectDb("categories",categorySchema);
        let deleteCategory = await category.deleteOne({_id:id})
        console.log("updateCategoryupdateCategory",deleteCategory)
        if (deleteCategory) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.changeStatus = async(data) => {
    try{
        let category =await db.connectDb("categories",categorySchema);
        let statusCategory = await category.updateOne({_id:data.id},{$set:{isActive:data.isActive}})
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
BookModel.addBookDetails = async(data) => {
    try{
        let bookDetails = await db.connectDb("bookdetails",bookSchema);
        let addBookDetails =await bookDetails.create(data)
        if(addBookDetails){
            return addBookDetails
        }
    }
    catch(err){
        return err
    }
}
BookModel.getBookLists = async(data) => {
    try{
        let bookDetails = await db.connectDb("bookdetails",bookSchema);
        let books
        if(data.role == "admin"){
            books =await bookDetails.aggregate([
                { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
                {
                    $lookup: {
                        "from": "categories",
                        "localField": "categoryObjId",
                        "foreignField": "_id",
                        "as": "categoryData"
                    }
                }
            ])
        }else{
            books =await bookDetails.aggregate([
                {$match:{userId:data.userId}},
                { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
                {
                    $lookup: {
                        "from": "categories",
                        "localField": "categoryObjId",
                        "foreignField": "_id",
                        "as": "categoryData"
                    }
                }
            ])
        }
          
        if(books){
            return books
        }
    }
    catch(err){
        return err
    }
}

BookModel.updateBookDetailsById = async(_id,data) => {
    try{
        let bookDetails = await db.connectDb("bookdetails",bookSchema);
        let update =await bookDetails.updateOne({_id:_id},{$set:data})

        if(update.modifiedCount > 0 || update.upsertedCount > 0){
        console.log("updateornot",update)
            return true
        }
    }
    catch(err){
        return err
    }
}

BookModel.deleteBookDetails = async(id) => {
    try{
        let book =await db.connectDb("bookdetails",bookSchema);
        let deleteBook = await book.deleteOne({_id:id})
        console.log("updateCategoryupdateCategory",deleteBook)
        if (deleteBook) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.addBookFiles = async(data) =>{
    const fileAdd = await db.connectDb("bookfiles",bookFilesSchema);
    let insData = await fileAdd.create(data);
    if (insData) {
        return true;
    } else {
        return false
    };
}

BookModel.checkBookFileAvailable = async(data) =>{
    const fileAdd = await db.connectDb("bookfiles",bookFilesSchema);
    let insData = await fileAdd.find({bookId:data.bookId,chapter:data.chapter,fileType:data.fileType});
    console.log("insDatainsData",insData)

    if (insData?.length>0) {
        return true;
    } else {
        return false
    };
}

BookModel.getBookFiles = async(data) =>{
const bookFiles =  await db.connectDb("bookfiles", bookFilesSchema);
let insData 
    if(data.role == "admin"){
        insData= await bookFiles.aggregate([
            { $addFields: { "bookObjId": { "$toObjectId": "$bookId" } } },
            {
              $lookup: {
                from: "bookdetails",
                localField: "bookObjId",  // Field in collection1
                foreignField: "_id",  // Field in collection2
                as: "booksData"  // Output field containing the joined data
              }
            }
          ]);
    }else{
        insData= await bookFiles.aggregate([
            {$match:{userId:data.userId}},
            { $addFields: { "bookObjId": { "$toObjectId": "$bookId" } } },
            {
              $lookup: {
                from: "bookdetails",
                localField: "bookObjId",  // Field in collection1
                foreignField: "_id",  // Field in collection2
                as: "booksData"  // Output field containing the joined data
              }
            }
          ]);
    }
   
  
if (insData) {
    return insData;
} else {
    return false
};
}

BookModel.updateBookFiles = async(data,id) =>{
const fileAdd =  await db.connectDb("bookfiles", bookFilesSchema);
let insData = await fileAdd.updateOne({_id:id},{$set:data});
if (insData) {
    return true;
} else {
    return false
};
}
BookModel.deleteBookFiles = async(id) =>{
const fileAdd =  await db.connectDb("bookfiles", bookFilesSchema);
let insData = await fileAdd.deleteOne({_id:id});
if (insData) {
    return true;
} else {
    return false
};
}

BookModel.changeStatusOfBook = async(data) => {
    try{
        let book =await db.connectDb("bookdetails",bookSchema);
        let statusBook = await book.updateOne({_id:data.id},{$set:{isActive:data.isActive}})
        if (statusBook) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.addPosterImage = async(data) => {
    try{
        let posters =await db.connectDb("posters",posterSchema);
        let postersAdd = await posters.create(data)
        console.log("updateCategoryupdateCategory",postersAdd)
        if (postersAdd) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getPosters = async(data) => {
    try{
        let posters =await db.connectDb("posters",posterSchema);
        let find 
        if(data.role == "admin"){
            find= await posters.aggregate([
                { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
                {
                    $lookup: {
                        "from": "categories",
                        "localField": "categoryObjId",
                        "foreignField": "_id",
                        "as": "categoryData"
                    }
                }
            ])
        }else{
            find= await posters.aggregate([
                {$match: {userId:data.userId}},
                { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
                {
                    $lookup: {
                        "from": "categories",
                        "localField": "categoryObjId",
                        "foreignField": "_id",
                        "as": "categoryData"
                    }
                }
            ])
        }
          
        if (find) {
            return find;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.updatePostersById = async(id,data) => {
    try{
        let posters =await db.connectDb("posters",posterSchema);
        let update = await posters.updateOne({_id:id},{$set:data})
        console.log("updateCategoryupdateCategory",update)
        if (update.modifiedCount > 0 || update.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.deletePosterById = async(id) => {
    try{
        let posters =await db.connectDb("posters",posterSchema);
        let remove = await posters.deleteOne({_id:id})
        console.log("removeremove",remove)
        if (remove) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.changeStatusOfPoster = async(data) => {
    console.log("changeStatusOfPoster========>>>>>>>>",data)
    try{
        let poster =await db.connectDb("posters",posterSchema);
        let statusposter = await poster.updateOne({_id:data.id},{$set:{isActive:data.isActive}})
        if (statusposter) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.getallcategory = async() => {
    try{
        let category =await db.connectDb("categories",categorySchema);
        let categoryGet = await category.find({isActive:true})
        if (categoryGet) {
            return categoryGet;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.getallbooks = async() => {
    try{
        let books =await db.connectDb("bookdetails",bookSchema);
        const booksGet = await books.aggregate([
            {$match:{isActive:true,
                itemType:"book"
                }},
            { $addFields: { "bookDetailsId": { "$toString": "$_id" } } },
          {
            $lookup: {
              from: 'bookfiles',
              localField: 'bookDetailsId',
              foreignField: "bookId",
              as: 'bookFilesData',
            },
          },
          {
            $project: {
                _id: 1,
                "bookName": 1,
                "bookIcon": 1,
                "MRP": 1,
                "ISBN": 1,
                "author": 1,
                "bookCode":1,
                "type":1,
                "language":1,
                "sellingPrice":1,
                "discount":1,
                "features":1,
                "samplePdf":1,
                "itemType":1,
                "categoryId":1,
              bookFilesData: {
                $map: {
                  input: "$bookFilesData",
                  as: "fileData",
                  in: {
                    "_id":"$$fileData._id",
                    "fileType": "$$fileData.fileType",
                    "bookId": "$$fileData.bookId",
                  }
                }
              }
            }
          }   
        ])
        if (booksGet) {
            return booksGet;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getBookContentById = async(id) => {
    console.log("getbyhgsddbs",id)
    try{
        let books =await db.connectDb("bookdetails",bookSchema);
        // const booksGet = await books.findOne({_id:id})
        const booksGet = await books.aggregate([
            {$match:{_id:ObjectId(id)}},
            { $addFields: { "bookDetailsId": { "$toString": "$_id" } } },
          {
            $lookup: {
              from: 'bookfiles',
              localField: 'bookDetailsId',
              foreignField: "bookId",
              as: 'bookFilesData',
            },
          },
          {
            $project: {
                _id: 1,
                "bookName": 1,
                "bookIcon": 1,
                "MRP": 1,
                "ISBN": 1,
                "author": 1,
                "bookCode":1,
                "type":1,
                "language":1,
                "sellingPrice":1,
                "discount":1,
                "features":1,
                "samplePdf":1,
                "chapterCount":1,
                "itemType":1,
                "categoryId":1,
              bookFilesData: {
                $map: {
                    input: {
                        $filter: {
                          input: "$bookFilesData",
                          as: "fileData",
                          cond: { $eq: ["$$fileData.fileType", "pdf"] } // Filter for fileType: pdf
                        }
                      },
                  as: "fileData",
                  in: {
                    "_id":"$$fileData._id",
                    "fileType": "$$fileData.fileType",
                    "bookId": "$$fileData.bookId",
                    "file": "$$fileData.file",
                    "fileType": "$$fileData.fileType",
                    "chapter": "$$fileData.chapter",

                  }
                }
              }
            }
          }   
        ]).sort({
            createdAt:-1
            })
        if (booksGet) {
            return booksGet;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}


BookModel.getBookContentFileById = async(body) => {
    try{
        let books = await db.connectDb("bookfiles",bookFilesSchema);
        const booksGet = await books.findOne({bookId:body.bookId,chapter:data.chapter,fileType:"pdf"})
        console.log("bodybodyboydbody",body)
        if (booksGet) {
            return booksGet;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.getallbooksbycategoryId = async(data) => {
    try{
        let books =await db.connectDb("bookdetails",bookSchema);
        const booksGet = await books.aggregate([
            {$match:{categoryId:data.categoryId,
                itemType:"book",
                isActive:true
                }},
            { $addFields: { "bookDetailsId": { "$toString": "$_id" } } },
          {
            $lookup: {
              from: 'bookfiles',
              localField: 'bookDetailsId',
              foreignField: "bookId",
              as: 'bookFilesData',
            },
          },
          {
            $project: {
                _id: 1,
                "bookName": 1,
                "bookIcon": 1,
                "MRP": 1,
                "ISBN": 1,
                "author": 1,
                "bookCode":1,
                "type":1,
                "language":1,
                "sellingPrice":1,
                "discount":1,
                "features":1,
                "itemType":1,
                "categoryId":1,
              bookFilesData: {
                $map: {
                  input: "$bookFilesData",
                  as: "fileData",
                  in: {
                    "_id":"$$fileData._id",
                    "fileType": "$$fileData.fileType",
                    "bookId": "$$fileData.bookId",
                  }
                }
              }
            }
          }   
        ])
        if (booksGet) {
            return booksGet;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.getallposters = async() => {
    try{
        let posters =await db.connectDb("posters",posterSchema);
        let postersGet = await posters.find({isActive:true})
        if (postersGet) {
            return postersGet;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.newsLetterAdd = async(data) => {
    try{
        let newsletters =await db.connectDb("newsletters",newsLetters);
        let newslettersAdd = await newsletters.create(data)
        if (newslettersAdd) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.newsLetterGet = async(data) => {
        let newsletters =await db.connectDb("newsletters",newsLetters);
        let newslettersAdd 
        if(data.role == "admin"){
            newslettersAdd = await newsletters.find()
        }else{
            newslettersAdd = await newsletters.find({userId:data.userId})
        }
        return newslettersAdd;
        
}

BookModel.addbookreview = async(data) => {
    try{
        let review = await db.connectDb("reviews",reviewSchema);
        let addReview = await review.create(data)
        if (addReview) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.getallreviews = async() => {
    try{
        let review = await db.connectDb("reviews",reviewSchema);
        let getReview =await review.aggregate([
            { $addFields: { "bookObjId": { "$toObjectId": "$bookId" } } },
            {
                $lookup: {
                    "from": "bookdetails",
                    "localField": "bookObjId",
                    "foreignField": "_id",
                    "as": "bookdata"
                }
            }
        ])
    console.log("bookObjIdbookObjId",getReview);
        if (getReview.length>0) {
            return getReview;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.changeStatusOfReview = async(data) => {
    console.log("datatatata====>>>>",data);
    try{
        let review =await db.connectDb("reviews",reviewSchema);
        let statusreview = await review.updateOne({_id:data.id},{$set:{isActive:data.isActive}})
        if (statusreview) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.addbooktocart = async(data) => {
    try{
        let cart = await db.connectDb("carts",cartSchema);
        let addCart = await cart.create(data)
        if (addCart) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getCartByUserId = async(userId) => {
    try{
        let cart = await db.connectDb("carts",cartSchema);
        let getCart = await cart.find({userId:userId})
        if (getCart) {
            return getCart;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getbookfromcart = async(ip) => {
    try{
        let cart = await db.connectDb("carts",cartSchema);
        let getCart = await cart.aggregate([
            {$match:{systemIp:ip}},
            { $addFields: { "bookObjId": { "$toObjectId": "$bookId" } } },
            {
                $lookup: {
                    "from": "bookdetails",
                    "localField": "bookObjId",
                    "foreignField": "_id",
                    "as": "bookdata"
                }
            }])
        if (getCart) {
            return getCart;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.getbookdetailsbyid = async(id) => {
    try{
        let book = await db.connectDb("bookdetails",bookSchema);
    const bookGet = await book.aggregate([
        {$match:{_id:ObjectId(id)}},
        { $addFields: { "bookDetailsId": { "$toString": "$_id" } } },
      {
        $lookup: {
          from: 'bookfiles',
          localField: 'bookDetailsId',
          foreignField: "bookId",
          as: 'bookFilesData',
        },
      },
      {
        $project: {
            _id: 1,
            "bookName": 1,
            "bookIcon": 1,
            "MRP": 1,
            "ISBN": 1,
            "author": 1,
            "bookCode":1,
            "type":1,
            "language":1,
            "sellingPrice":1,
            "discount":1,
            "features":1,
            "itemType":1,
            "categoryId":1,
          bookFilesData: {
            $map: {
                input: {
                    $filter: {
                      input: "$bookFilesData",
                      as: "fileData",
                      cond: { $eq: ["$$fileData.chapter", "Full Book"] } // Filter for fileType: pdf
                    }
                  },
              as: "fileData",
              in: {
                "_id":"$$fileData._id",
                "fileType": "$$fileData.fileType",
                "bookId": "$$fileData.bookId",
                "file": "$$fileData.file",
              }
            }
          }
        }
      }   
    ])
        if (bookGet) {
            return bookGet;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
// BookModel.getbookfromcartbyuserId = async(userid) => {
//     try{
//         let cart = await db.connectDb("carts",cartSchema);
//         let cartGet = await cart.find({userId:userid})
//         if (cartGet) {
//             return cartGet;
//         } else {
//             return false;
//         }
//     }
//     catch(err){
//         return err
//     }
// }

BookModel.updateUserId = async(ipAddress,userId) => {
    console.log("hbdsjhfbbdhfbsdjhbsd",ipAddress,userId.toString());
    try{
        let userIdUpdate = await db.connectDb("carts",cartSchema);
        let update = await userIdUpdate.updateMany({systemIp:ipAddress},{$set:{userId:userId}})
        if (update) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getbookfromcartbyuserId = async(userId) => {
    try{
        let cart = await db.connectDb("carts",cartSchema);
        const getCart = await cart.aggregate([
            { $match : { userId: userId } },
            { $addFields: { "bookObjId": { "$toObjectId": "$bookId" }}},
            { $addFields: { "bookFilesId": { "$toObjectId": "$fileId" }}},
            {
              $lookup: {
                from: 'bookdetails',
                localField: 'bookObjId',
                foreignField: '_id',
                as: 'bookdata'
              }
            },
            {
              $lookup: {
                from: 'bookfiles',
                localField: 'bookFilesId',
                foreignField: '_id',
                as: 'filedata'
              }
            },
            {
                $project: {
                    _id: 1,
                    "systemIp": 1,
                    "fileId": 1,
                    "bookId": 1,
                    "fileId": 1,
                    bookdata: {
                    $map: {
                      input: "$bookdata",
                      as: "bookdata",
                      in: {
                        _id: "$$bookdata._id",
                        "bookName": "$$bookdata.bookName",
                        "bookIcon": "$$bookdata.bookIcon",
                        "MRP": "$$bookdata.MRP",
                        "ISBN": "$$bookdata.ISBN",
                        "author": "$$bookdata.author",
                        "bookCode":"$$bookdata.bookCode",
                        "type":"$$bookdata.type",
                        "language":"$$bookdata.language",
                        "sellingPrice":"$$bookdata.sellingPrice",
                        "discount":"$$bookdata.discount",
                        "features":"$$bookdata.features",
                        "itemType":"$$bookdata.itemType",
                        "categoryId":"$$bookdata.categoryId",
                      }
                    }
                  },
                  filedata: {
                    $map: {
                      input: "$filedata",
                      as: "filedata",
                      in: {
                        _id: "$$filedata._id",
                        "bookId": "$$filedata.bookId",
                        "fileType": "$$filedata.fileType",
                        "createdAt": "$$filedata.createdAt",
                      }
                    }
                  },

                }
              } 
          ])



        // let getCart = await cart.aggregate([
        //     {$match:{userId:userId}},
        //     { $addFields: { "bookObjId": { "$toObjectId": "$bookId" } } },
        //     {
        //         $lookup: {
        //             "from": "bookdetails",
        //             "localField": "bookObjId",
        //             "foreignField": "_id",
        //             "as": "bookdata"
        //         }
        //     }])

        if (getCart) {
            return getCart;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.getcartinfo = async(userId) => {
    try{
        let cart = await db.connectDb("carts",cartSchema);
        let getCart = await cart.aggregate([
            { $addFields: { "bookObjId": { "$toObjectId": "$bookId" } } },
            {
                $lookup: {
                    "from": "bookdetails",
                    "localField": "bookObjId",
                    "foreignField": "_id",
                    "as": "bookdata"
                }
            }])
        if (getCart) {
            return getCart;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getcarttotalAmountAndQuentity = async(query) => {
    try{
        let cart = await db.connectDb("carts",cartSchema);
        let getCart = await cart.aggregate([
            {$match:query},
            { $addFields: { "bookObjId": { "$toObjectId": "$bookId" } } },
            {
                $lookup: {
                    "from": "bookdetails",
                    "localField": "bookObjId",
                    "foreignField": "_id",
                    "as": "bookdata"
                }
            },
              {
                $unwind: '$bookdata'
              },
              {
                $group: {
                  _id: null,
                  totalSellingPrice: { $sum: '$bookdata.sellingPrice'  },
                  itemCount: { $sum: 1 }
                }
              }
          ]);
        if (getCart) {
            return getCart;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.removefromcart = async(id) => {
    try{
        let cart = await db.connectDb("carts",cartSchema);
        let cartremove = await cart.deleteOne({_id:id})
        if (cartremove) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.settitleimage = async(data) => {
    try{
        let title = await db.connectDb("trandingtitles",trendingTitles);
        let settitle = await title.create(data)
        if (settitle) {
            return {
                status:true,
                message:"Title Data added successfully",
                data:{}
            }
        } else {
            return {
                status:false,
                message:"Title Data not added",
                data:{}
            };
        }
    }
    catch(err){
        return {
            status:false,
            message:err,
            data:{}
        };
    }
}

BookModel.findIfTitleExist = async(data) => {
    try{
        let title = await db.connectDb("trandingtitles",trendingTitles);
        let settitle = await title.findOne({title:data})
        if (settitle) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.gettitleimage = async() => {
    try{
        let title = await db.connectDb("trandingtitles",trendingTitles);
        let gettitle = await title.find()
        if (gettitle) {
            return gettitle;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.udpatetitleimagebyid = async(id,data) => {
    try{
        let title =await db.connectDb("trandingtitles",trendingTitles);
        let update = await title.updateOne({_id:id},{$set:data})
        if (update.modifiedCount > 0 || update.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.deletetitleimagebyid = async(id) => {
    try{
        let title =await db.connectDb("trandingtitles",trendingTitles);
        let remove = await title.deleteOne({_id:id})
        if (remove) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.addpromotionandoffer = async(data) => {
    console.log("userId====>>>>>",data);
    try{
        let promotion =await db.connectDb("promotion&offers",promotionAndOffers);
        let add = await promotion.create(data)
        if (add) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getpromotionandoffer = async() => {
    try{
        let promotion =await db.connectDb("promotion&offers",promotionAndOffers);
        let get = await promotion.aggregate([
            { $addFields: { "categoryObjId": { "$toObjectId": "$categoryId" } } },
            {
                $lookup: {
                    "from": "categories",
                    "localField": "categoryObjId",
                    "foreignField": "_id",
                    "as": "categoryData"
                }},
            ])
        if (get) {
            return get;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.updatepromotionandofferbyid = async(id,data) => {
    try{
        let promotion =await db.connectDb("promotion&offers",promotionAndOffers);
        let update = await promotion.updateOne({_id:id},{$set:data})
        if (update.modifiedCount > 0 || update.upsertedCount > 0) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.deletepromotionandofferbyid = async(id) => {
    console.log("jhhdbsdjhfvvsdhfvsd",id);
    try{
        let title =await db.connectDb("promotion&offers",promotionAndOffers);
        let remove = await title.deleteOne({_id:id})
        if (remove) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}

BookModel.addadmininformation = async(data) => {
    try{
        let adminInfo =await db.connectDb("admininfos",adminInfoSchema);
        let add = await adminInfo.create(data)
        if (add) {
            return true;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getadmininformation = async(data) => {
    try{
        let adminInfo =await db.connectDb("admininfos",adminInfoSchema);
        let get = await adminInfo.find()
        if (get) {
            return get;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.updateadmininformation = async(id,data) => {
    try{
        console.log("datatdatatat",data)
        let adminInfo =await db.connectDb("admininfos",adminInfoSchema);
        let get = await adminInfo.updateOne({_id:id},{$set:data})
        if (get) {
            return get;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}
BookModel.getallebooks = async(data) => {
    try{
        let books =await db.connectDb("bookdetails",bookSchema);
        let match
        if(data.categoryId){
            match  =  {
                $match: {
                  $and: [
                    { itemType: "ebook", isActive:true },
                    { categoryId: data.categoryId,isActive:true }
                  ]
                }
              }
        }
        else{
            match =  {$match:{itemType:"ebook",isActive:true}}
        }
        const booksGet = await books.aggregate([
            match,
            { $addFields: { "bookDetailsId": { "$toString": "$_id" } } },
          {
            $lookup: {
              from: 'bookfiles',
              localField: 'bookDetailsId',
              foreignField: "bookId",
              as: 'bookFilesData',
            },
          },
          {
            $project: {
                _id: 1,
                "bookName": 1,
                "bookIcon": 1,
                "MRP": 1,
                "ISBN": 1,
                "author": 1,
                "bookCode":1,
                "type":1,
                "language":1,
                "sellingPrice":1,
                "discount":1,
                "features":1,
                "itemType":1,
                "categoryId":1,
                "itemType":1,
                "samplePdf":1,
              bookFilesData: {
                $map: {
                  input: "$bookFilesData",
                  as: "fileData",
                  in: {
                    "_id":"$$fileData._id",
                    "fileType": "$$fileData.fileType",
                    "bookId": "$$fileData.bookId",
                  }
                }
              }
            }
          }   
        ])
        if (booksGet) {
            return booksGet;
        } else {
            return false;
        }
    }
    catch(err){
        return err
    }
}




module.exports = BookModel
