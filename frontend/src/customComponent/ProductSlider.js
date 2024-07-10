import React, { Component } from "react";
import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css"; 
export default function ProductSlider(props) {
  const { slides } = props
  var settings = { 
    dots: false,
    infinite: true,
    speed: 500, 
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true, 

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2, 

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2, 

        }
      }
    ]
  };
  
  return (

    <Slider {...settings} >
      {slides.map((slide, index) => {
        return (  
            <li  >
              <div className="view view-first brand-box-img">
                <div className="list231p rs fl bgw soxs pb10 min"> 
                  <div className="w22s4pa">
                    <div className="w100 fl ac pt10">
                      <img
                        src='../../images/1.jpg'
                        alt="मध्य प्रदेश उपयंत्री (विधुत) सीधी भर्ती परीक्षा"
                        width="144"
                        height="191"
                      />
                    </div>
                    <div className="w100 fs13 fl pt5">
                      <div className="lh10 texthight">
                        मध्य प्रदेश उपयंत्री (विधुत) सीधी भर्ती...
                      </div>
                      <div className="w100 fs11 fl">
                        By: डॉ. लाल एवं डॉ. मिश्रा...
                      </div>
                      <div className="w100 fs11">Code: 2417</div>
                    </div>

                    <div className="pt5" style={{ color: "#000000" }}>
                      <div className="mt20">
                        MRP:{" "}
                        <samp
                          style={{ textDecoration: "line-through" }}
                        >
                          Rs.299/
                        </samp>
                        &nbsp;
                        <span className="fs11">30% OFF</span>
                      </div>
                      <span className="fs14">
                        <strong>Price: Rs. 209/-</strong>{" "}
                      </span>{" "}
                      <br />
                    </div>
                    <div className="w100 fl">
                      <div className="w35 bgw p2 fl">
                        {" "}
                        <img src="images/ratingstars0.jpg" />{" "}
                      </div>
                      <div className="w40 fs12 fr grea">
                        0 Review(s)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mask view_1">
                  <div className="mt10 p10 prc">
                    <strong>Book Name : </strong>मध्य प्रदेश उपयंत्री
                    (विधुत) सीधी भर्ती...
                    <br />
                    <strong>ISBN:</strong> 9789385888359
                    <br />
                    <strong>Author : </strong> डॉ. लाल एवं डॉ. मिश्रा{" "}
                    <br />
                    <strong>Book Code : </strong>2417
                    <br />
                    <strong>Laguage : </strong> Hindi
                    <br />
                    <strong>MRP : </strong>Rs.299/-
                    <br />
                    <strong>Selling Price : </strong>Rs. 209/-
                    <br />
                    <strong>Discount : </strong>30%
                  </div>
                  <div className="part_A">
                    <a
                      href="details/Madhya-Pradesh-Sub-Engineer-(Electrical)-Direct-Recruitment-Examination-13476.html"
                      title="Madhya Pradesh Upyantri (Vidhut) Sidhi Bharti Pariksha "
                      className="info1 info mb10 mt10"
                    >
                      Details
                    </a>
                  </div>

                  <div
                    className="w100 fl mt5 part_A m0"
                    style={{ display: "inline" }}
                  >
                    <a
                      href="pop-cart645a.html?pid=13476&amp;type=Cart"
                      //  onClick={() => fn_addcart(13476, 1)}
                      className="info mb10 pup-viewcart"
                    >
                      Add To Cart
                    </a>
                    <a
                      href="javascript:fn_orderNow(13476,1)"
                      title="Buy Now"
                      className="info mb10"
                    >
                      Buy Now
                    </a>
                    <a
                      href="pop-cart1162.html?pid=13476&amp;type=Wishlist"
                      // onClick={() => fn_addcart(13476, 1111)}
                      className="info mb10 pup-viewcart"
                    >
                      <img
                        style={{ position: "relative", top: "1px" }}
                        src="images/hd.png"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </li>

        );
      })}
    </Slider>
   
  );

}
