import React, { useState } from "react";
// import AuthService from "../../../api/services/AuthService";
// import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import Select from "react-select";
import { SubadminAdd } from "../../../services/subadmin.service";
import { HotToaster } from "../../../utils/Toaster";
import { Toaster } from "react-hot-toast";
import { State, City}  from 'country-state-city';

const CoachingManagement = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('male');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState();
    const [stateIsoCode, setStateIsoCode] = useState();
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [pincode, setPincode] = useState('');
    const [passwords, setPassword] = useState('');
    const [dor, setDor] = useState('');
    const [multipleSelectd, setMultipleSelectd] = useState([]);



    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "name":
                setName(event.target.value);
                break;
            // case "lastName":
            //     setLastName(event.target.value);
            //     break;
            case "gender":
                setGender(event.target.value);
                break;
            case "number":
                setNumber(event.target.value);
                break;
            case "district":
                setDistrict(event.target.value);
                break;
            case "address":
                setAddress(event.target.value);
                break;
            case "pincode":
                setPincode(event.target.value);
                break;                
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "dor":
                setDor(event.target.value);
                break;
            default:
        }
    }
    const handleStateChange = (event) => {
        console.log("event",event.target.value)
        let obj = JSON.parse(event.target.value)

                setState(obj.name)
                setStateIsoCode(obj.isoCode)
    }

    const resetInputChange = () => {
        setName("");
        setAddress("");
        setDistrict("")
        setPincode("")
        setState("")
        setGender("");
        setNumber("");
        setEmail("");
        setPassword("");
        setDor("");
        setMultipleSelectd([]);

    }

    const handleSubAdmin = async (name, gender, email, number, passwords, dor, multipleSelectd,address,district,state,pincode) => {
        let data = {
            name: name,
            // last_name: lastName,
            gender: gender,
            email: email,
            phone: number,
            password: passwords,
            dor: dor,
            role:"coaching",
            address:address,
            district:district,
            state:state,
            pincode:pincode,
            permissions: multipleSelectd
        }
      let result = await SubadminAdd(data)
      HotToaster(result.status,result.message)
      if(result.status){
        resetInputChange()
      }
    }



    var multipleSelect = [
        {
            value: 4,
            label: 'Books Management'
        }
    ];

    const handleMultiple = (e) => {
        setMultipleSelectd(Array.isArray(e) ? e.map(x => x.value) : []);
    }


    console.log(multipleSelectd, 'multipleSelect');

    return (
        <div id="layoutSidenav_content">
            <main>
                <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                    <div className="container-xl px-4">
                        <div className="page-header-content pt-4">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto mt-4">
                                    <h1 className="page-header-title">
                                        <div className="page-header-icon"><i className="far fa-user"></i></div>
                                        Add New Coaching
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">Enter Coaching Details</div>
                        <div className="card-body">
                            <form>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputFirstName">Full name <em>*</em></label>
                                        <input type="text" className="form-control  form-control-solid" id="inputFirstName" placeholder="Enter your full name" name="name" value={name} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputEmailAddress">Email</label>
                                        <input className="form-control form-control-solid" id="inputEmailAddress" type="email" placeholder="Enter your email address" name="email" value={email} onChange={handleInputChange} />
                                    </div>
                                    {/* <div className="col-md-4">
                                        <label className="small mb-1" for="inputLastName">Last name <em>*</em> </label>
                                        <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Enter your last name" name="lastName" value={lastName} onChange={handleInputChange} />
                                    </div> */}
                                   
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputBirthday">Gander <em>*</em></label>
                                        <select className="form-control form-control-solid" id="exampleFormControlSelect1" name="gender" value={gender} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminine">Feminine</option>
                                            <option value="Neuter">Neuter</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Phone Number</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Number" name="number" value={number} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Password</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Password" name="password" value={passwords} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Registration Date</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="date" pattern="\d{4}-\d{2}-\d{2}"  placeholder="Enter your Date of Birth" name="dor" value={dor} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Address</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Address" name="address" value={address} onChange={handleInputChange} />
                                    </div>
                                <div className="col-md-6" >
                                <label className="small mb-1" for="inputLocation">State</label>
                                <select name="state" id="txtrstate" className="form-control form-control-solid" value={state?.name}
                            onChange={handleStateChange}
                            >
                              <option value=""> --- Select State --- </option>
                              {State?.getStatesOfCountry("IN")?.map((state,index)=>{
                                return <option value={JSON.stringify(state)}>{state.name}</option>
                              })}
                              {/* Add other state options */}
                            </select>
                            </div>
                                </div>
                                {console.log("citycitycity===>>>",City?.getCitiesOfState("IN",setStateIsoCode))}
                                <div className="row gx-3 mb-3">
                                <div className="col-md-6" >
                                <label className="small mb-1" for="inputLocation">District</label>
                                <select name="district" id="txtrstate" className="form-control form-control-solid" value={district}
                            onChange={handleInputChange}
                            >
                              <option value=""> --- Select District --- </option>
                              {City?.getCitiesOfState("IN",stateIsoCode)?.map((city,index)=>{
                                return <option value={city.name}>{city.name}</option>
                              })}
                              {/* Add other state options */}
                            </select>
                            </div>
                                <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Pin Code</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="number" placeholder="Enter your Pincode" name="pincode" value={pincode} onChange={handleInputChange} />
                                    </div>
                               
                                </div>
                                <div className="row gx-3 mb-3 " >
                                    <div className="col-md-6" >
                                        <label className="small mb-1" for="inputLocation">Permissions</label>
                                        <Select isMulti options={multipleSelect}
                                            onChange={setMultipleSelectd}
                                            value={multipleSelectd}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <button className="btn btn-indigo" type="button" onClick={() => handleSubAdmin(name, gender, email, number, passwords, dor, multipleSelectd,address,district,state,pincode)} > Submit Details </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Toaster/>
        </div>
    )
}

export default CoachingManagement;