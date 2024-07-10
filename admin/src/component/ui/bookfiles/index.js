import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
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
import { BookFilesDelete, CategoryListGet, getBookFiles, getBookList } from "../../../services/book.service";
import toast, { Toaster } from 'react-hot-toast';
import { ResultFunction } from "../../../comman/resultFunction";
import UpdateTestSeries from "../../../models/UpdateTestSeries";
import { testSeriesGet,testSeriesDelete } from "../../../services/testseries.service";
import AddTestSeries from "../../../models/AddTestSeries";
import moment from 'moment';
import AddBookFiles from "../../../models/AddbookFiles";
import UpdateBookFiles from "../../../models/UpdateBookFIles";

const BookFiles = (props) => {
  const [bookFilesUpdate, setBookFilesUpdate] = useState([]);
  const [bookFiles,setBookFiles] = useState([])
  const [bookList, setBookList] = useState([])
  const { SearchBar } = Search;
  
  useEffect(()=>{
    BookFilesList()
    BooksList()
  },[])
  const BooksList = async() => {
    let result = await getBookList()
    if(result.status && result.data.length>0){
        setBookList(result.data)
    }
  }
   const BookFilesList = async() => {
    let result = await getBookFiles()
    if(result.status && result.data.length>0){
        setBookFiles(result.data)
    }
  }

  const handleBookFilesEdit = async(row) => {
    setBookFilesUpdate(row)
  }

  const handleCurrencyDelete = async(row) => {
    let data = {
      id:row._id
    }
    let result  = await BookFilesDelete(data)
    ResultFunction(result,BookFilesList,setBookFiles)

  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_bookFiles"
          onClick={() => handleBookFilesEdit(row)}
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

  const bookFollow = (cell, row, rowIndex, formatExtraData) => {
    console.log("fsfdfdsfsdsfsd",row);
    return <>{row.booksData.length>0 && row.booksData[0].bookName}
    </>

 }
 const dateFormatter = (cell, row, rowIndex, formatExtraData) => {
  console.log("sdbfjhdfgjfgsd",row)

  // let date = moment(row.createdAt).format("DD-MM-YYYY");
        return  moment(row.createdAt).format("DD-MM-YYYY");
        
 }
  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "bookName", text: "Book Name",formatter: bookFollow },
    { dataField: "chapter", text: "Chapter", },
    { dataField: "fileType", text: "File Type", },
    { dataField: "file", text: "File", },
    { dataField: "createdAt", text: "Date", formatter:dateFormatter},
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
                      Book Files Management
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
                    Book Files 
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
                        <CSVLink class="dropdown-item" data={bookFiles}>
                          Export as CSV
                        </CSVLink>
                      </div>
                      <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_bookFiles"
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
                            data={bookFiles}
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
                                  data={bookFiles}
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
      <AddBookFiles bookFiles={BookFilesList} bookList={bookList} />
      <UpdateBookFiles data={bookFilesUpdate} bookFiles={BookFilesList} />
     
      {/* Currency Pair modal data */}
    </>
  );
};

export default BookFiles;
