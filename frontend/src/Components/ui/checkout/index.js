import { Toaster } from "react-hot-toast"
import Footer from "../../comman/Footer"
import Header from "../../comman/Header"
import { useState } from "react"
import SlideShow from "../../customComponent/Slideshow/Slideshow"
import Authentication from "../../Components/ui/auth"
import CartList from "../../Components/ui/homepage/AddCart/CartList"

const Checkout = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSingup, setIsOpenSingup] = useState(false);
  const [cartVisiable, setCartVisiable] = useState(false);
  const [getTotal, setGetTotal] = useState(0)
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
                  <h5>Already registered? <a href="#">LOGIN HERE</a></h5>
                  <h4>Fill in the Fields below to complete your purchase!</h4>
                  <div className="row">
                    
                    <div className="col-lg-7 ">
                    <div className="outer-border">
                    <div className="form-check-title">
                      <h4>Billing Information</h4>
                    </div>
                      <div className="check-info">
                        <div className="check-form">
                          <form>
                            <div className="row">
                              <div className="col-lg-12">
                                <label>Coaching Name / Teacher Name</label>
                                <input type="text" name="fullname" placeholder="Enter Coaching Name / Teacher Name" />
                              
                              </div>


                              <div className="col-lg-12">
                                <label>Address</label>
                                <textarea ></textarea>
                              </div>


                              <div className="col-lg-6">
                                <label>City</label>
                                <input type="text" name="city" placeholder="City" />
                              </div>
                              <div className="col-lg-6">
                                <label>Select State</label>
                                <select name="stateid" id="stateid" class="form-control">
                                  <option>-- Select --</option>
                                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option><option value="Andhra Pradesh">Andhra Pradesh</option><option value="Arunachal Pradesh">Arunachal Pradesh</option><option value="Asom">Asom (Assam)</option><option value="Bihar">Bihar</option><option value="Chandigarh">Chandigarh</option><option value="Chhattisgarh">Chhattisgarh</option><option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option><option value="Daman and Diu">Daman and Diu</option><option value="Delhi">Delhi</option><option value="Goa">Goa</option><option value="Gujarat">Gujarat</option><option value="Haryana">Haryana</option><option value="Himachal Pradesh">Himachal Pradesh</option><option value="Jammu and Kashmir">Jammu and Kashmir</option><option value="Jharkhand">Jharkhand</option><option value="Karnataka">Karnataka</option><option value="Kerala">Kerala</option><option value="Lakshadweep">Lakshadweep</option><option value="Madhya Pradesh">Madhya Pradesh</option><option value="Maharashtra">Maharashtra</option><option value="Manipur">Manipur</option><option value="Meghalaya">Meghalaya</option><option value="Mizoram">Mizoram</option><option value="Nagaland">Nagaland</option><option value="Odisha">Odisha (Orissa)</option><option value="Puducherry">Puducherry (Pondicherry)</option><option value="Punjab">Punjab</option><option value="Rajasthan">Rajasthan</option><option value="Sikkim">Sikkim</option><option value="Tamil Nadu">Tamil Nadu</option><option value="Telangana">Telangana</option><option value="Tripura">Tripura</option><option value="Uttar Pradesh">Uttar Pradesh</option><option value="Uttarakhand">Uttarakhand (Uttaranchal)</option><option value="West Bengal">West Bengal</option>
                                </select>
                              </div>


                              <div className="col-lg-6">
                              <label>Pincode</label>
                                <input type="number" name="pincode" placeholder="Pincode" />
                              </div>
                              <div className="col-lg-6">
                              <label>Select Country</label>
                                <select name="country" id="country" defaultvalue="India" class="form-control">
                                  <option>-- Select --</option>
                                  <option value="Afghanistan">Afghanistan</option>
                                  <option value="Akrotiri">Akrotiri</option>
                                  <option value="Albania">Albania</option>
                                  <option value="Algeria">Algeria</option>
                                  <option value="American Samoa">American Samoa</option>
                                  <option value="Andorra">Andorra</option>
                                  <option value="Angola">Angola</option>
                                  <option value="Anguilla">Anguilla</option>
                                  <option value="Antarctica">Antarctica</option>
                                  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                  <option value="Argentina">Argentina</option>
                                  <option value="Armenia">Armenia</option>
                                  <option value="Aruba">Aruba</option>
                                  <option value="Ashmore and Cartier Islands">Ashmore and Cartier Islands</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Austria">Austria</option>
                                  <option value="Azerbaijan">Azerbaijan</option>
                                  <option value="Bahamas, The">Bahamas, The</option>
                                  <option value="Bahrain">Bahrain</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="Barbados">Barbados</option>
                                  <option value="Bassas da India">Bassas da India</option>
                                  <option value="Belarus">Belarus</option>
                                  <option value="Belgium">Belgium</option>
                                  <option value="Belize">Belize</option>
                                  <option value="Benin">Benin</option>
                                  <option value="Bermuda">Bermuda</option>
                                  <option value="Bhutan">Bhutan</option>
                                  <option value="Bolivia">Bolivia</option>
                                  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                  <option value="Botswana">Botswana</option>
                                  <option value="Bouvet Island">Bouvet Island</option>
                                  <option value="Brazil">Brazil</option>
                                  <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                  <option value="British Virgin Islands">British Virgin Islands</option>
                                  <option value="Brunei">Brunei</option>
                                  <option value="Bulgaria">Bulgaria</option>
                                  <option value="Burkina Faso">Burkina Faso</option>
                                  <option value="Burma">Burma</option>
                                  <option value="Burundi">Burundi</option>
                                  <option value="Cambodia">Cambodia</option>
                                  <option value="Cameroon">Cameroon</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Cape Verde">Cape Verde</option>
                                  <option value="Cayman Islands">Cayman Islands</option>
                                  <option value="Central African Republic">Central African Republic</option>
                                  <option value="Chad">Chad</option><option value="Chile">Chile</option>
                                  <option value="China">China</option>
                                  <option value="Christmas Island">Christmas Island</option>
                                  <option value="Clipperton Island">Clipperton Island</option>
                                  <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                                  <option value="Colombia">Colombia</option>
                                  <option value="Comoros">Comoros</option>
                                  <option value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</option>
                                  <option value="Congo, Republic of the">Congo, Republic of the</option>
                                  <option value="Cook Islands">Cook Islands</option>
                                  <option value="Coral Sea Islands">Coral Sea Islands</option>
                                  <option value="Costa Rica">Costa Rica</option>
                                  <option value="Cote d" >Cote d'Ivoire</option>
                                  <option value="Croatia">Croatia</option>
                                  <option value="Cuba">Cuba</option>
                                  <option value="Cyprus">Cyprus</option>
                                  <option value="Czech Republic">Czech Republic</option>
                                  <option value="Denmark">Denmark</option>
                                  <option value="Dhekelia">Dhekelia</option>
                                  <option value="Djibouti">Djibouti</option>
                                  <option value="Dominica">Dominica</option>
                                  <option value="Dominican Republic">Dominican Republic</option>
                                  <option value="Ecuador">Ecuador</option>
                                  <option value="Egypt">Egypt</option>
                                  <option value="El Salvador">El Salvador</option>
                                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                                  <option value="Eritrea">Eritrea</option>
                                  <option value="Estonia">Estonia</option>
                                  <option value="Ethiopia">Ethiopia</option>
                                  <option value="Europa Island">Europa Island</option>
                                  <option value="Falkland Islands">Falkland Islands (Islas Malvinas)</option>
                                  <option value="Faroe Islands">Faroe Islands</option>
                                  <option value="Fiji">Fiji</option>
                                  <option value="Finland">Finland</option>
                                  <option value="France">France</option>
                                  <option value="French Guiana">French Guiana</option>
                                  <option value="French Polynesia">French Polynesia</option>
                                  <option value="French Southern and Antarctic Lands">French Southern and Antarctic Lands</option>
                                  <option value="Gabon">Gabon</option>
                                  <option value="Gambia, The">Gambia, The</option>
                                  <option value="Gaza Strip">Gaza Strip</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Ghana">Ghana</option>
                                  <option value="Gibraltar">Gibraltar</option>
                                  <option value="Glorioso Islands">Glorioso Islands</option>
                                  <option value="Greece">Greece</option>
                                  <option value="Greenland">Greenland</option>
                                  <option value="Grenada">Grenada</option>
                                  <option value="Guadeloupe">Guadeloupe</option>
                                  <option value="Guam">Guam</option>
                                  <option value="Guatemala">Guatemala</option>
                                  <option value="Guernsey">Guernsey</option>
                                  <option value="Guinea">Guinea</option>
                                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                                  <option value="Guyana">Guyana</option>
                                  <option value="Haiti">Haiti</option>
                                  <option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
                                  <option value="Holy See Vatican City">Holy See (Vatican City)</option>
                                  <option value="Honduras">Honduras</option><option value="Hong Kong">Hong Kong</option>
                                  <option value="Hungary">Hungary</option><option value="Iceland">Iceland</option>
                                  <option value="India" selected="">India</option><option value="Indonesia">Indonesia</option>
                                  <option value="Iran">Iran</option><option value="Iraq">Iraq</option>
                                  <option value="Ireland">Ireland</option><option value="Isle of Man">Isle of Man</option>
                                  <option value="Israel">Israel</option><option value="Italy">Italy</option>
                                  <option value="Jamaica">Jamaica</option><option value="Jan Mayen">Jan Mayen</option>
                                  <option value="Japan">Japan</option><option value="Jersey">Jersey</option>
                                  <option value="Jordan">Jordan</option>
                                  <option value="Juan de Nova Island">Juan de Nova Island</option>
                                  <option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option>
                                  <option value="Kiribati">Kiribati</option>
                                  <option value="Korea, North">Korea, North</option>
                                  <option value="Korea, South">Korea, South</option>
                                  <option value="Kuwait">Kuwait</option>
                                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                                  <option value="Laos">Laos</option>
                                  <option value="Latvia">Latvia</option>
                                  <option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option><option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option><option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Macau">Macau</option><option value="Macedonia">Macedonia</option><option value="Madagascar">Madagascar</option><option value="Malawi">Malawi</option><option value="Malaysia">Malaysia</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Malta">Malta</option><option value="Marshall Islands">Marshall Islands</option><option value="Martinique">Martinique</option><option value="Mauritania">Mauritania</option><option value="Mauritius">Mauritius</option><option value="Mayotte">Mayotte</option><option value="Mexico">Mexico</option><option value="Micronesia, Federated States of">Micronesia, Federated States of</option><option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option><option value="Montserrat">Montserrat</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option><option value="Navassa Island">Navassa Island</option><option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="Netherlands Antilles">Netherlands Antilles</option><option value="New Caledonia">New Caledonia</option><option value="New Zealand">New Zealand</option><option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option><option value="Niue">Niue</option><option value="Norfolk Island">Norfolk Island</option><option value="Northern Mariana Islands">Northern Mariana Islands</option><option value="Norway">Norway</option><option value="Oman">Oman</option><option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Panama">Panama</option><option value="Papua New Guinea">Papua New Guinea</option><option value="Paracel Islands">Paracel Islands</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option><option value="Philippines">Philippines</option><option value="Pitcairn Islands">Pitcairn Islands</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option><option value="Puerto Rico">Puerto Rico</option><option value="Qatar">Qatar</option><option value="Reunion">Reunion</option><option value="Romania">Romania</option><option value="Russia">Russia</option><option value="Rwanda">Rwanda</option><option value="Saint Helena">Saint Helena</option><option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option><option value="Saint Lucia">Saint Lucia</option><option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option><option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option><option value="Samoa">Samoa</option><option value="San Marino">San Marino</option><option value="Sao Tome and Principe">Sao Tome and Principe</option><option value="Saudi Arabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia and Montenegro">Serbia and Montenegro</option><option value="Seychelles">Seychelles</option><option value="Sierra Leone">Sierra Leone</option><option value="Singapore">Singapore</option><option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="Solomon Islands">Solomon Islands</option><option value="Somalia">Somalia</option><option value="South Africa">South Africa</option><option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option><option value="Spain">Spain</option><option value="Spratly Islands">Spratly Islands</option><option value="Sri Lanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="Suriname">Suriname</option><option value="Svalbard">Svalbard</option><option value="Swaziland">Swaziland</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option><option value="Syria">Syria</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option><option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Timor-Leste">Timor-Leste</option><option value="Togo">Togo</option><option value="Tokelau">Tokelau</option><option value="Tonga">Tonga</option><option value="Trinidad and Tobago">Trinidad and Tobago</option><option value="Tromelin Island">Tromelin Island</option><option value="Tunisia">Tunisia</option><option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Turks and Caicos Islands">Turks and Caicos Islands</option><option value="Tuvalu">Tuvalu</option><option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="United Arab Emirates">United Arab Emirates</option><option value="United Kingdom">United Kingdom</option><option value="United States">United States</option><option value="Uruguay">Uruguay</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Virgin Islands">Virgin Islands</option><option value="Wake Island">Wake Island</option><option value="Wallis and Futuna">Wallis and Futuna</option><option value="West Bank">West Bank</option><option value="Western Sahara">Western Sahara</option><option value="Yemen">Yemen</option><option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option>
                                </select>
                              </div>

                              <div className="col-lg-6">
                                <label>Telephone</label>
                                <input type="tel" name="telephone" placeholder="Telephone" />
                              </div>
                              <div className="col-lg-6">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobileno" placeholder="Mobile Number"></input>
                              </div>
                              <div className="col-lg-12">
                                <label>Emial</label>
                                <input type="email" name="email" placeholder="Email"></input>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="col-lg-5 ">
                      <div className="outer-border">
                      <div class="form-check-title"><h4>REVIEW YOUR ORDER</h4></div>
                       <div className="row">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Product Name</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>Delhi Metro Rail Corporation Non Executive Category</p>
                                </div>
                          </div>
                       </div>
                       <div className="row">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Qty</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>1</p>
                                </div>
                          </div>
                       </div>
                       <div className="row">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Subtotal</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>1000</p>
                                </div>
                          </div>
                       </div>
                       <div className="row">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Discount</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>100</p>
                                </div>
                          </div>
                       </div>
                       <div className="row total-border">
                          <div className="col-lg-6">
                               <div className="pro-name"> 
                                  <h6>Total</h6>
                                </div> 
                          </div>
                          <div className="col-lg-6">
                                <div className="pro-name">
                                   <p>900</p>
                                </div>
                          </div>
                       </div>

                       <div className="row">
                             <div className="col-lg-12">
                                <div className="order-but">
                                    <a href="#">Place Your order</a>
                                </div>
                             </div>
                       </div>

                      </div>
                    </div>

                  </div>
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