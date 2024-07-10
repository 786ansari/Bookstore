import React, { useState, useEffect } from "react";

const MyOrder = () => {


    return (
        <div className="myorder">
        <div className="outer-border">
            <div class="form-check-title"><h4>YOUR ORDER Details</h4></div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="pro-name">
                        <h6>Product Name</h6>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="pro-name">
                        <p>Delhi Metro Rail Corporation Non Executive Category</p>
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
                        <p>1</p>
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
                        <p>1000</p>
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
                        <p>100</p>
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
                        <p>900</p>
                    </div>
                </div>
            </div>

           {/* <div className="row">
                <div className="col-lg-12">
                    <div className="order-but">
                        <a href="#">Place Your order</a>
                    </div>
                </div>
    </div>*/}

        </div>
        </div>
    );
};

export default MyOrder;