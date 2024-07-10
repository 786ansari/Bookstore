import { Toaster } from "react-hot-toast"
import Footer from "../../comman/Footer"
import Header from "../../comman/Header"
import BookSection from "./booksection"
import { useState } from "react"
import SlideShow from "../../Components/Slideshow/Slideshow"
import Authentication from "../../Components/auth"
import CartList from "../../Components/AddCart/CartList"
import NewsletterSubscription from "../../Components/UserFeedback";
import FeedbackForm from "../../Components/support";

const BookDetails = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenSingup, setIsOpenSingup] = useState(false);
    const [cartVisiable, setCartVisiable] = useState(false);
    const [getTotal,setGetTotal] = useState(0)
    const [customerCare, setCustomerCare] = useState(false);
    const [newsLater, setNewsLater] = useState(false);
    const handleOpenDialogLogin = () => {
      setIsOpenLogin(true);
    };
  
    const handleOpenDialogSingup = () => {
      setIsOpenSingup(true);
    };
    const modalClose = (page, boolean) => {
      if (page == "login") {
        setIsOpenLogin(boolean);
      } else {
        setIsOpenSingup(boolean);
      }
    };
    const cartVisibility = (e) => {
      setCartVisiable(!cartVisiable)
  }
    return(
        <>
        <div className="container-fluid">
        <div className="row">
          <div className={cartVisiable ? "col-10" : "col-12"}>
        <SlideShow list={["asdadadas", "sdadadaddas", "dsadsasad"]} loginPopup = {handleOpenDialogLogin} signupPopup = {handleOpenDialogSingup}/>
        <Header cartVisibility={cartVisibility}/>
        <Authentication
                isOpenLogin={isOpenLogin}
                isOpenSingup={isOpenSingup}
                setIsOpenLogin={setIsOpenLogin}
                setIsOpenSingup={setIsOpenSingup}
                modalClose={modalClose}
              />
        <BookSection/>
        </div>

        <div className="col-lg-9 current-right">
           <p className="mt10 carebutt download-C1">
                  <a
                    onClick={() => {
                      setNewsLater(!newsLater);
                      setCustomerCare(false);
                    }}
                    className="pup-login"
                  >
                    <img src="../images/newsletter.jpg" />
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
                    <img src="../images/support.jpg" />
                  </a>
                  {newsLater && <NewsletterSubscription />}
                  <FeedbackForm isOpenFeedback={customerCare} />
                </p>
                </div>



        {cartVisiable && (
            <div className="col-2">
              <CartList getTotalOfCart = {getTotal} />
            </div>
          )}
        </div>
        </div>
        <Footer/>
        <Toaster/>
        </>
    )
}

export default BookDetails