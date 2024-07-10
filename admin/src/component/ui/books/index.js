import React, { useState, useEffect, useContext } from "react";
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
import { BookDelete, BookStatusChange, CategoryAdd, CategoryDelete, CategoryListGet, CategoryUpdate, getBookList } from "../../../services/book.service";
import toast, { Toaster } from 'react-hot-toast';
import { HotToaster } from "../../../utils/Toaster"
import hasEmptyValue from "../../../validations/Category";
import { imageUrl } from "../../../services/dataurl";
import AddBookDetails from "../../../models/AddBookDetails";
import UpdateBookDetails from "../../../models/updateBookDetails";
import BookView from "../../../models/BookView";
import { ResultFunction } from "../../../comman/resultFunction";
import Switch from "react-switch";
import { logoutContext } from "../../../context/logout";
import {ProfileContext} from "../contextProvider/index.js"


const Books = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [bookIdForUpdate, setBookForUpdate] = useState({});
  const [bookList,setBookList] = useState([])
  const { SearchBar } = Search;
  const { isLogout, setIsLogout } = useContext(logoutContext)
  const [profileState] = useContext(ProfileContext);
  useEffect(()=>{
    console.log("ProfileContext",profileState)
    CategoryList()
  },[])
  const CategoryList = async() => {
    let result = await getBookList()

    if(result.status && result.data.length>0){
        setBookList(result.data)
    }
    if(!result?.status && result.message == "Unauthorized"){
      setIsLogout(true)
    }
  }

  const handleBookDetailsEdit = async(row) => {
    console.log("linkvfoellele",row)
    setBookForUpdate(row)
    // setCategoryName(row.categoryName)
  }

  const handleBookDetailsDelete = async(row) => {
    let data = {
      id:row._id
    }
    let result  = await BookDelete(data)
    resultfunction(result)

  }

  const actionFormattor = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#update_books"
          onClick={() => handleBookDetailsEdit(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handleBookDetailsDelete(row)}
        >
          Delete
        </button>
        <button 
        type="button" 
        class="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target="#book_views"
        onClick={() => handleBookDetailsEdit(row)}>
  View
</button>
      </div>
    );
  };

  function imageFormatter(cell,row) {
    console.log("firstdataf",cell,row)
    return (
      <>
        <img
          style={{ width: "50%",height:"50%" }}
          src={imageUrl+row.bookIcon}
          alt="icon"
        />
      </>
    );
  }
  function categoryNameFormatter(cell,row) {
    console.log("firstdataf",row)
    return (
      <>
        {row?.categoryData[0]?.categoryName}
      </>
    );
  }
  const handleChecked = async(e,row) => {
    let data = {
      id:row._id,
      isActive:e
    }
    let result = await BookStatusChange(data)
    ResultFunction(result,CategoryList)


  }
  const isActiveFormatter = (cell, row) => {

    return(
      <Switch onChange={(e)=>handleChecked(e,row)} id="isActive" checked={row?.isActive}/>
    )
  }

  const columns = [
    { dataField: "_id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "itemType", text: "Item Type"},
    { dataField: "categoryName", text: "Category Name", formatter: categoryNameFormatter },
    { dataField: "bookName", text: "Book Name", },
    { dataField: "bookCode", text: "Book Code", sort: true },
    { dataField: "author", text: "Author", sort: true },
    { dataField: "MRP", text: "MRP price", sort: true },
    { dataField: "sellingPrice", text: "Selling Price", sort: true },
    ...(profileState?.role === "admin"
    ? [{ dataField: "isActive", text: "isActive", formatter: isActiveFormatter }]
    : []),
    { dataField: "actions", text: "Action", formatter: actionFormattor },
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
  // const handleCategoryAdd = async() => {
  //   let validation = hasEmptyValue("category",categoryName)
   
  //   if(validation !== undefined ){
  //     HotToaster(false,validation)
  //     return false
  //   }
  //   let data = {
  //     categoryName:categoryName
  //   }
  //   let result = await CategoryAdd(data)
  //   console.log("resultresult",result)
  //   resultfunction(result)
  // }
  // const handleCategoryUpdate = async() => {
  //   let validation = hasEmptyValue("category",categoryName)
   
  //   if(validation !== undefined ){
  //     HotToaster(false,validation)
  //     return false
  //   }
  //   let data = {
  //     id:categoryIdForUpdate,
  //     categoryName:categoryName
  //   }

  //   let result = await CategoryUpdate(data)
  //   resultfunction(result)

  // }
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
                      Book Management
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
                    Book Details
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
                        <CSVLink class="dropdown-item" data={bookList}>
                          Expoprt as CSV
                        </CSVLink>
                      </div>
                    <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_books"
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
                            data={bookList}
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
                                  data={bookList}
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
      <AddBookDetails/>
      <UpdateBookDetails bookDetails={bookIdForUpdate} />
      <BookView bookDetails={bookIdForUpdate}/>
      {/* Currency Pair modal data */}
      
    </>
  );
};

export default Books;
