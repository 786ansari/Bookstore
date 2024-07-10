import moment from "moment"
import { imageUrl } from "../../services/dataurl";
import NewsletterSubscription from "../../Components/UserFeedback";
import FeedbackForm from "../../Components/support";
import { useState } from "react";
const Papers = (props) => {
    console.log("propspropspropsorps",props);
    const [customerCare, setCustomerCare] = useState(false);
    const [newsLater, setNewsLater] = useState(false);
    return(
        <>
         <div className="col-lg-9 current-right">
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
                </div>
        <ul className="row ebok-ul" style={{display:"flex",flexDirection:"row"}}>
            <li className="col-lg-3" tabIndex="-1" style={{ display: 'inline-block',fontSize:"bold" }}>
                <div className="papers">
                    Date
                </div>
                </li>
                <li className="col-lg-3" tabIndex="-1" style={{ display: 'inline-block' }}>
                <div className="papers">
                    Exam Type
                </div>
                </li>
                <li className="col-lg-3" tabIndex="-1" style={{ display: 'inline-block' }}>
                <div className="papers">
                    Subject
                </div>
                </li>
                <li className="col-lg-3" tabIndex="-1" style={{ display: 'inline-block' }}>
                <div className="papers">
                    File
                </div>
                </li>
                </ul>
        {
            props && props.data.map((item,i)=>{
                return <div className="row cur-inn">
                    <div className="col-lg-12" style={{display:"flex",justifyContent:"space-between"}}>
                    <div className="date-cu">
                        <p>{moment(item.createdAt).format("DD-MM-YYYY")}</p>
                    </div>
                    <div className="date-cu">
                        <p>{item.examType} </p>
                    </div>
                    <div className="date-cu">
                        <p>{item.subject} </p>
                    </div>
                    <div className="date-cu">
                        <a href={item.file} className="btn btn-primary" target="_blank">
                        <p>File </p>
                        </a>
                    </div>
                    </div>
             {/* <div className="col-lg-2">
          <div className="curr-but">
          <a href="https://ab2software.com/sample.pdf" className="current-img" download>
              <p>{item.subject} <span><i class="fa fa-download" aria-hidden="true"></i></span></p>
            </a>
          </div>
        </div> */}
        </div>
  })
}
        </>
    )
}

export default Papers