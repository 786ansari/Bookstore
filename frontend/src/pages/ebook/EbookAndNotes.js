import React, { useState, useEffect } from "react";
import Header from "../../comman/Header";
import Footer from "../../comman/Footer";
import Category from "../../Components/categorylist";
import { getAllEbooks } from "../../services/book.service";
import { imageUrl } from "../../services/dataurl";
import { Link, useLocation } from "react-router-dom";
import SlideShow from "../../Components/Slideshow/Slideshow";
import SocialIcons from "../../Components/socialmedia";
import FeedbackForm from "../../Components/support"
import NewsletterSubscription from "../../Components/UserFeedback";
import FIleModel from "../../comman/FileModel";

const EbookAndNotes = () => {
  const [ebooks, setEbooksData] = useState([]);
  const [showFiles, setShowFiles] = useState([])
  const location = useLocation()
  const [customerCare, setCustomerCare] = useState(false);
  const [newsLater, setNewsLater] = useState(false);

  useEffect(() => {
    getallebooks()
  }, [location.pathname])

  const getallebooks = async () => {
    console.log("locationlocation",location.pathname.split("/")[2])
    let data
    if(location.pathname.split("/").length == 3){
        data={
          categoryId:location.pathname.split("/")[2]
        }
    }
    const result = await getAllEbooks(data);
    if (result.status && result.data) {
      setEbooksData(result.data);
    }
  };
  
  const showFilesForCart = (item) => {
    setShowFiles(item)
  }

  return (
      <>
      <SlideShow list={["asdadadas", "sdadadaddas", "dsadsasad"]}  />
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className={"col-12"}>

            <div className="current-aff-main">
              <div className="current-title">
                <h4>Ebook And Notes</h4>
              </div>
              <div className="current-broadcum">
                <a href="#">Home<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span></a>
                <a href="">Ebook And Notes</a>
              </div>
              <div className="current-mm">
                <div className="row current-inner">
                  <div className="col-lg-3 current-left">
                    <div className="current-name">Ebook And Notes</div>
                    <div className="current-link">
                      <div className="current-link-inner">
                        <div className="test-cat">
                          <div className="over_home">                            
                            <Category page={'/ebooks'} />                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 current-right">
                    <div className="current-filter">
                    <SocialIcons  />
                    </div>
                    <p className="mt10 carebutt download-C1">
                  <a
                    onClick={() => {
                      setNewsLater(!newsLater);
                      setCustomerCare(false);
                    }}
                    className="pup-login"
                  >
                    <img src="images/newsletter.jpg" />
                  </a>
                </p>
                <p
                  className="mt100 carebutt download-C"
                  style={{ marginTop: "0px", height: "0px" }}
                >
                  <a
                    onClick={() => {
                      setNewsLater(false);
                      setCustomerCare(!customerCare);
                    }}
                    className="pup-login"
                  >
                    <img src="images/support.jpg" />
                  </a>
                  {newsLater && <NewsletterSubscription />}
                  <FeedbackForm isOpenFeedback={customerCare} />
                </p>
                    <div className="current-main">
                      <div className="current-right">
                     
                        <ul className="row ebok-ul">
                          {ebooks.length>0 && ebooks.map((item,i)=>{
                            return <li className="col-lg-3" tabIndex="-1" style={{display: 'inline-block' }}>
                            <div className="view view-first brand-box-img">
                              <div className="list231p rs fl bgw soxs pb10 min">
                                <div className="w22s4pa">
                                  <div className="w100 fl ac pt10 slide-img">
                                    <img
                                      src={imageUrl+item.bookIcon}
                                      alt="img"
                                      width="144"
                                      height="191"
                                    />
                                  </div>
                                  <div className="w100 fs13 fl pt5">
                                    <div className="lh10 texthight">{item.bookName}</div>
                                    <div className="w100 fs11 fl">By: {item.author}</div>
                                    <div className="w100 fs11">Code: {item.bookCode}</div>
                                  </div>
                                  <div className="pt5" style={{ color: 'rgb(0, 0, 0)' }}>
                                    <div className="mt20">
                                      MRP: <samp style={{ textDecoration: 'line-through' }}>Rs.{item.MRP}/</samp>&nbsp;<span className="fs11">{item.discount} OFF</span>
                                    </div>
                                    <span className="fs14"><strong>Price: Rs. {item.sellingPrice}/-</strong></span><br />
                                  </div>
                                  <div className="w100 fl">
                                    <div className="w35 bgw p2 fl">
                                      <img src="/images/ratingstars0.jpg" alt="Rating" />
                                    </div>
                                    <div className="w40 fs12 fr grea">0 Review(s)</div>
                                  </div>
                                  <div>Sample PDF</div>
                                </div>
                                <div className="mask view_1">
                                  <div className="mt10 p10 prc">
                                    <strong>Book Name : </strong>{item.bookName}<br />
                                    <strong>ISBN:</strong> {item.ISBN}<br />
                                    <strong>Author : </strong>{item.author}<br />
                                    <strong>Book Code : </strong>{item.author}<br />
                                    <strong>Laguage : </strong> {item.language}<br />
                                    <strong>MRP : </strong>Rs.{item.MRP}/-<br />
                                    <strong>Selling Price : </strong>Rs. {item.sellingPrice}/-<br />
                                    <strong>Discount : </strong>{item.discount}%
                                  </div>
                                  <div className="part_A">
                                    <Link className="info1 info mb10 mt10" to={`/bookdetails/${item._id}`}>Details</Link>
                                  </div>
                                  <div className="w100 fl mt5 part_A m0" style={{ display: 'inline' }}>
                                    <a href="#" className="info mb10 pup-viewcart" onClick={() => showFilesForCart(item.bookFilesData)} 
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">Add To Cart</a>
                                    <a href="javascript:fn_orderNow(13476,1)" title="Buy Now" className="info mb10">Buy Now</a>
                                    <a href={imageUrl+item.samplePdf} target="_blank" className="pddown" download="">
                                      Sample PDF <span><i className="fa fa-download" aria-hidden="true"></i></span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          })}
                    <FIleModel showFiles={showFiles} />
              </ul>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <Footer />
              </>

              )
}
              export default EbookAndNotes