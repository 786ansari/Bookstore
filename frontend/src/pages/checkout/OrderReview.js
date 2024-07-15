export const OrderReviewForSubscriptionPlan = ({plans}) => {
  return (
    <>
      <div class="form-check-title">
        <h4>REVIEW YOUR ORDER</h4>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="pro-name">
            <h6>Title</h6>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="pro-name">
            <p>{plans?.title || ""}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="pro-name">
            <h6>Amount</h6>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="pro-name">
            <p>{plans?.amount || 0}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="pro-name">
            <h6>Days</h6>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="pro-name">
            <p>{plans?.days || 0}</p>
          </div>
        </div>
      </div>
      <div className="row total-border">
        <div className="col-lg-6">
          <div className="pro-name">
            <h6>Total</h6>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="pro-name">
            <p>{plans?.amount || 0}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const OrderReviewForBooks = ({type,sellingAmount,bookNames,ebook,MRP,discount}) => {
    return <>
     <div class="form-check-title"><h4>REVIEW YOUR ORDER</h4></div>
                       {type !== "cart" ?<div className="row">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Product Name </h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>{bookNames || ""} </p>
                                </div>
                          </div>
                       </div>:<></>}
                       <div className="row">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Qty</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>{ebook?.length}</p>
                                </div>
                          </div>
                       </div>
                       <div className="row">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Subtotal</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>{MRP || 0}</p>
                                </div>
                          </div>
                       </div>
                       <div className="row">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Discount</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>{typeof(discount) =="number"?  discount?.toFixed(2) : discount || 0}</p>
                                </div>
                          </div>
                       </div>
                       <div className="row total-border">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Total</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>{sellingAmount}</p>
                                </div>
                          </div>
                       </div>
    </>
}

export const OrderReviewForDesign = ({plans}) => {
  return <>
   <div class="form-check-title"><h4>REVIEW YOUR ORDER</h4></div>
                     <div className="row">
                        <div className="col-lg-6">
                             <div className="pro-name"> 
                                <h6>Product Name </h6>
                              </div> 
                        </div>
                        <div className="col-lg-6">
                              <div className="pro-name">
                                 <p>{plans?.designType || ""} </p>
                              </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-lg-6">
                             <div className="pro-name"> 
                                <h6>Qty</h6>
                              </div> 
                        </div>
                        <div className="col-lg-6">
                              <div className="pro-name">
                                 <p>{"1"}</p>
                              </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-lg-6">
                             <div className="pro-name"> 
                                <h6>Subtotal</h6>
                              </div> 
                        </div>
                        <div className="col-lg-6">
                              <div className="pro-name">
                                 <p>{plans?.amount || 0}</p>
                              </div>
                        </div>
                     </div>
                     <div className="row total-border">
                        <div className="col-lg-6">
                             <div className="pro-name"> 
                                <h6>Total</h6>
                              </div> 
                        </div>
                        <div className="col-lg-6">
                              <div className="pro-name">
                                 <p>{plans?.amount || 0}</p>
                              </div>
                        </div>
                     </div>
  </>
}
