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
import { ResultFunction } from "../../../comman/resultFunction";
import UpdateSocialMedia from "../../../models/UpdateSocialMedia";
import AddSocialMedia from "../../../models/AddSocialMedia";
import { deleteSocialMediaurlById, getSocialMediaurl } from "../../../services/socialmedia.service";


const SocialMedia = (props) => {
  const [socialMediaInfo,setSocialMediaInfo] = useState([])
  const [socialMediaEdit,setSocialMediaEdit] = useState([])

  const { SearchBar } = Search;
  useEffect(()=>{
    // NewsLists()
    socialMediaInformation()
  },[])
  const socialMediaInformation = async() => {
    let result = await getSocialMediaurl()
    if(result.status){
        setSocialMediaInfo(result.data)
    }
  }

  const handleSocialMediaEdit = async(row) => {
    console.log("linkvfoellele",row)
    setSocialMediaEdit(row)
    // setNewsDataForUpdate(row)
  }

  const handleSocialMediaDelete = async(row) => {
    let data = {
      id:row._id
    }
    let result  = await deleteSocialMediaurlById(data)
    ResultFunction(result,socialMediaInformation)

  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_socialmedia"
          onClick={() => handleSocialMediaEdit(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleSocialMediaDelete(row)}
        >
          Delete
        </button>
      </div>
    );
  };

  function linkFollowMobile(cell,row){
    console.log("linkFollowMobile===>>>",row)
    return(
        <>
        {row?.mobileNumber.map((mobile,i)=>{
          return mobile+","
        })}
        </>
    )

  }


  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "facebook", text: "Facebook",sort: true },
    { dataField: "instagram", text: "Instagram", sort: true},
    { dataField: "whatsapp", text: "Whatsapp", sort: true},
    { dataField: "linkedin", text: "Linkedin", sort: true },
    { dataField: "youtube", text: "Youtube", sort: true },
    { dataField: "telegram", text: "Telegram", sort: true },
    { dataField: "twitter", text: "Twitter", sort: true },
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
                        <CSVLink class="dropdown-item" data={socialMediaInfo}>
                          Export as CSV
                        </CSVLink>
                      </div>
                      <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_socialmedia"
                    >Add</button>
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
                            data={socialMediaInfo}
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
                                  data={socialMediaInfo}
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
      <AddSocialMedia getData={socialMediaInformation}/>
       <UpdateSocialMedia socialmedia={socialMediaEdit} getData={socialMediaInformation} />
        {/* <AddNews allNews={NewsLists}/>
        <UpdateNews news = {NewsDataForUpdate} allNews={NewsLists}/> */}
    </>
  );
};

export default SocialMedia;
