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
import { getPermotionPopupData, removePermotionPopupData } from "../../../services/permotionpopup.service";
import toast, { Toaster } from 'react-hot-toast';
import UpdatePermotionPopup from "../../../models/UpdatePermotionPopup";
import { ResultFunction } from "../../../comman/resultFunction";
import AddPermotionPopup from "../../../models/AddPermotionPopup";
import { imageUrl } from "../../../services/dataurl";

const PermotionPopup = () => {
  const [dataForUpdate, setDataForUpdate] = useState([]);
  const [List,setList] = useState([])
  const { SearchBar } = Search;
  useEffect(()=>{
    getData()
  },[])
  const getData = async() => {
    let result = await getPermotionPopupData()
    if(result.status && result.data.length>0){
        setList(result.data)
    }
  }

  const handleCategoryEdit = async(row) => {
    console.log("linkvfoellele",row)
    setDataForUpdate(row)
  }

  const handleCurrencyDelete = async(row) => {
    let data = {
      _id:row._id
    }
    let result  = await removePermotionPopupData(data)
    ResultFunction(result,getData)

  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_popup"
          onClick={() => handleCategoryEdit(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleCurrencyDelete(row)}
        >
          Delete
        </button>
      </div>
    );
  };

  function imageFormatter(cell,row) {
    console.log("firstdataf",)
    return (
      <>
        <img
          style={{ width: "50%",height:"50%" }}
          src={imageUrl+row.modalIcon}
          alt="icon"
        />
      </>
    );
  }

  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "link", text: "URL", },
    { dataField: "modalIcon", text: "Icon",formatter: imageFormatter },
    // { dataField: "isActive", text: "isActive", formatter: isActiveFormatter},
    // { dataField: "taker_fee", text: "Taker Fee", sort: true },
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
                      Permotion Popup Management
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
                  Permotion Popup Details
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
                        <CSVLink class="dropdown-item" data={List}>
                          Export as CSV
                        </CSVLink>
                      </div>
                     {List.length === 0 &&  <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_popup"
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
                            data={List}
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
                                  data={List}
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

      {/* Currency Pair modal data */}
      <UpdatePermotionPopup data={dataForUpdate} get={getData}/>
      <AddPermotionPopup get={getData} />
     
      {/* Currency Pair modal data */}
    </>
  );
};

export default PermotionPopup;
