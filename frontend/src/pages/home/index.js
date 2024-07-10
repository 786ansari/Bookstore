import React, { useState, useEffect } from "react";
import Banner from "../../customComponent/Banner";
import Footer from "../../comman/Footer";
import PromotionAndOffer from "./promotion&Offer";
import {
  bookListGet,
  getPromotionAndOffer,
  posterListGet,
  trendingTitleAndImages,
} from "../../services/book.service";
import Category from "../../Components/categorylist";
import BestSeller from "../../pages/home/bestseller";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SocialIcons from "../../Components/socialmedia";
import CartList from "../../Components/AddCart/CartList";
import FeedbackForm from "../../Components/support";
import NewsletterSubscription from "../../Components/UserFeedback";
import Slidehow from "../../Components/Slideshow/Slideshow";
import Header from "../../comman/Header";
import { getPermotionModal } from "../../services/auth.service";
import PermotionPopup from "../../Components/permotionModal";

const Home = () => {
  const [posterList, setPosterList] = useState([]);
  const [cartVisiable, setCartVisiable] = useState(false);
  const [customerCare, setCustomerCare] = useState(false);
  const [newsLater, setNewsLater] = useState(false);
  const [noOfCart, setNoOfcart] = useState(0)
  const [bookList, setBookList] = useState([])
  const [promotionAndOffer, setPromotionAndOffer] = useState([])
  const [trendingTitleImages, setTrendingTitleImages] = useState([])
  const [modalData,setModalData] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getPoster();
    getBooks()
    getPromotionAndIffer()
    getTitleImages()
    getPermotionModalData()
  }, []);
  const getBooks = async () => {
    const result = await bookListGet()
    if (result.status && result.data) {
      setBookList(result.data)
    }
  }
  const getTitleImages = async () => {
    const result = await trendingTitleAndImages()
    if (result.status) {
      setTrendingTitleImages(result.data)
    }
  }
  const getPromotionAndIffer = async () => {
    let result = await getPromotionAndOffer()
    if (result.status) {
      setPromotionAndOffer(result.data)
    }
  }
  // const getTotal = (number) => {
  //   setNoOfcart(number)
  // }
  const getPoster = async () => {
    const result = await posterListGet();
    if (result.status && result.data) {
      setPosterList(result.data);
    }
  };
  const cartVisibility = (e) => {
    setCartVisiable(!cartVisiable)
  }

  const getPermotionModalData =  async() => {
    let result = await getPermotionModal()
    if(result?.status){
      setTimeout(()=>setModalData(result.data),5000)
    }
  }
  return (
    
      <div className="container-fluid">
        <div className="row">
          <div className={"col-12"}>
            <div className="row">
              {modalData?.length>0 && <PermotionPopup data={modalData}/>}
              <div className={cartVisiable ? "col-10" : "col-12"}>
                <Slidehow list={["asdadadas", "sdadadaddas", "dsadsasad"]} />
                <Header cartVisibility={cartVisibility} />

                <div style={{ height: "127px" }}></div>

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
                </p>

                <div className="banner">
                  <div className="mid">
                    <div className="banner_left">
                      <div id="banner">
                        <Banner list={posterList} />
                      </div>
                    </div>
                            <Category type={"banner_right"} page={"books"}  />
                    <div className="cb"></div>
                  </div>
                  <FeedbackForm isOpenFeedback={customerCare} />
                </div>

                <div className="cb"></div>

                <SocialIcons  />
                <BestSeller type="NEW ARRIVALS" books={bookList} sideImages={trendingTitleImages} />
                <BestSeller type="BEST SELLERS" books={bookList} sideImages={trendingTitleImages} />
                <BestSeller type="UPCOMING EXAM BOOKS" books={bookList} sideImages={trendingTitleImages} />

                <PromotionAndOffer promotionoffer={promotionAndOffer} />
              </div>
              {cartVisiable ? (
                <div className="col-2 cart-right">
                  <CartList />
                </div>
              )
                : <></>
              }
            </div>
        <Footer /> 

          </div>
        </div>
        <Toaster />
      </div> 
  );
};

export default Home;
