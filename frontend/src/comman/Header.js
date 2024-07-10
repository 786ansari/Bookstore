import { useEffect, useState } from "react";
import { getCartTotalAmountAndQuentity } from "../services/book.service";
import { Link, useLocation } from "react-router-dom";
import CartList from "../Components/AddCart/CartList";

const Header = (props) => {
  const [cartVisiable, setCartVisiable] = useState(false);
  const [noOfCart, setNoOfcart] = useState(0);
  const [query, setQuery] = useState("");
  const [totalAmountAndQuentity, setTotalAmountAndQuentity] = useState([]);
  const location = useLocation()

  useEffect(()=>{
    getTotalAmount()
    console.log("locationlocation",location)
  },[])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefaults()
    console.log("sjsksddfhsdfdsjf");
  }
  const getTotalAmount = async() => {
    let result = await getCartTotalAmountAndQuentity()
    if(result.status){
      setTotalAmountAndQuentity(result.data)
    }
  }

  return (
    <>
      <div className="header">
        {/* logo section*/}
        <div className="row">
          <div className="col-lg-3 first-logo">
            <div className="logo-se">
              <Link to="/">
                <img src="/images/logo.png" alt="Logo" className="logo-img" />
              </Link>
            </div>
          </div>
          {/* search section */}
          <div className="col-lg-6 second-search">
            <div className="form-main">
              <form method="get" action="">
              <form class="example" onSubmit={handleSubmit}>
                <input type="text" required placeholder="Search.." value={query} onChange={handleQueryChange} name="search"/>
                <button type="submit"><i class="fa fa-search"></i></button>
              </form>
              </form>
            </div>
          </div>
          {cartVisiable ? (
                <div className="col-2 cart-right">
                  <CartList/>
                </div>
              )
                : <></>
              }
          {/* cart left */}
          <div className="col-lg-3 third-shipping">
            <div className="">
              <div className="">
                <ul className="cart">
                  <li
                    onClick={() => {
                      props.cartVisibility(!cartVisiable);
                    }}
                  >
                    <a>
                      <div className=""></div>
                      <div className="">
                        <div className="">shopping cart</div>
                        <div className="">
                          {noOfCart == 0 ? (
                            <div className="cart-right-main">{totalAmountAndQuentity && totalAmountAndQuentity?.length>0?totalAmountAndQuentity[0].itemCount :"Empty Cart"}{totalAmountAndQuentity && totalAmountAndQuentity.length>0 && "     price: "+ totalAmountAndQuentity[0].totalSellingPrice}</div>
                          ) : (
                            noOfCart
                          )}
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="cb"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>

      <div className="w100 fl menuToHide">
        <div id="menubg" className="menuToHide1">
          <div className="mid">
            <nav className="animenu">
              <input type="checkbox" id="button" />
              <label htmlFor="button">Menu</label>
              <ul>
                <li>
                  <Link className={location?.pathname == "/"?"activ":""} to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/currentaffairs" className={location?.pathname == "/currentaffairs"?"activ":""}>
                    Current Affairs
                  </Link>
                </li>
                <li>
                  <Link to="/testseries" className={location?.pathname == "/testseries"?"activ":""}>Test Series</Link>
                </li>
                <li>
                  <Link to="/ebooks" className={location?.pathname == "/ebooks"?"activ":""}>E Book/Notes</Link>
                </li>
                <li>
                  <Link to="/design" className={location?.pathname == "/design"?"activ":""}>
                    Design
                  </Link>
                </li>
                <li>
                  <Link to="/typing" className={location?.pathname == "/typing"?"activ":""}>Typing</Link>
                </li>
               <li>
                 <Link to="/datatranslate" className={location?.pathname == "/datatranslate"?"activ":""}>Data Translate</Link>
                </li> 
                <li>
                  <Link to="/previousyearpaper" className={location?.pathname == "/previousyearpaper"?"activ":""}>Previous Year Paper</Link>
                </li>
              </ul>
            </nav>
            <div className="cb"></div>
          </div>
          <div className="cb"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
