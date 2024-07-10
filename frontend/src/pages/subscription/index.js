import { useEffect, useState } from "react";
import Footer from "../../comman/Footer";
import Header from "../../comman/Header";
import SlideShow from "../../Components/Slideshow/Slideshow";
import { getSubscriptionPlan } from "../../services/order.service.js";
import { Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const { Meta } = Card;
  const navigate = useNavigate()

  useEffect(() => {
    getPlan();
  }, []);

  const getPlan = async () => {
    const result = await getSubscriptionPlan();
    setPlans(result.data);
    console.log("resultresult", result);
  };

  const handlePlanClick = (item) => {
    console.log("planitem",item)
    navigate("/checkout",{state:{plan:item,type:"subscription"}})
  }

  return (
    <>
      <SlideShow list={["asdadadas", "sdadadaddas", "dsadsasad"]} />
      <div className="container-fluid">
        <div className="row">
          <Header />
          <div className={"col-12"}>
            <div className="current-aff-main">
              <div className="current-title">
                <h4>Subscription Plans</h4>
              </div>
              <div className="current-broadcum">
                <a href="#">
                  Home
                  <span>
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                  </span>
                </a>
                <a href="#">Subscription</a>
              </div>
              <div className="site-card-wrapper" style={{ padding: "30px" }}>
                <Row gutter={24}>
                  {plans?.map((item, i) => {
                    return (
                      <Col span={24 * (1 / plans.length)} onClick={()=>handlePlanClick(item)}>
                        <Card hoverable>
                          <Meta
                          style={{fontWeight: "bold",}}
                            title={item?.title}
                            description={"Price: " + item?.amount + " RS"}
                          />
                          <label
                            style={{
                              display: "block",
                              marginTop: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {"Days: " + item?.days}
                          </label>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Subscription;
