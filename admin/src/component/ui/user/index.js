import React, { useEffect, useState, updateProfile } from "react";
import { useNavigate } from "react-router-dom";
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
// import TraderDetails from "../TraderDetails";
import { CSVLink } from "react-csv";
import { getUserDataService } from "../../../services/user.service";
import ViewUser from "../../../models/ViewUser";
// import moment from "moment";
// import { StoreKeys, getActiveValue, handleActiveValue } from "../../../utils/StorageHandler";

const Users = (props) => {

    const [activeScreen, setActiveScreen] = useState('userdetail');
    const [tradeList, setTradeList] = useState([]);
    const [viewUser, setViewUser] = useState({});
    const { SearchBar } = Search;
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [exportData, setExportData] = useState([]);

    const linkFollow = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
            <button
                type="button"
                className="btn btn-sm btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#view_user"
                onClick={() => handleUserView(row)}
            >
            View
            </button>
            </div>
        );
    };

    const handleUserView = (row) => {
        setViewUser(row)
    }

    const columns = [

        // { dataField: '_id', text: 'User ID' },
        // { dataField: 'firstName', text: 'First Name', sort: true},
        // { dataField: 'lastName', text: 'Last Name', sort: true},
        { dataField: 'name', text: 'Coaching/Teacher Name', sort: true},
        { dataField: 'emailId', text: 'Email', sort: true },
        { dataField: 'mobileNumber', text: 'Mobile Number', sort: true },
        { dataField: 'state', text: 'state', sort: true },

        // { dataField: 'pMode', text: 'Preperation Mode', sort: true, },
      //   { dataField: 'createdAt', text: 'Registration Date', sort: true, formatter: dateFilter },
      //   { dataField: 'status', text: 'Kyc Status', sort: true, formatter: statuslinkFollow },
        // { dataField: 'Action', text: 'User Ip'},
      //   { dataField: 'client_ip', text: 'Device Id'},
        { dataField: 'Action', text: 'Action', formatter: linkFollow },

    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
    });


    useEffect(() => {
      getuserslist()
    }, []);

    const getuserslist = async() => {
      let result = await getUserDataService()
      console.log("resultresult",result)
      if(result.status){
         setExportData(result?.data)
      }

    }

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "dateFrom":
                setDateFrom(event.target.value);
                break;
            case "dateTo":
                setDateTo(event.target.value);
                break;
            default:
        }
    }
    return (
        activeScreen === 'userdetail' ?
            <div id="layoutSidenav_content">
                <main>
                    <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container-xl px-4">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i className="fa fa-wave-square" ></i></div>
                                            Users List
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="filter_bar" >
                            <form className="row" >
                                <div class="mb-3 col ">
                                    <input type="date" class="form-control form-control-solid" data-provide="datepicker" id="litepickerRangePlugin" name="dateFrom" value={dateFrom} onChange={handleInputChange} />
                                </div>
                                <div class="mb-3 col ">
                                    <input type="date" class="form-control form-control-solid" data-provide="datepicker" id="litepickerRangePlugin" name="dateTo" value={dateTo} onChange={handleInputChange} />
                                </div>
                                <div class="mb-3 col ">
                                    <div className="row" >
                                        {/* <div className="col" >
                                            <button class="btn btn-indigo btn-block w-100" type="button" onClick={() => handleExportData(dateFrom, dateTo)} disabled={!dateFrom || !dateTo}>Search</button>
                                        </div> */}
                                        <div className="col" >
                                            {/* <button className="btn btn-indigo btn-block w-100" type="button" onClick={handleData}>Reset</button> */}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card mb-4">
                            <div className="card-header">Users Details
                                <div className="dropdown">
                                    <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-download me-3"></i> Export</button>
                                    <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                        <CSVLink data={exportData} className="dropdown-item">Export as CSV</CSVLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <ToolkitProvider
                                        hover
                                        bootstrap4
                                        keyField='_id'
                                        columns={columns}
                                        data={exportData}
                                        exportCSV
                                        search>
                                        {
                                            props => (
                                                <React.Fragment>

                                                    <SearchBar {...props.searchProps} />
                                                    <BootstrapTable
                                                        hover
                                                        bootstrap4
                                                        keyField='_id'
                                                        columns={columns}
                                                        data={exportData}
                                                        pagination={pagination}
                                                        filter={filterFactory()}
                                                        {...props.baseProps}
                                                    />
                                                </React.Fragment>
                                            )
                                        }
                                    </ToolkitProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <ViewUser user={viewUser}/>
            </div>
            :
            <></>
            // <TraderDetails userId={userId} />
    )
}

export default Users;