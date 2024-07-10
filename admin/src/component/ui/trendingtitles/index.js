import React, { useState, useEffect } from "react";
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
import { PosterStatusChange, getTrandingTitleImagesData, titleImageDeleteById } from "../../../services/book.service";
import toast, { Toaster } from 'react-hot-toast';
import { HotToaster } from "../../../utils/Toaster"
import { imageUrl } from "../../../services/dataurl";
import Switch from "react-switch";
import { ResultFunction } from "../../../comman/resultFunction";
import AddTrendingTitles from "../../../models/AddTrendingTitles";
import UpdateTrendingTitles from "../../../models/UpdateTrendingTitles";


const TrendingTitles = (props) => {
  const [dataForUpdate, setDataForUpdate] = useState({});
  const [titleList,setTitleList] = useState([])
  const { SearchBar } = Search;
  useEffect(()=>{
    getTitle()
  },[])
  const getTitle = async() => {
    let result = await getTrandingTitleImagesData()
    if(result.status){
      setTitleList(result.data)
    }

  }

  const handleTitleChange = async(row) => {
    setDataForUpdate(row)
  }

  const handleDataDelete = async(row) => {
    let data = {
      id:row._id
    }
    let result  = await titleImageDeleteById(data)
    resultfunction(result)
    getTitle()

  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_title"
          onClick={() => handleTitleChange(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleDataDelete(row)}
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
          src={imageUrl+row.icon}
          alt="icon"
        />
      </>
    );
  }

  const handleChecked = async(e,row) => {
    let data = {
      id:row._id,
      isActive:e
    }
    let result = await PosterStatusChange(data)
    ResultFunction(result,getTitle)
  }
  const isActiveFormatter = (cell, row) => {
    return(
      <Switch onChange={(e)=>handleChecked(e,row)} id="isActive" checked={row?.isActive}/>
    )
  }


  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "title", text: "Title"},
    { dataField: "titleIcon", text: "Title Image",formatter: imageFormatter },
    // { dataField: "isActive", text: "isActive", formatter: isActiveFormatter},
    // { dataField: "maker_fee", text: "Maker Fee", sort: true },
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

  const resultfunction = (result) => {
    if(result.status){
      HotToaster(result.status,result.message)
    }
    else{
      HotToaster(result.status,result.message)
    }
  }

  
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
                      Title Management
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
                    Title Details
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
                        <CSVLink class="dropdown-item" data={titleList}>
                          Expoprt as CSV
                        </CSVLink>
                      </div>
                      <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_trending-titles"
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
                            data={titleList}
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
                                  data={titleList}
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
      <AddTrendingTitles apiRecall = {getTitle}/>
      <UpdateTrendingTitles data={dataForUpdate} apiRecall = {getTitle}/>
      {/* Currency Pair modal data */}
    </>
  );
};

export default TrendingTitles;
