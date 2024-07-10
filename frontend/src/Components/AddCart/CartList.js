import React, { useEffect } from 'react';
import { useState } from 'react';
import { getBookFromCart, removeItemFromCart } from '../../services/book.service';
import { imageUrl } from '../../services/dataurl';
import { HotToaster } from '../../utils/Toaster';
import { Link } from 'react-router-dom';

const CartList = (props) => {
  const [close, setClose]= useState(true)
  const [cart, setCart] = useState([])
 
  useEffect(()=>{
    getCartInfo()
  },[])
  
  const getCartInfo = async() => {
    let result = await getBookFromCart()
    // props.getTotalOfCart(result.data.length)
    if(result.status){
      setCart(result.data)
    }
}
  const removeItem  = async(item) => {
    let data = {
      id:item._id
    }
    let result = await removeItemFromCart(data)
    if(result.status){
      getCartInfo()
  }
    HotToaster(result.status,result.message)
   
  }
      return (
        <div >
            <ul
                    className="myulx"
                    style={{
                      margin: "0px",
                      padding: "0px",
                      position: "relative",
                      listStyleType: "none",
                      zIndex: 1,
                      width: "265px",
                      overflow:"scroll",
                      overflowX:"hidden",
                      left: "0px",
                      maxHeight:"100vh"
                    }}
                  >
                    <Link className='btn btn-primary' to='/cart' >go to cart</Link>
                    {cart && cart.length>0 && cart.map((item,i)=>{
                      return item.bookdata.length>0 && (
                            <li
                            style={{
                              overflow: "hidden",
                              float: "none",
                              width: "200px",
                              height: "auto",
                            }}
                          >
                            <div className="view view-first brand-box-img">
                              <div className="list231p rs fl bgw soxs pb10 min">
                                <div className="w22s4pa">
                                  <div className="w100 fl ac pt10 slide-img">
                                    <img
                                      src={imageUrl+ item.bookdata[0].bookIcon}
                                      alt="मध्य प्रदेश उपयंत्री (विधुत) सीधी भर्ती परीक्षा"
                                      width="100"
                                      height="130"
                                    />
                                  </div>
                                  <div className="w100 fs13 fl pt5">
                                    <div className="lh10 texthight">
                                     { item.bookdata[0].bookName}
                                    </div>
                                    <div className="w100 fs11 fl">
                                      By: CARD
                                    </div>
                                    <div className="w100 fs11">Code: {item.bookdata[0].bookCode}</div>
                                  </div>
  
                                  <div
                                    className="pt5"
                                    style={{ color: "#000000" }}
                                  >
                                    <div className="mt20">
                                      MRP:{" "}
                                      <samp
                                        style={{ textDecoration: "line-through" }}
                                      >
                                        Rs.{ item.bookdata[0].MRP}/
                                      </samp>
                                      &nbsp;
                                      <span className="fs11">{ item.bookdata[0].discount}% OFF</span>
                                    </div>
                                    <span className="fs14">
                                      <strong>Price: Rs. { item.bookdata[0].sellingPrice}/-</strong>{" "}
                                    </span>{" "}
                                    <br />
                                  </div>
                                  <div className="w100 fl">
                                    <div className="w35 bgw p2 fl">
                                      {" "}
                                      <img src="/images/ratingstars0.jpg" />{" "}
                                    </div>
                                    <div className="w40 fs12 fr grea">
                                      0 Review(s)
                                    </div>
                                  </div>
                                </div>
                                <a  href="https://ab2software.com/sample.pdf" className="side-caet-view" download ><i class="fa fa-eye" aria-hidden="true"></i></a>
                                <button type='button' className='btn btn-primary' onClick={()=>removeItem(item)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                              </div>
                            </div>
                          </li>
                      )
                    })}
                  </ul>
    </div>
  );
};

export default CartList;
