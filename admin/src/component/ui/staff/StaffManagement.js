import React, { useState } from "react";
// import AuthService from "../../../api/services/AuthService";
// import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import Select from "react-select";
import { SubadminAdd } from "../../../services/subadmin.service";
import { HotToaster } from "../../../utils/Toaster";
import { Toaster } from "react-hot-toast";

const StaffManagement = () => {
    const [name, setName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('male');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [passwords, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [designation, setDesignation] = useState([]);
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
            case "address":
                setAddress(event.target.value);
                break;
            case "number":
                setNumber(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "dob":
                setDob(event.target.value);
                break;
            default:
        }
    }

    const resetInputChange = () => {
        setName("");
        setAddress("");
        setGender("");
        setNumber("");
        setEmail("");
        setPassword("");
        setDob("");
        setMultipleSelectd([]);
        setDesignation([])

    }

    const handleSubAdmin = async (name, gender, email,address, number, passwords, dob, multipleSelectd,designation) => {
        let data = {
            name: name,
            // last_name: lastName,
            gender: gender,
            email: email,
            phone: number,
            address:address,
            password: passwords,
            dob: dob,
            role:"staff",
            permissions: multipleSelectd,
            designation:designation
        }
      let result = await SubadminAdd(data)
      HotToaster(result.status,result.message)
      if(result?.status){
        resetInputChange()
      }
    }

    var designationOption = [
        {
            value: 1,
            label: 'Marketing'
        },
        {
            value: 2,
            label: 'Panel Management'
        },
    ]



    var multipleSelect = [
        // {
        //     value: 0,
        //     label: 'Dashboards'
        // },
        {
            value: 1,
            label: 'Users Management'
        },
        {
            value: 2,
            label: 'Category Management'
        },
        {
            value: 3,
            label: 'Poster Management'
        },
        {
            value: 4,
            label: 'Books Management'
        },
        {
            value: 5,
            label: 'Current Affairs Management'
        },
        {
            value: 6,
            label: 'Test Series Management'
        },
        {
            value: 7,
            label: 'Design Management'
        },
        {
            value: 8,
            label: 'Previous Year Paper Management'
        },
        {
            value: 9,
            label: 'Typing Management'
        },
        {
            value: 10,
            label: 'Data Translate Management'
        },
        {
            value: 11,
            label: 'Trending Title Management'
        },
        {
            value: 15,
            label: 'Review Management'
        },
        {
            value: 16,
            label: 'Carts Management'
        },
        {
            value: 17,
            label: 'Support Management'
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
                                        Add New Staff
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">Enter Staff Details</div>
                        <div className="card-body">
                            <form>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputFirstName">Full name <em>*</em></label>
                                        <input type="text" className="form-control  form-control-solid" id="inputFirstName" placeholder="Enter your full name" name="name" value={name} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputEmailAddress">Email</label>
                                        <input className="form-control form-control-solid" id="inputEmailAddress" type="email" placeholder="Enter your email address" name="email" value={email} onChange={handleInputChange} />
                                    </div>
                                    {/* <div className="col-md-4">
                                        <label className="small mb-1" for="inputLastName">Last name <em>*</em> </label>
                                        <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Enter your last name" name="lastName" value={lastName} onChange={handleInputChange} />
                                    </div> */}
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputBirthday">Gander <em>*</em></label>
                                        <select className="form-control form-control-solid" id="exampleFormControlSelect1" name="gender" value={gender} onChange={handleInputChange}>
                                        <option value="">Select</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminine">Feminine</option>
                                            <option value="Neuter">Neuter</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                   
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Phone Number</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Number" name="number" value={number} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Address</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your address" name="address" value={address} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Password</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Password" name="password" value={passwords} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Date of Birth</label>
                                        <input className="form-control form-control-solid" id="inputLocation" pattern="\d{4}-\d{2}-\d{2}" type="date" placeholder="Enter your Date of Birth" name="dob" value={dob} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3 " >
                                    <div className="col-md-6" >
                                        <label className="small mb-1" for="inputLocation">Designation</label>
                                        <Select isMulti options={designationOption}
                                            onChange={setDesignation}
                                            value={designation}
                                        >
                                        </Select>
                                    </div>

                                    <div className="col-md-6" >
                                        <label className="small mb-1" for="inputLocation">Permissions</label>
                                        <Select isMulti options={multipleSelect}
                                            onChange={setMultipleSelectd}
                                            value={multipleSelectd}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <button className="btn btn-indigo" type="button" onClick={() => handleSubAdmin(name, gender, email,address, number, passwords, dob, multipleSelectd,designation)} > Submit Details </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Toaster/>
        </div>
    )
}

export default StaffManagement;