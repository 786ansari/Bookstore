import React, { useEffect, useState } from "react";
// import AuthService from "../../../api/services/AuthService";
// import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from "react-bootstrap-table2-filter";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { CSVLink } from "react-csv";
import { $ } from 'react-jquery-plugin';
import moment from "moment";
import Select from "react-select";
import { getAllSubadmins, subadminDelete, subadminStatusChange, subadminUpdate } from "../../../services/subadmin.service";
import { ResultFunction } from "../../../comman/resultFunction";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const Staff = () => {
    const { SearchBar } = Search;
    const [subAdminList, setSubAdminList] = useState([]);
    const [subadminId, setSubadminId] = useState([]);
    const [name, setName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [passwords, setPassword] = useState('');
    const [gander, setGander] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [locations, setLocations] = useState('');
    const [multipleSelectd, setMultipleSelectd] = useState([]);
    const params = useLocation()
    const [designation, setDesignation] = useState([]);

    useEffect(()=>{
        setLocations(params?.pathname?.split("-")[1])
        getsubadmins(params)
    },[])
    const getsubadmins = async(params) => {
        console.log("ssssssssssssssssssssssssssssssssss",params)
        const pageType = {
            type:params?.pathname?.split("-")[1] || locations
        }
        let get = await getAllSubadmins(pageType)
        if(get.status && get.data.length>0){
            setSubAdminList(get.data)
        }
    }

    const linkFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                <button className="btn btn-dark btn-sm me-2" data-bs-toggle="modal" data-bs-target="#update_subadmin" onClick={() => handleSubadminDetail(row)}>Edit</button>
                <button className="btn btn-danger  btn-sm" onClick={() => deleteSubAdmin(row?._id)}>Delete</button>
            </>
        );
    };

    const statuslinkFollow = (cell, row, rowIndex, formatExtraData) => {
        console.log("cellcecllrowrow",row)
        return (
            <>
                <button class={row?.active === "1" ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"} style={{ marginLeft: "20px" }} onClick={() => handleStatus(row?._id, cell === "0" ? "1" : "0")}>{row?.active === "1" ? "Active" : "Inactive"}</button>
            </>
        );
    };

    const dateFilter = (cell, row, rowIndex, formatExtraData) => {
        return (
            <>
                {moment(row?.createdAt).format('MMMM DD YYYY')}
            </>
        );
    };
    const dobFilter = (cell, row, rowIndex, formatExtraData) =>{
        return (
            <>
                {moment(row?.dob).format('DD MMMM YYYY')}
            </>
        );
    }

    const handleStatus = async (userId, cell) => {
        let data = {
            id:userId,
            status:cell
        }
       let result = await subadminStatusChange(data)
        ResultFunction(result,getsubadmins)
    }

    const handleSubadminDetail = (id) => {
        setName(id.name);
        setEmail(id.email);
        setPhone(id.phone);
        // setPassword(passwords)
        setAddress(id.address);
        setGander(id.gender);
        setDob(id.dob);
        setRole(id.role)
        setMultipleSelectd(id.permissions);
        setDesignation(id.designation)
        setSubadminId(id._id);
    }

    const columns = [
        { dataField: 'name', text: 'Name' },
        { dataField: 'email', text: 'Email', sort: true, },
        { dataField: 'phone', text: 'Mobile Number', sort: true, },
        { dataField: 'dob', text: 'Date Of Birth', sort: true,formatter: dobFilter },
        { dataField: 'role', text: 'Role', sort: true, },
        { dataField: 'createdAt', text: 'Registration Date', sort: true, formatter: dateFilter },
        { dataField: 'active', text: 'Status', sort: true, formatter: statuslinkFollow },
        { dataField: 'Action', text: 'Action', formatter: linkFollow },
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 7,
        lastPageText: '>>',
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
    });

    useEffect(() => {
        handleSubadmin()
    }, []);

    const handleSubadmin = async () => {
        // await AuthService.getSubAdminList().then(async result => {
        //     if (result.data.length > 0) {
        //         try {
        //             setSubAdminList(result.data.reverse());
        //         } catch (error) {
        //             // alertErrorMessage(error);
        //         }
        //     } else {
        //         /* alertErrorMessage("Something Went Wrong"); */
        //     }
        // });
    }

    const deleteSubAdmin = async (userId) => {
        let data = {
            id:userId
        }
        let result = await subadminDelete(data)
        ResultFunction(result,getAllSubadmins)
    }

    const resetEditInput = () => {
        setName("");
        // setLastName("");
        setEmail("");
        setPhone("");
        setGander("");
        setDob("");
    }

    const handleUpdateSubadminList = async () => {
        let data = {
            _id: subadminId,
            name: name,
            gender: gander,
            email: email,
            phone: phone,
            address:address,
            password: passwords,
            dob: dob,
            role:"staff",
            permissions: multipleSelectd,
            designation:designation
        }
        let result = await subadminUpdate(data)
        $('#update_subadmin').modal('hide');
        ResultFunction(result,getsubadmins)
      
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

    console.log(multipleSelectd, 'multipleSelectd');

    return (
        <>
            <div id="layoutSidenav_content">
                <main>
                    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i className="far fa-user"></i></div>
                                            {params?.id} List
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* Main page content */}
                    <div className="container-xl px-4 mt-n10">
                        <div className="card mb-4">
                            <div className="card-header">{params?.id} Details
                                {subAdminList.length === 0 ? "" :
                                    <div className="dropdown">
                                        <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export </button>
                                        <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                            <CSVLink data={subAdminList} className="dropdown-item">Expoprt as CSV</CSVLink>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="card-body mt-3">
                                <table className="" width="100%" >
                                    {subAdminList.length === 0 ? <h6 className="ifnoData"><img src="assets/img/no-data.png" /> <br /> No Data Available</h6> :
                                        <ToolkitProvider
                                            hover
                                            bootstrap4
                                            keyField='id'
                                            columns={columns}
                                            data={subAdminList}
                                            exportCSV
                                            search={{
                                                afterSearch: (newResult) => console.log(newResult)
                                            }}
                                        >
                                            {
                                                props => (
                                                    <React.Fragment>
                                                        <SearchBar {...props.searchProps} />
                                                        <BootstrapTable
                                                            hover
                                                            bootstrap4
                                                            keyField='id'
                                                            columns={columns}
                                                            data={subAdminList}
                                                            pagination={pagination}
                                                            filter={filterFactory()}
                                                            {...props.baseProps}
                                                        />
                                                    </React.Fragment>
                                                )
                                            }
                                        </ToolkitProvider>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* sub admin edit Pair modal data */}
            <div className="modal" id="update_subadmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog  modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">
                                Edit Details
                            </h5>
                            {/* <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body">
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputFirstName">Full name <em>*</em></label>
                                        <input className="form-control  form-control-solid" id="inputFirstName" type="text" placeholder="Enter your first name" value={name} onChange={(event) => setName(event.target.value)} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputEmailAddress">Email</label>
                                        <input className="form-control form-control-solid" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputBirthday">Gander <em>*</em></label>
                                        <select className="form-control form-control-solid" id="exampleFormControlSelect1" name="gender" value={gander} onChange={(event) => setGander(event.target.value)}>
                                        <option value="">Select</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminine">Feminine</option>
                                            <option value="Neuter">Neuter</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputLocation">Phone Number</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Number" value={phone} onChange={(event) => setPhone(event.target.value)} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputLocation">Address</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your address" name="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="small mb-1" for="inputLocation">Password</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="text" placeholder="Enter your Password" name="password" value={passwords} onChange={(e)=>{setPassword(e.target.value)}} />
                                    </div>
                                </div>

                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Date of Birth</label>
                                        <input className="form-control form-control-solid" id="inputLocation" type="date" placeholder="Enter your Date of Birth" value={dob} onChange={(event) => setDob(event.target.value)} />
                                    </div>
                                    <div className="col-md-6" >
                                        <label className="small mb-1" for="inputLocation">Designation</label>
                                        <Select isMulti options={designationOption}
                                            onChange={setDesignation}
                                            value={designation}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-12">
                                        <label className="small mb-1" for="inputLocation">Permissions</label>
                                        <Select isMulti options={multipleSelect}
                                            onChange={setMultipleSelectd}
                                            value={multipleSelectd}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <button className="btn btn-indigo" type="button" onClick={handleUpdateSubadminList}> Submit Details </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* sub admin edit modal data */}
            <Toaster/>
        </>

    )
}

export default Staff;