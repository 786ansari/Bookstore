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
import { CategoryAdd, CategoryDelete, CategoryListGet, CategoryUpdate, PosterDelete, PosterStatusChange, deletePromotionAndOfferDetails, getPosterList, getPromotionAndOfferDetails } from "../../../services/book.service";
import toast, { Toaster } from 'react-hot-toast';
import { HotToaster } from "../../../utils/Toaster"
import hasEmptyValue from "../../../validations/Category";
import { imageUrl } from "../../../services/dataurl";
import AddPoster from "../../../models/AddPoster";
import UpdatePoster from "../../../models/UpdatePoster";
import Switch from "react-switch";
import { ResultFunction } from "../../../comman/resultFunction";
import AddPromotionOffer from "../../../models/AddPromotionOffer";
import UpdatePromotionOffer from "../../../models/UpdatePromotionOffer";


const PromotionAndOffer = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [promotionDataForUpdate, setPromotionDataForUpdate] = useState({});
  const [promotionAndOffer,setPromotionAndOffer] = useState([])
  const [categoryList,setCategoryList] = useState([])
  const [categoryId,setCategoryId] = useState("")
  const { SearchBar } = Search;
  useEffect(()=>{
    PromotionAndOfferList()
    CategoryList()
  },[])
  const CategoryList = async() => {
    let result = await CategoryListGet()
    if(result.status){
      setCategoryList(result.data)
    }

  }
  const PromotionAndOfferList = async() => {
    let result = await getPromotionAndOfferDetails()
    if(result.status){
      setPromotionAndOffer(result.data)
    }

  }

  const handlesetPromotionAndOfferChange = async(row) => {
    setPromotionDataForUpdate(row)
    // setCategoryName(row.categoryName)
  }

  const handlesetPromotionAndOfferDelete = async(row) => {
    let data = {
      id:row._id
    }
    let result  = await deletePromotionAndOfferDetails(data)
    ResultFunction(result,PromotionAndOfferList)

  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-sm btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#edit_promotion"
          onClick={() => handlesetPromotionAndOfferChange(row)}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_category"
          onClick={() => handlesetPromotionAndOfferDelete(row)}
        >
          Delete
        </button>
      </div>
    );
  };

  function imageFormatter(cell,row) {
    console.log("firstdataf",row)
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
  function categoryFollow(cell,row){
    return(
        <>
        {row?.categoryData[0]?.categoryName}
        </>
    )

  }

  const handleChecked = async(e,row) => {
    let data = {
      id:row._id,
      isActive:e
    }
    let result = await PosterStatusChange(data)
    ResultFunction(result,PromotionAndOfferList)


  }
  const isActiveFormatter = (cell, row) => {

    return(
      <Switch onChange={(e)=>handleChecked(e,row)} id="isActive" checked={row?.isActive}/>
    )
  }


  const columns = [
    { dataField: "id", text: "id",formatter: (cell, row,rowIndex) => `${rowIndex+1}` },
    { dataField: "categoryName", text: "Category Name",formatter: categoryFollow },
    { dataField: "icon", text: "Promotion Image",formatter: imageFormatter },
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
                      Promotion And Offer Management
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
                      Promotion And Offer Details
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
                        <CSVLink class="dropdown-item" data={promotionAndOffer}>
                          Expoprt as CSV
                        </CSVLink>
                      </div>
                      <button
                     type="button"
                     className="btn btn-sm btn-dark"
                     data-bs-toggle="modal"
                     data-bs-target="#add_promotion"
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
                            data={promotionAndOffer}
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
                                  data={promotionAndOffer}
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
      <AddPromotionOffer categoryList={categoryList} getData={PromotionAndOfferList} length={promotionAndOffer.length} />
      <UpdatePromotionOffer promotionData = {promotionDataForUpdate} getData={PromotionAndOfferList} length={promotionAndOffer.length} />
      {/* Currency Pair modal data */}
    </>
  );
};

export default PromotionAndOffer;
