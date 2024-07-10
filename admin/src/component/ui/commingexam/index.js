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
import { CategoryAdd, CategoryDelete, CategoryListGet, CategoryUpdate } from "../../../services/book.service";
import toast, { Toaster } from 'react-hot-toast';
import { HotToaster } from "../../../utils/Toaster"
import hasEmptyValue from "../../../validations/Category";
import UpdateCategory from "../../../models/UpdateCategory";
import { ResultFunction } from "../../../comman/resultFunction";
import AddCategory from "../../../models/AddCategory";


const Category = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDataForUpdate, setCategoryDataForUpdate] = useState([]);
  const [categoryList,setCategoryList] = useState([])
  const { SearchBar } = Search;
  // const selector = useSelector(state=>state)
  // const dispatch = useDispatch()
  // useEffect(()=>{
    
  //   console.log("categoryAddedByUser",selector.book.CATEGORYGET,props)
  //   if(selector && selector.book &&  selector.book.CATEGORYGET && selector.book.CATEGORYGET.data){
  //     setCategoryList(selector.book.CATEGORYGET.data)
  //   }
  // },[selector.book])
  useEffect(()=>{
    CategoryList()
  },[])
  const CategoryList = async() => {
    let result = await CategoryListGet()
    if(result.status){
      setCategoryList(result.data)
    }

  }

  const handleCategoryEdit = async(row) => {
    console.log("linkvfoellele",row)
    setCategoryDataForUpdate(row)
    setCategoryName(row.categoryName)
  }

  const handleCurrencyDelete = async(row) => {
    let data = {
      id:row._id
    }
    let result  = await CategoryDelete(data)
    ResultFunction(result,CategoryList,setCategoryName)

  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_category"
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

  function imageFormatter(dataField) {
    console.log("firstdataf",dataField)
    return (
      <>
        <img
          style={{ width: "50%",height:"50%" }}
          src={dataField}
          alt="icon"
        />
      </>
    );
  }

  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "categoryName", text: "Category Name", },
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
  const handleCategoryAdd = async() => {
    let validation = hasEmptyValue("category",categoryName)
   
    if(validation !== undefined ){
      HotToaster(false,validation)
      return false
    }
    let data = {
      categoryName:categoryName
    }
    let result = await CategoryAdd(data)
    console.log("resultresult",result)
    ResultFunction(result,CategoryList,setCategoryName)
  }

  const resultfunction = (result) => {
    if(result.status){
      HotToaster(result.status,result.message)
      CategoryList()
      setCategoryName("")
    }
    else{
      HotToaster(result.status,result.message)
      setCategoryName("")
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
                      Category Management
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
                      <h5 className="mb-0">Add Category</h5>
                    </div>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Category Name"
                        name="categoryName"
                        value={categoryName}
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
                          handleCategoryAdd(
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
                    Category Details
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
                        <CSVLink class="dropdown-item" data={categoryList}>
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
                            data={categoryList}
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
                                  data={categoryList}
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
      <UpdateCategory data={categoryDataForUpdate} categoryList={CategoryList}/>
      <AddCategory categoryList={CategoryList} />
     
      {/* Currency Pair modal data */}
    </>
  );
};

export default Category;
