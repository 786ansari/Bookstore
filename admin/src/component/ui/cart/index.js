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
import { CategoryAdd, CategoryDelete, CategoryListGet, CategoryUpdate, GetAllReviews, PosterDelete, PosterStatusChange, changeReviewStatus, getCartDetails, getPosterList } from "../../../services/book.service";
import toast, { Toaster } from 'react-hot-toast';
import { HotToaster } from "../../../utils/Toaster"
import hasEmptyValue from "../../../validations/Category";
import { imageUrl } from "../../../services/dataurl";
import AddPoster from "../../../models/AddPoster";
import UpdatePoster from "../../../models/UpdatePoster";
import Switch from "react-switch";
import { ResultFunction } from "../../../comman/resultFunction";


const Cart = (props) => {
  const [cartList,setCartList] = useState([])
  const { SearchBar } = Search;
  useEffect(()=>{
    getCart()
  },[])
  const getCart = async() => {
    let result = await getCartDetails()
    if(result.status && result.data.length>0){
        setCartList(result.data)
    }

  }

  const handlePosterChange = async(row) => {
  }

  const handleCurrencyDelete = async(row) => {
  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_poster"
          onClick={() => handlePosterChange(row)}
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
          src={imageUrl+row.posterIcon}
          alt="icon"
        />
      </>
    );
  }
  function booksFollow(cell,row){
    console.log("booksFollow===>>>",cell,row)
    return(
        <>
        {row?.bookdata[0]?.bookName}
        </>
    )

  }

  const handleChecked = async(e,row) => {
    let data = {
        id:row._id,
        isActive:e
      }
      let result = await changeReviewStatus(data)
      ResultFunction(result,getCart)
  }
  const isActiveFormatter = (cell, row) => {

    return(
      <Switch onChange={(e)=>handleChecked(e,row)} id="isActive" checked={row?.isActive}/>
    )
  }


  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
     { dataField: "systemIp", text: "System Ip", sort: true },
    //   { dataField: "email", text: "emailId", sort: true },
    { dataField: "bookName", text: "Book Name",formatter: booksFollow },
    // { dataField: "posterIcon", text: "poster Image",formatter: imageFormatter },
    // { dataField: "isActive", text: "isActive", formatter: isActiveFormatter},
    // { dataField: "maker_fee", text: "Maker Fee", sort: true },
    // { dataField: "taker_fee", text: "Taker Fee", sort: true },
    // { dataField: "price", text: "Amount", sort: true },
    // { dataField: "Action", text: "Action", formatter: isActiveFormatter },
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
                      Cart Management
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="row">
              {/* <div className="col-xl-4">
                <div class="card mb-4">
                  <div className="card-body d-flex justify-content-center flex-column p-4 ">
                    <div className="d-flex align-items-center justify-content-start mb-3 ">
                      <h5 className="mb-0">Add Poster</h5>
                    </div>
                    <div className="form-group mb-3">
                        <select 
                        className="form-control"
                        onChange={(e)=>{setCategoryId(e.target.value)}}
                        >
                            <option value="">Select</option>
                            {categoryList.length>0 &&
                            categoryList.map((category,i)=>{
                                return <option value={category._id}>{category.categoryName}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="file"
                        placeholder="poster image"
                        name="poster"
                        onChange={(e)=>{
                           setCategoryName(e.target.value)
                        }}
                      />
                    </div>
                    <div className="form-group ">
                      <button
                        className="btn btn-s btn-indigo w-100"
                        type="button"
                        onClick={() =>
                          handlePosterAdd(
                           categoryName
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-xl-12">
                <div class="card">
                  <div class="card-header">
                    Cart Details
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
                        <CSVLink class="dropdown-item" data={cartList}>
                          Expoprt as CSV
                        </CSVLink>
                      </div>
                      <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_poster"
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
                            data={cartList}
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
                                  data={cartList}
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
    </>
  );
};

export default Cart;
