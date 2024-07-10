import React, { useContext, useEffect, useState } from 'react';
import { AddNewsLetter } from '../services/feedback.service';
import { HotToaster } from '../utils/Toaster';
import { AdminInformation } from '../services/book.service';
import { AdminContext } from "../context/AdminInfoContext"
import { Link } from 'react-router-dom';


const Footer = () => {
  const { adminInfo  } = useContext(AdminContext)

  return (
    <footer>
      <div className="footer">
        <div className="w100 fl">
          <div className="mid">
            <div className="w100 fl">
              <div className="f_part1 pt15 borr">
                <div className="w100 fl">
                  <h2>Get in Touch</h2>
                </div>

                <div className="w100 fl">
                  <div className="w50p fl ">
                    <span className="icon">
                      <img src="/images/p-icon1.png" alt="Phone Icon" />
                    </span>
                  </div>
                  <div className="search_part fl">
                    <a href={`tel:${adminInfo?.mobileNumber}`}>{adminInfo?.mobileNumber}</a>
                  </div>
                </div>
                <div className="w100 fl">
                  <div className="w50p fl ">
                    <span className="icon">
                      <img src="/images/m1.png" alt="Email Icon" />
                    </span>
                  </div>
                  <div className="search_part fl">
                  <a href={`mailto:${adminInfo?.emailId}`}>{adminInfo?.emailId}</a>
                  </div>
                </div>
                <div className="w100 fl">
                  <div className="w50p fl ">
                    <span className="icon">
                      <img src="/images/mp.png" alt="Email Icon" />
                    </span>
                  </div>
                  <div className="search_part fl">
                  <a href={`${adminInfo?.address}`}>{adminInfo?.address}</a>
                  </div>
                </div>
              </div>
              <div className="f_part ml20 pt15 borr">
                <h1>Our Links</h1>
                <div className="w100 fl pt20 flu">
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    {/* <li>
                      <a href="corporate/index.html"> Home</a>
                    </li> */}
                    {/* <li><a href="content-for-Careers">Careers</a></li> */}
                    <li>
                      <a href="content-for-Advertise-with-us.html">Advertise with us</a>
                    </li>
                    {/* <li><a href="tech_support.php">Technical Support</a></li> */}
                    <li>
                      <a href="content-for-FAQ.html">FAQ</a>
                    </li>
                    <li>
                      <Link to="/terms&condition">Terms And Condition</Link>
                    </li>
                    {/* <li><a href="content-for-Shopping-Instructions">Shopping Instructions</a></li> */}
                    <li>
                      <a href="contactus.html">Contact us</a>
                    </li>
                    <li>
                      <a href="content-for-Disclaimer.html">Disclaimer</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="cb"></div>
          </div>
        </div>
        <div className="cb"></div>
      </div>
      <div className="footer1">
        <div className="mid">
          <div className="w50 rs fl">
            © Copyright
            <span className="fco"> Coaching Test & Notes </span> All rights reserved.
          </div>
          <div className="w50 rs fr ar pal pvt">
            Designed and Developed by{' '}
            <a href="https://www.dextrousinfo.com/" target="_blank">
              Ab2software.com
            </a>
          </div>
        </div>
      </div>
      <p id="back-top" style={{ display: 'block', zIndex: 99999 }}>
        <a href="#top">
          <span>&nbsp;</span>
        </a>
      </p>
    </footer>
  );
};

export default React.memo(Footer);
