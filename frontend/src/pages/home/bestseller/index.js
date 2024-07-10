import Slider from "react-slick";
import { imageUrl } from "../../../services/dataurl";
import React, { useEffect, useRef, useState } from "react";
import { addBookToCart, bookListGet, getBookFromCart } from "../../../services/book.service";
import { HotToaster } from "../../../utils/Toaster";
import { Link } from "react-router-dom";
import FIleModel from "../../../comman/FileModel";


const SliderCarousel = (props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  const sliderRef = useRef(null);
  const [bookList, setBookList] = useState([])
  const [sideImages, setSideImages] = useState([])
  const [showFiles, setShowFiles] = useState([])
  const [clickNext, setClickNext] = useState(new Date().getTime())
  useEffect(() => {
    // getBooks()
    if (props && props.books && props.books.length > 0) {
      setBookList(props.books)
    }
    if (props && props?.sideImages && props.sideImages.length > 0) {
      setSideImages(props.sideImages)
    }
  }, [props])
  const showFilesForCart = (item) => {
    setShowFiles(item)
  }

  return (
    <div className="w100 fl bestseller">
      <div className="mid">
        <div className="best_seller">
          <div className="best fs17">{props.type}</div>
          <div className="arrow fr mt8">
            <p className="fl ml5">
              <a className="prevs2" onClick={() => sliderRef?.current?.slickPrev()}>
                <img alt="" className="db" src="images/left-arrow.png" />
              </a>
            </p>
            <br />
            <p className="fr">
              <a className="nexts2" onClick={() => sliderRef?.current?.slickNext()}>
                <img alt="" className="db" src="images/right-arrow.png" />
              </a>
            </p>
          </div>
          <div className="cb"></div>
        </div>
        <div className="w100 fl bgw">
          {/* Product Listing 1 */}
          {sideImages.length > 0 && sideImages.map((item, index) => {
            return item.title == props.type && (
              <div className="best-first fl db">
                <Link href={`bookdetails/`} target="_new">
                  <img
                    src={imageUrl + item.icon}
                    className="img"
                    alt="Product 1"
                  />
                </Link>
              </div>
            )
          })}
          <div style={{ margin: "2px" }}></div>
          {/* Product Listing 2 */}
          <div className="rel best-second">
            <div
              className="slidertop2 wn"
              style={{
                visibility: "visible",
                overflow: "hidden",
                position: "relative",
                zIndex: 2,
                left: "0px",
                width: "968px",
              }}
            >
                <Slider {...settings}>
                  {bookList.length > 0 && bookList.map((item, index) => {
                    return (props.type == "ebooks" || item.type == props.type) && (
                      <li
                        key={index}
                        style={{
                          overflow: "hidden",
                          float: "left",
                          width: "242px",
                          height: "365px",
                        }}
                      >
                        <div className="view view-first brand-box-img">
                          <div className="list231p rs fl bgw soxs pb10 min">
                            <div className="w22s4pa">
                              <div className="w100 fl ac pt10 slide-img">
                                <img
                                  src={imageUrl + item.bookIcon}
                                  alt="img"
                                  width="144"
                                  height="191"
                                />
                              </div>
                              <div className="w100 fs13 fl pt5">
                                <div className="lh10 texthight">
                                  {item.bookName}
                                </div>
                                <div className="w100 fs11 fl">
                                  By: {item.author}
                                </div>
                                <div className="w100 fs11">Code: 2417</div>
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
                                    Rs.{item.MRP}/
                                  </samp>
                                  &nbsp;
                                  <span className="fs11">30% OFF</span>
                                </div>
                                <span className="fs14">
                                  <strong>Price: Rs. {item.sellingPrice}/-</strong>{" "}
                                </span>{" "}
                                <br />
                              </div>
                              <div className="w100 fl">
                                <div className="w35 bgw p2 fl">
                                  {" "}
                                  <img src="../images/ratingstars0.jpg" />{" "}
                                </div>
                                <div className="w40 fs12 fr grea">
                                  0 Review(s)
                                </div>
                              </div>
                              <div>Sample PDF</div>
                            </div>
                          </div>
                          <div className="mask view_1">
                            <div className="mt10 p10 prc">
                              <strong>Book Name : </strong>{item.bookName}
                              <br />
                              <strong>ISBN:</strong> {item.ISBN}
                              <br />
                              <strong>Author : </strong>{item.author}
                              <br />
                              <strong>Book Code : </strong>{item.bookCode}
                              <br />
                              <strong>Laguage : </strong> {item.language}
                              <br />
                              <strong>MRP : </strong>Rs.{item.MRP}/-
                              <br />
                              <strong>Selling Price : </strong>Rs. {item.sellingPrice}/-
                              <br />
                              <strong>Discount : </strong>{item.discount}%
                            </div>
                            <div className="part_A">
                              <Link
                                to={`/bookdetails/${item._id}`}
                                // title="Madhya Pradesh Upyantri (Vidhut) Sidhi Bharti Pariksha "
                                className="info1 info mb10 mt10"
                              >
                                Details
                              </Link>
                            </div>

                            <div
                              className="w100 fl mt5 part_A m0"
                              style={{ display: "inline" }}
                            >
                              <a
                                href="#"
                                onClick={() => showFilesForCart(item.bookFilesData)}
                                className="info mb10 pup-viewcart"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                              >
                                Add To Cart
                              </a>
                              <Link
                                to={`/bookdetails/${item._id}`}
                                // title="Madhya Pradesh Upyantri (Vidhut) Sidhi Bharti Pariksha "
                                className="info1 info mb10 mt10"
                              >
                                Buy Now
                              </Link>
                              <a href={`${imageUrl+item.samplePdf}`} target="_blank" className="pddown" download>Sample PDF <span><i class="fa fa-download" aria-hidden="true"></i></span></a>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </Slider>

              {/* </ul> */}

            </div>
          </div>
          <FIleModel showFiles={showFiles}/>
        </div>
        <div className="cb"></div>
      </div>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, width: '50px', height: '50px', }}
      onClick={onClick}
    >prev</div>
  );
}

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, width: '50px', height: '50px', }}
      onClick={onClick}
    >next</div>
  );
}

export default SliderCarousel;