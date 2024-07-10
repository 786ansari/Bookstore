import React, { useState, useEffect } from "react";
// import {
//   alertErrorMessage,
//   alertSuccessMessage,
// } from "../../../customComponent/CustomAlertMessage";
// import AuthService from "../../../api/services/AuthService";
import { CSVLink } from "react-csv";
import { $ } from "react-jquery-plugin";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import toast, { Toaster } from 'react-hot-toast';
import AddAdminInfo from "../../../models/AddAdminInfo";
import { getAdminInformation } from "../../../services/admin.service";
import UpdateAdminInfo from "../../../models/UpdateAdminInfo";


const AdminInfo = (props) => {
  const [adminInfo,setAdminInfo] = useState([])
  const [adminInfoEdit,setAdminInfoEdit] = useState([])

  const { SearchBar } = Search;
  useEffect(()=>{
    // NewsLists()
    adminInformation()
  },[])
  const adminInformation = async() => {
    let result = await getAdminInformation()
    if(result.status){
      setAdminInfo(result.data)
    }
  }

  const handleAdminInfoEdit = async(row) => {
    console.log("linkvfoellele",row)
    setAdminInfoEdit(row)
    // setNewsDataForUpdate(row)
  }


  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#update_admininfo"
          onClick={() => handleAdminInfoEdit(row)}
        >
          Update
        </button>
        {/* <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleAdminInfoDelete(row)}
        >
          Delete
        </button> */}
      </div>
    );
  };

  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "emailId", text: "Email Address", },
    { dataField: "mobileNumber", text: "Mobile Number", sort: true },
    { dataField: "whatsAppNumber", text: "Whats App Number", sort: true },
    { dataField: "address", text: "Address", sort: true },
    // { dataField: "price", text: "Amount", sort: true },
    { dataField: "Action", text: "Action", formatter: linkFollow },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });
  
  

  
  return (
    <>
      <div id="layoutSidenav_content">
        <Toaster/>
        <main>
          <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
              <div className="page-header-content pt-4">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mt-4">
                    <h1 className="page-header-title">
                      <div className="page-header-icon">
                        <i className="fa fa-prescription"></i>
                      </div>
                      Admin Information Management
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="row">
              <div className="col-xl-12">
                <div class="card">
                  <div class="card-header">
                  Admin Information Details
                    <div class="dropdown">
                      <button
                        class="btn btn-dark btn-sm dropdown-toggle"
                        id="dropdownFadeInUp"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Export
                      </button>
                      <div
                        class="dropdown-menu animated--fade-in-up"
                        aria-labelledby="dropdownFadeInUp"
                      >
                        {/* <a class="dropdown-item" href="#!">Expoprt as CSV</a> */}
                        <CSVLink class="dropdown-item" data={adminInfo}>
                          Export as CSV
                        </CSVLink>
                      </div>
                    {adminInfo?.length === 0 && <button
                    type="button"
                    className="btn btn-sm btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#add_admininfo"
                  >Add</button>}
                    </div>
                  </div>
                  <div className="card-body">
                    <form className="row">
                      <div className="col-12">
                        <div class="table-responsive">
                          <ToolkitProvider
                            hover
                            bootstrap4
                            keyField="_id"
                            columns={columns}
                            data={adminInfo}
                            search={{
                              afterSearch: (newResult) =>
                                console.log(newResult),
                            }}
                          >
                            {(props) => (
                              <React.Fragment>
                                <SearchBar {...props.searchProps} />
                                <BootstrapTable
                                  hover
                                  bootstrap4
                                  keyField="_id"
                                  columns={columns}
                                  data={adminInfo}
                                  pagination={pagination}
                                  filter={filterFactory()}
                                  {...props.baseProps}
                                />
                              </React.Fragment>
                            )}
                          </ToolkitProvider>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
        <AddAdminInfo getData = {adminInformation}/>
        <UpdateAdminInfo admindata={adminInfoEdit} getData = {adminInformation} />
        {/* <AddNews allNews={NewsLists}/>
        <UpdateNews news = {NewsDataForUpdate} allNews={NewsLists}/> */}
    </>
  );
};

export default AdminInfo;
