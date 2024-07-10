import { useEffect, useState } from "react";
import { getBookFromCart, removeItemFromCart } from "../../../services/book.service";
import { imageUrl } from "../../../services/dataurl";
import { HotToaster } from "../../../utils/Toaster";
import { useNavigate } from "react-router-dom";

const   Cartpage = () => {
    const [cart,setCart] = useState([])
    const [totalSellingAmount,setTotalSellingAmount] = useState(0)
    const [totalMRP,setTotalMRP] = useState(0)
    const navigate = useNavigate()
    useEffect(()=>{
        getCartDetails()
    },[])
    const getCartDetails = async() =>{
        let result = await getBookFromCart()
        if(result.status){
            setCart(result.data)
            totalAmountFun(result.data)
        }
    }
    const totalAmountFun = (item) => {
      let i=0
      let total=0
      let actualamount = 0
      // const sum = item.reduce((join,val)=>{return join.bookdata[0].sellingPrice + val.bookdata[0].sellingPrice})
      for(i;i<item.length;i++){
        console.log("@@@@@@@@",item[i]?.bookdata[0]?.MPR)
        total += item[i]?.bookdata[0]?.sellingPrice
        actualamount += item[i]?.bookdata[0]?.MRP
      }
      setTotalMRP(actualamount)
      setTotalSellingAmount(total)
    }
    const removeCart  = async(item) => {
      let data = {
        id:item._id
      }
      let result = await removeItemFromCart(data)
      if(result.status){
        getCartDetails()
    }
      HotToaster(result.status,result.message)
     
    }

    const handleRedirectToCheckout = () => {
      if(cart.length<=0 ){
        HotToaster(false,"Cart is empty!!");
         return false
      }
      const bookData = []
      let book = {}
      cart?.forEach((item,i)=>{
        bookData.push({
          fileId:item.filedata[0]._id,
          bookId:item?.bookdata[0]._id
        })
        // file.push(item.filedata[0])
        // Object.assign(book,item?.bookdata[0])
      })
      console.log("bookDatabookDatabookData",bookData,totalMRP,totalSellingAmount)
      navigate("/checkout",{state:{book:bookData,type:'cart',totalMRP:totalMRP,totalSellingAmount:totalSellingAmount}})
    }

  return (
    <>
      <div className="cart-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 cart-left">
              <div className="cart-left-main">
                <div className="cart-top-contant">
                  <div className="cart-page-title">
                    <h2>Shopping Cart</h2>
                    {/* design roted */}
                    {console.log("cart===>>>",cart)}
                      {cart?.length>0 && cart.map((item,index)=>{
                        return (
                    <div className="cart-item-main">
                          <div className="row">
                              <div className="col-lg-4 cart-img-main">
                                {console.log("sdfbsdhgfsdjhfbsdfjhsdfd",cart)}
                                 <div className="cart-img">
                                     <img src={imageUrl+item?.bookdata[0]?.bookIcon} />
                                 </div>
                              </div>
                              <div className="col-lg-8 cart-con-main">
                                   <div className="cart-con">
                                        <h4>{item?.bookdata[0]?.bookName}</h4>
                                        <div className="dis">
                                             <span>{item?.bookdata[0]?.discount?.toFixed(2)}% off</span>
                                        </div>
                                        <div className="price">
                                            <span className="sale-price"><i class="fa fa-inr" aria-hidden="true"></i>{item?.bookdata[0]?.sellingPrice}</span>
                                            <span>M.R.P. : <del><i class="fa fa-inr" aria-hidden="true"></i>{item?.bookdata[0]?.MRP}</del></span>
                                        </div>
                                        <div className="auther">
                                           <span>By : {item?.bookdata[0]?.author}</span> 
                                        </div>
                                        <div className="book-code">
                                            <span>Code : {item?.bookdata[0]?.bookCode}</span>
                                        </div>
                                        <div className="book-code">
                                            {/* <span>File Type : {item.filedata[0].fileType.toUpperCase()} File</span> */}
                                        </div>
                                        <div className="cart-spe">
                                            <a href="#" onClick={()=>removeCart(item)}>Delete</a>
                                            <a href="#">Save For Later</a>
                                        </div>
                                   </div>
                              </div>
                          </div>
                      </div>
                        )
                      })
                      }
                       {/* design roted */}
                       <div className="sub-total">
                           <div className="row">
                              <div className="col-lg-6">
                                <h4>Subtotal <span>({cart?.length} items)</span> :   <i class="fa fa-inr" aria-hidden="true"></i> {totalSellingAmount}</h4>
                              </div>
                              <div className="col-lg-6">
                                 <button type="button" onClick={handleRedirectToCheckout}>Process to Buy</button>
                              </div>
                           </div>
                          
                       </div>
                  </div>
                </div>
               {/* <div className="cart-bottom-content">
                  <div className="item-name">
                    <h3>Your Items</h3>
                    <p></p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-lg-3 cart-right">
                <div className="pay-deta-main">
                  <div className="pay-dat-inr">
                  <h6>Payment Details : </h6>
               
               <ul>
                   <li>Customers can pay by Credit Card/Demand Draft/Money Order on this website, as per their convenience.</li>
                   <li>Customers, who are paying by Demand Draft/ Money Order please note that for books of Upkar Prakashan the payment will be made in favour of ‘Upkar Prakashan’. For books and magazines of Pratiyogita Darpan the payment will be made in favour of ‘Pratiyogita Darpan’, both payable at Agra, UP.</li>
                   <li>Please mention your name and order number on the back side of the Demand Draft and send it to: 2/11 A, Swadeshi Bima Nagar, (Opp. Shah Talkies), Agra-282 002.</li>
                   <li>All payments are subject to approval of their respective banks. The payment/order will be acknowledged to you through email either from Upkar Prakashan OR from CCAvenue. CCAvenue is our authorized payment processing associate.</li>
               </ul>
               
               <p>
               <strong>Delivery:</strong></p>
               
               <ul>
                   <li>Once the order and payment is received, it is processed immediately. Generally, each order is sent via courier (delivered within 7 days) or by registered post (if courier services is not available in that area, then it takes minimum 7 days).</li>
               
               </ul>

               </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cartpage;
