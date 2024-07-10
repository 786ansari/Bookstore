import Header from "../../comman/Header";
import Footer from "../../comman/Footer";
import Cartpage from "./cartpage";
import { Toaster } from "react-hot-toast";
import Slidehow from "../../Components/Slideshow/Slideshow"
import { useState } from "react";
import Authentication from "../../Components/auth";
import CartList from "../../Components/AddCart/CartList";

const Cart = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSingup, setIsOpenSingup] = useState(false);
  const [cartVisiable, setCartVisiable] = useState(false);
  const [getTotal,setGetTotal] = useState(0)
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
  return (
    <>
    <Slidehow list={["asdadadas", "sdadadaddas", "dsadsasad"]} loginPopup = {handleOpenDialogLogin} signupPopup = {handleOpenDialogSingup}/>
    <Header cartVisibility={cartVisibility}/>
    {cartVisiable && (
            <div className="col-2">
              <CartList getTotalOfCart = {getTotal} />
            </div>
          )}
    <Authentication
                isOpenLogin={isOpenLogin}
                isOpenSingup={isOpenSingup}
                setIsOpenLogin={setIsOpenLogin}
                setIsOpenSingup={setIsOpenSingup}
                modalClose={modalClose}
              />
    <Cartpage/>
    <Footer/>
    <Toaster/>
    </>
  );
};
export default Cart;
