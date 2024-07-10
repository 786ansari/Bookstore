import { useEffect, useState } from "react"
import { BookAdd, BookUpdate, CategoryListGet } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"
import { imageUrl } from "../services/dataurl"

const BookView =  (props) => {
    const[_id,setId] = useState("")
    const[bookName,setBookName] = useState("")
    const[bookIcon,setBookIcon] = useState("")
    const[MRP,setMRP] = useState("")
    const[ISBN,setISBN] = useState("")
    const[author,setAuthor] = useState("")
    const[bookCode,setBookCode] = useState("")
    const[type,setType] = useState("")
    const[language,setLanguage] = useState("")
    const[sellingPrice,setSellingPrice] = useState("")
    const[categoryId,setCategoryId] = useState("")
    const[catogaryList,setCatogaryList] = useState([])
    const [bookType,setBookType] = useState(["NEW ARRIVALS","BEST SELLERS","UPCOMING EXAM BOOKS"])
    const [encodedImage,setEncodedImage] = useState("")
    useEffect(()=>{
      // getCategoryData()
      console.log("sdkjfbsdhjfbsd",props)
      if(props && Object.keys(props.bookDetails).length>0 ){
        setId(props.bookDetails._id)
        setBookName(props.bookDetails.bookName)
        setBookIcon(props.bookDetails.bookIcon)
        setMRP(props.bookDetails.MRP)
        setISBN(props.bookDetails.ISBN)
        setAuthor(props.bookDetails.author)
        setBookCode(props.bookDetails.bookCode)
        setLanguage(props.bookDetails.language)
        setType(props.bookDetails.type)
        setSellingPrice(props.bookDetails.sellingPrice)
        setCategoryId(props.bookDetails.categoryId)
        setCatogaryList(props.bookDetails.categoryData)
      }
  
    },[props])
    return (
        <div
        class="modal"
        id="book_views"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Book Details
              </h5>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
              <div className="form-group mb-3">
                  <label className="large mb-1"> Category:- </label>
                  <h6>{catogaryList.length>0 && catogaryList[0].categoryName}</h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Name:- </label>
                  <h6>{bookName}</h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Icon:- </label>
                  <h6>
                  <img src={imageUrl+bookIcon} alt="" width="100px" height="100px"/>
                  </h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Mrp Price:- </label>
                  <h6>{MRP}</h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Isbn:- </label>
                  <h6>{ISBN}</h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Code:- </label>
                  <h6>{bookCode}</h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Author Name:- </label>
                  <h6>{author}</h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Type:- </label>
                  <h6>{type}</h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Language:- </label>
                  <h6>{language}</h6>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Selling Price:- </label>
                  <h6>{sellingPrice}</h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
export default BookView