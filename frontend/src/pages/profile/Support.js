import React, {useState, useEffect} from "react";
const Support = () => {
    return(
        <div className="change-password">
        <div className="change-pass-inner">

            <div className="change-ins">
                <h3>Support Email Services</h3>
               <div className="change-form">
                  <form>
                         <label>Name</label>
                         <input type="name" name="name" />
                         <label>Email</label>
                         <input type="email" name="email" />
                         <label>Mobile Number</label>
                         <input type="tel" name="mobile" />

                         <label>Message</label>
                         <textarea ></textarea>
                         <input type="submit" name="submit" value="submit" className="sub-but"/>
                  </form>
               </div>
            </div>
           
        </div>
    </div>
    );
};

export default Support;