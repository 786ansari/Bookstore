import { Toaster } from "react-hot-toast"
import Footer from "../../comman/Footer"
import Header from "../../comman/Header"
import { useEffect, useState } from "react"
import SlideShow from "../../Components/Slideshow/Slideshow"
import CartList from "../../Components/AddCart/CartList"
import ChapterSection from "./chapterSection"
import FileSection from "./fileSection"
import { imageUrl } from "../../services/dataurl"
import NewsletterSubscription from "../../Components/UserFeedback";
import FeedbackForm from "../../Components/support";


const BookContent = () => {
    const [cartVisiable, setCartVisiable] = useState(false);
    const [file, setFile] = useState("")
    const [getTotal,setGetTotal] = useState(0)
    const [customerCare, setCustomerCare] = useState(false);
    const [newsLater, setNewsLater] = useState(false);
    
    const cartVisibility = (e) => {
      setCartVisiable(!cartVisiable)
  }
  const getFileByDetails = async(bookUrl) => {
    setFile(imageUrl+bookUrl)
  }

    return(
        <>
        <div className="container-fluid">
        <div className="row">
          <div className={cartVisiable ? "col-10" : "col-12"}>
        <SlideShow />
        <Header cartVisibility={cartVisibility}/>              
        </div>

        <div className="row">
            <div className="col-md-4">
                <ChapterSection getFile={getFileByDetails}/>
            </div>
            <div className="col-md-8">
                <FileSection file={file} />
            </div>
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

export default BookContent