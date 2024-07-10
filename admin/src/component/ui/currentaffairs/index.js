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
import { useDispatch, useSelector } from 'react-redux';
import { Addcategory,GetCategory } from "../../../actions/book.action";
import { CategoryAdd, CategoryDelete, CategoryListGet, CategoryStatusChange, CategoryUpdate } from "../../../services/book.service";
import toast, { Toaster } from 'react-hot-toast';
import { HotToaster } from "../../../utils/Toaster"
import hasEmptyValue from "../../../validations/Category";
import { ResultFunction } from "../../../comman/resultFunction";
import UpdateCurrentAffairs from "../../../models/updateCurrentAffairs";
import { currentAffairsFileDelete, currentAffairsFileGet } from "../../../services/currentAffairs.service";
import AddCurrentAffairs from "../../../models/AddCurrentAffairs";
import moment from 'moment';

const CurrentAffairs = (props) => {
  const [currentAffiarsUpdate, setcurrentAffiarsUpdate] = useState([]);
  const [currentAffairs,setcurrentAffairs] = useState([])
  const { SearchBar } = Search;
  
  useEffect(()=>{
    CurrentAffairsList()
  },[])
  const CurrentAffairsList = async() => {
    let result = await currentAffairsFileGet()
    console.log("resultresult",result)
    if(result.status && result.data.length>0){
      setcurrentAffairs(result.data)
    }
  }

  const handleCurrentAffairsEdit = async(row) => {
    setcurrentAffiarsUpdate(row)
  }

  const handleCurrencyDelete = async(row) => {
    let data = {
      id:row._id
    }
    let result  = await currentAffairsFileDelete(data)
    ResultFunction(result,CurrentAffairsList,setcurrentAffairs)

  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_currentAffairs"
          onClick={() => handleCurrentAffairsEdit(row)}
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
  const dateFormatter = (cell, row, rowIndex, formatExtraData) => {
    return  moment(row.createdAt).format("DD-MM-YYYY");   
}

  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "type", text: "Type", },
    { dataField: "fileType", text: "File Type", },
    { dataField: "plan", text: "Plan", },
    { dataField: "range", text: "Range", },
    { dataField: "file", text: "File", },
    { dataField: "createdAt", text: "Date", formatter:dateFormatter},
    // { dataField: "pptPdf", text: "Ppt Pdf File", },
    // { dataField: "editableFile", text: "Editable File", },
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
                      Current Affairs Management
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
                    Current Affairs 
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
                        <CSVLink class="dropdown-item" data={currentAffairs}>
                          Export as CSV
                        </CSVLink>
                      </div>
                      <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_category"
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
                            data={currentAffairs}
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
                                  data={currentAffairs}
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
      <UpdateCurrentAffairs data={currentAffiarsUpdate} currentAffairs={CurrentAffairsList} />
      <AddCurrentAffairs currentAffairs={CurrentAffairsList} />
     
      {/* Currency Pair modal data */}
    </>
  );
};

export default CurrentAffairs;
