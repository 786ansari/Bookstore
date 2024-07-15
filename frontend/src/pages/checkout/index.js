 import { Toaster } from "react-hot-toast"
import Footer from "../../comman/Footer"
import Header from "../../comman/Header"
import { useContext, useEffect, useState } from "react"
import SlideShow from "../../Components/Slideshow/Slideshow"
import Authentication from "../../Components/auth"
import CartList from "../../Components/AddCart/CartList"
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea"
import { City, Country, State } from "country-state-city"
import { AuthContext } from "../../context/AuthContext"
import { useLocation } from "react-router-dom"
import { setProfileData } from "../../services/profile.service"
import  usePayment  from "../../hooks/payment/usePayment"
import axios from "axios"
import { capturePayment } from "../../services/order.service"
import { OrderReviewForBooks, OrderReviewForDesign, OrderReviewForSubscriptionPlan } from "./OrderReview"

const Checkout = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSingup, setIsOpenSingup] = useState(false);
  const [cartVisiable, setCartVisiable] = useState(false);
  const [sellingAmount, setSellingAmount] = useState(0);
  const [MRP, SetMRP] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [bookNames, setBookName] = useState("");
  const [types, setType] = useState("");
  const [model_type, setModalType] = useState("");
  const [plans, setPlans] = useState({});

  const [ebook, setEBook] = useState({});
  const [files, setFiles] = useState([]);
  const [cityViaState, setCityViaState] = useState("");
  const [getTotal, setGetTotal] = useState(0)
  const { profile, userProfile } = useContext(AuthContext)
  const [form] = Form.useForm();
  const location = useLocation()
  const { book, totalMRP, totalSellingAmount,type, bookName,plan,modal_type } = location.state || {};
  const { handlePayment } = usePayment()
  const handleOpenDialogLogin = () => {
    setIsOpenLogin(true);
  };
  useEffect(() => {
    if (type == "cart" || type == "singleBook") {
      setEBook(book)
      setType(type)
      bookName && setBookName(bookName)
      setSellingAmount(totalSellingAmount)
      SetMRP(totalMRP)
      let dis = Number(totalMRP)-Number(totalSellingAmount)
        dis = (Number(dis)/Number(totalMRP))*100
      setDiscount(dis)
      // You can now use the data to pre-fill form fields or for other purposes
    }
    console.log("Received data in CheckoutPage:", book,modal_type);

    if(type == "subscription" || type == "design"){
        setModalType(modal_type)
        setType(type)
        setPlans(plan)
        setSellingAmount(plan?.amount)
    }
  }, [book]);
  useEffect(() => {
    if (userProfile) {
      form.setFieldsValue(userProfile);
    }
  }, [userProfile, form]);
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
  const onCreate = async(values) => {
    let result = await setProfileData(values)
    let data  = {
        amount:sellingAmount || totalSellingAmount,
        files:ebook,
        type:types,
        itemId:plans?._id,
        model_type:model_type
    }
        await handlePayment(data)
  };

  const handlePlaceOrder = () => {
    form.submit();
  };
  const handleIsoStateChange = (item) => {
    let iso = JSON.parse(item)
    console.log(iso)
    setCityViaState(iso.isoCode)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className={cartVisiable ? "col-10" : "col-12"}>
            <SlideShow list={["asdadadas", "sdadadaddas", "dsadsasad"]} loginPopup={handleOpenDialogLogin} signupPopup={handleOpenDialogSingup} />
            <Header cartVisibility={cartVisibility} />
            <Authentication
              isOpenLogin={isOpenLogin}
              isOpenSingup={isOpenSingup}
              setIsOpenLogin={setIsOpenLogin}
              setIsOpenSingup={setIsOpenSingup}
              modalClose={modalClose}
            />
            <div className="check-outer">
              <div className="checkout-main">
                <h5 className="page-title-check">Checkout </h5>
                <div className="broadcast-main">
                  <a href="#">Home<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span></a>
                  <a href="#">Checkout</a>
                </div>

                <div className="checkout-sub">
                  {/* <h5>Already registered? <a href="#">LOGIN HERE</a></h5> */}
                  <h4>Fill in the Fields below to complete your purchase!</h4>
        
                        <Form
        id="create"
        form={form}
        onFinish={onCreate}
        autoComplete="off"
        layout="vertical"
        name="setting_form"
      >
        <div className="row">
        <div className="col-lg-7 ">
                    <div className="outer-border">
                      <div className="check-info">
                        <div className="check-form">
        <Row gutter={[24, 0]}>
          <Divider
            orientation="left"
            orientationMargin={15}
            className="devider-color"
          >
        Billing Information
          </Divider>
          <Col span={12}>
            <Form.Item 
              label="Coaching Name / Teacher Name"
              name="name"
              rules={[
                { required: true, message: "Please enter Coaching Name / Teacher Name!" }
              ]}
            >
              <Input
                autoComplete="off"
                type="text"
                placeholder="Enter Coaching Name / Teacher Name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Email"
              name="emailId"
              rules={[
                { required: true, message: "Please enter email address!" },
                {
                  type: "email",
                  message: "The email is not a valid email!",
                },
              ]}
            >
              <Input
                autoComplete="off"
                type="text"
                placeholder="Enter Coaching Name / Teacher Name"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
          <Col span={12}>
            <Form.Item 
              label="Address1"
              name="address1"
              rules={[
                { required: true, message: "Please enter address!" }
              ]}
            >
              <TextArea
                autoComplete="off"
                type="text"
                placeholder="Enter address"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Address2"
              name="address2"
            >
              <TextArea
                autoComplete="off"
                type="text"
                placeholder="Enter address"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
        <Col span={12}>
            <Form.Item
              label="Enter country"
              name="country"
              rules={[
                { required: true, message: "Please enter country!" }, // Change the message  {
              ]}
            >
               <Input
                autoComplete="off"
                type="text"
                placeholder="Enter country"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Enter state"
              name="state"
              rules={[
                { required: true, message: "Please enter state!" }, // Change the message  {
              ]}
            >
               <Input
                autoComplete="off"
                type="text"
                placeholder="Enter state"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Enter City"
              name="city"
              rules={[
                { required: true, message: "Please enter city!" }, // Change the message  {
              ]}
            >
               <Input
                autoComplete="off"
                type="text"
                placeholder="Enter city"
              />
            </Form.Item>
          </Col>
        </Row>
              <Row gutter={[24,0]}>
              <Col span={12}>
            <Form.Item
              label="Pincode"
              name="pincode"
              rules={[
                { required: true, message: "Please enter your pincode!" }, // Change the message  {
              ]}
            >
                <Input
                autoComplete="off"
                type="number"
                placeholder="Enter pincode"
              />
            </Form.Item>
          </Col>
        <Col span={12}>
            <Form.Item
              label="Mobile Number"
              name="mobileNumber"
              rules={[
                { required: true, message: "Please enter mobile number!" },
                {
                  max: 10,
                  message:
                    "Mobile number should be 10 digit!",
                },
                {
                  min: 8,
                  message: "Mobile number should be 10 digit!",
                }, // Change the message  {
              ]}
            >
                <Input
                autoComplete="off"
                type="number"
                placeholder="Enter mobile number"
              />
            </Form.Item>
          </Col>
        </Row>
        </div>
                      </div>
                    </div>
                    </div>
                     <div className="col-lg-5 ">
                      <div className="outer-border">
                      {types == "subscription"? <OrderReviewForSubscriptionPlan plans={plans}/>:
                      types == "design" ? <OrderReviewForDesign plans={plans}/>: <OrderReviewForBooks type = {type} sellingAmount={sellingAmount} bookNames={bookNames} ebook={ebook} MRP={MRP} discount={discount} />
                      }

                       <div className="row">
                             <div className="col-lg-12">
                                <div className="order-but">
                                    <button type="button" className="btn btn-danger" onClick={handlePlaceOrder}>Place Your order</button>
                                </div>
                             </div>
                       </div>

                      </div>
                    </div>


                  </div>
             </Form>
                </div>

              </div>
            </div>
          </div>
          {cartVisiable && (
            <div className="col-2">
              <CartList getTotalOfCart={getTotal} />
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Toaster />
    </>
  )
}

export default Checkout