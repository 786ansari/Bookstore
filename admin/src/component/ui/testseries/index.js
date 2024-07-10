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
import { CategoryListGet } from "../../../services/book.service";
import toast, { Toaster } from 'react-hot-toast';
import { ResultFunction } from "../../../comman/resultFunction";
import UpdateTestSeries from "../../../models/UpdateTestSeries";
import { testSeriesGet,testSeriesDelete } from "../../../services/testseries.service";
import AddTestSeries from "../../../models/AddTestSeries";
import moment from 'moment';

const TestSeries = (props) => {
  const [testSeriesUpdate, setTestSeriesUpdate] = useState([]);
  const [testSeries,setTestSeries] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const { SearchBar } = Search;
  
  useEffect(()=>{
    TestSeriesList()
    CategoryList()
  },[])
  const CategoryList = async() => {
    let result = await CategoryListGet()
    if(result.status && result.data.length>0){
      setCategoryList(result.data)
    }
  }
   const TestSeriesList = async() => {
    let result = await testSeriesGet()
    if(result.status && result.data.length>0){
        setTestSeries(result.data)
    }
  }

  const handleTestSeriesEdit = async(row) => {
    setTestSeriesUpdate(row)
  }

  const handleCurrencyDelete = async(row) => {
    let data = {
      id:row._id
    }
    let result  = await testSeriesDelete(data)
    ResultFunction(result,TestSeriesList,setTestSeries)

  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_testSeries"
          onClick={() => handleTestSeriesEdit(row)}
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

  const categoryFollow = (cell, row, rowIndex, formatExtraData) => {
    return <>{row.categoryData.length>0 && row.categoryData[0].categoryName}
    </>

 }
 const dateFormatter = (cell, row, rowIndex, formatExtraData) => {
        return  moment(row.createdAt).format("DD-MM-YYYY");   
 }
  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "categoryName", text: "Category Name",formatter: categoryFollow },
    { dataField: "subject", text: "Subject/Topic", },
    { dataField: "fileType", text: "File Type", },
    { dataField: "plan", text: "Plan", },
    { dataField: "releaseDate", text: "Release Date", },
    { dataField: "file", text: "File", },
    { dataField: "createdAt", text: "Date", formatter:dateFormatter},
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
                      Tests Series Management
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
                    Test Series 
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
                        <CSVLink class="dropdown-item" data={testSeries}>
                          Export as CSV
                        </CSVLink>
                      </div>
                      <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_testseries"
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
                            data={testSeries}
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
                                  data={testSeries}
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
      <AddTestSeries testSeries={TestSeriesList} categoryList={categoryList} />
      <UpdateTestSeries data={testSeriesUpdate} testSeries={TestSeriesList} />
     
      {/* Currency Pair modal data */}
    </>
  );
};

export default TestSeries;
