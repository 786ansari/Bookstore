import { useEffect, useState } from "react"
import { imageUrl } from "../../../services/dataurl"
import SliderLoader from "../../../utils/loaders/SliderLoader"

const PromotionAndOffer = (props) => {
    const [promotionAndOffer,setPromotionAndOffer] = useState([])
    useEffect(()=>{
        if(props && Object.keys(props.promotionoffer).length>0){
            setPromotionAndOffer(props.promotionoffer)
        }
    },[props])
    return (
      promotionAndOffer.length>0 ? <div className="w100 fl pt20 pb20">
              <div className="bgread bgread1">
                <div className="mid ac fs21 promotin">PROMOTION & OFFER</div>
              </div>
              <div className="w100 fl mt20">
                <div className="mid">
                  <div className="w27 mr10 rs fl pb40 add_part add_r">
                    <div className="w100 fl pb10">
                      <a href="books8efb.html?bid=275" target="_new">
                        <img
                          src={promotionAndOffer[0] && imageUrl+promotionAndOffer[0].icon}
                          className="img"
                          alt="Promotion 1"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="w27 rs fl pb40 mr10 rs5 add_part add_r">
                    <a
                      href="http://upkar.in/lpage.php?cat=19&amp;scat=0&amp;desc=GENERAL%20KNOWLEDGE/STATE%20G.K."
                      target="_new"
                    >
                      <img
                        src={promotionAndOffer[1] && imageUrl+promotionAndOffer[1].icon}
                        className="img"
                        alt="Promotion 2"
                      />
                    </a>
                  </div>
                  <div className="w44 rs fl pb40 rs3 add_part">
                    <div className="fl rs w51 rsimg">
                      <div className="w100 fl mb10">
                        <a href="books/bank-po-exam.html?bid=48" target="_new">
                          <img
                            src={promotionAndOffer[2] && imageUrl+promotionAndOffer[2].icon}
                            className="img"
                            alt="Promotion 3"
                          />
                        </a>
                      </div>
                      <img
                        src="images/upload/banners/49_dlivery-b-5-jan-2018.jpg"
                        className="img"
                        alt="Promotion 4"
                      />
                    </div>
                    <div className="fr rs w41 h355">
                      <a href="index.html?bid=285" target="_new">
                        <img
                        src={promotionAndOffer[3] && imageUrl+promotionAndOffer[3].icon}
                          className="img"
                          alt="Promotion 5"
                        />
                      </a>
                    </div>
                    <div className="w100 fl pt9">
                      <a href="books0669.html?bid=89" target="_new">
                        <img
                          src={promotionAndOffer[4] && imageUrl+promotionAndOffer[4].icon}
                          className="img"
                          alt="Promotion 6"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>:<SliderLoader setting={{width:1300,viewBox:"0 0 1300 460"}}/>
    )
}
export default PromotionAndOffer