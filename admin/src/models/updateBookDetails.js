import { useEffect, useState } from "react"
import { BookAdd, BookUpdate, CategoryListGet } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"
import { imageUrl } from "../services/dataurl"

const UpdateBookDetails =  (props) => {
  const[_id,setId] = useState("")
  const[itemType,setItemType] = useState("")
  const[bookName,setBookName] = useState("")
  const[bookIcon,setBookIcon] = useState("")
  const[MRP,setMRP] = useState("")
  const[ISBN,setISBN] = useState("")
  const[author,setAuthor] = useState("")
  const[bookCode,setBookCode] = useState("")
  const[type,setType] = useState("")
  const[samplePdf,setSamplePdf] = useState("")
  const[chapterCount,setChapterCount] = useState(0)
  const[language,setLanguage] = useState("")
  const[sellingPrice,setSellingPrice] = useState("")
  const[categoryId,setCategoryId] = useState("")
  const[catogaryList,setCatogaryList] = useState([])
  const[features,setFeatures] = useState("")
  const [bookType,setBookType] = useState(["NEW ARRIVALS","BEST SELLERS","UPCOMING EXAM BOOKS"])
  const [encodedImage,setEncodedImage] = useState("")
  useEffect(()=>{
    // getCategoryData()
    console.log("sdkjfbsdhjfbsd",props)
    if(props && Object.keys(props.bookDetails).length>0 ){
      setId(props.bookDetails._id)
      setBookName(props.bookDetails.bookName)
      setItemType(props.bookDetails.itemType)
      setBookIcon(props.bookDetails.bookIcon)
      setMRP(props.bookDetails.MRP)
      setISBN(props.bookDetails.ISBN)
      setAuthor(props.bookDetails.author)
      setChapterCount(props.bookDetails.chapterCount)
      setSamplePdf(props.bookDetails.samplePdf)
      setBookCode(props.bookDetails.bookCode)
      setLanguage(props.bookDetails.language)
      setType(props.bookDetails.type)
      setSellingPrice(props.bookDetails.sellingPrice)
      setCategoryId(props.bookDetails.categoryId)
      setFeatures(props.bookDetails.features)
      setCatogaryList(props.bookDetails.categoryData)
    }
  },[props])
  const handleBookImage = (e) => {
    let image = e.target.files[0]
    if(image){
      const imgata = URL.createObjectURL(e.target.files[0]);
      setBookIcon(image)
      setEncodedImage(imgata)
    }
    else{
      setBookIcon("")
      setEncodedImage("")
    }
   
  }

  const handleBookDetailsUpdate = async() => {
    const formdata = new FormData()
    formdata.append("_id",_id)
    formdata.append("itemType",itemType)
    formdata.append("categoryId",categoryId)
    formdata.append("bookName",bookName)
    formdata.append("bookIcon",bookIcon)
    formdata.append("samplePdf",samplePdf)
    formdata.append("chapterCount",chapterCount)
    formdata.append("MRP",MRP)
    formdata.append("ISBN",ISBN)
    formdata.append("author",author)
    formdata.append("bookCode",bookCode)
    formdata.append("type",type)
    formdata.append("language",language)
    formdata.append("features",features)
    formdata.append("sellingPrice",sellingPrice)

    let result = await BookUpdate(formdata)
    resultfunction(result)
  }
  const resultfunction = (result) => {
    if(result.status){
      HotToaster(result.status,result.message)
    }
    else{
      HotToaster(result.status,result.message)
    }
  }

  const handleBookSampleImage = (e) => {
    let pdf = e.target.files[0]
    setSamplePdf(pdf)
  }

    return (
        <div
        class="modal"
        id="update_books"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Update Book Details
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
              <div className="form-group mb-3 ">
                  <label className="small mb-1"> Select Item Type </label>
                  <select 
                  class="form-control  form-control-solid"
                  onChange={(e)=>setItemType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="book" >Book</option>
                    <option value="ebook" >E-Book</option>
                  </select>
                </div>
              <div className="form-group mb-3 ">
                  <label className="small mb-1"> Select category </label>
                  <select 
                  class="form-control  form-control-solid"
                  onChange={(e)=>setCategoryId(e.target.value)}
                  >
                    {/* <option value="">Select</option> */}
                    {catogaryList.map((category,i)=>{
                        return <option value={category._id} >{category.categoryName}</option>
                    })}
                    

                  </select>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Name </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    value={bookName}
                    placeholder="Enter Book Name"
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Icon </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="bookIcon"
                    // value={bookIcon}
                    placeholder="Enter Book Icon"
                    onChange={handleBookImage}
                  />
                  <img src={encodedImage || imageUrl+bookIcon} alt="" width="100px" height="100px"/>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Sample Pdf </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="samplePdf"
                    // value={bookIcon}
                    placeholder=""
                    onChange={handleBookSampleImage}
                  />
                  <a href={imageUrl+samplePdf} target="_blank" download >View Sample Pdf</a>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Mrp Price </label>
                  <input
                    class="form-control  form-control-solid"
                    type="number"
                    value={MRP}
                    placeholder="Enter Mrp price"
                    onChange={(e) => setMRP(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Isbn </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    value={ISBN}
                    placeholder="Enter isbn"
                    onChange={(e) => setISBN(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Code </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    value={bookCode}
                    placeholder="Enter book code"
                    onChange={(e) => setBookCode(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Author Name </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    value={author}
                    placeholder="Enter author Name"
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Chapter Count </label>
                  <input
                    class="form-control  form-control-solid"
                    type="number"
                    value={chapterCount}
                    placeholder="Enter chapter count"
                    onChange={(e) => setChapterCount(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Type </label>
                  <select className="form-control"
                    onChange={(e)=>setType(e.target.value)}>
                    <option className="" value={type}>{type}</option>
                    {bookType.map((types,i)=>{
                     return  types!== type && <option className="" value={types}>{types}</option>
                    })}
                  </select>
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Language </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    value={language}
                    placeholder="Enter language"
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Selling Price </label>
                  <input
                    class="form-control  form-control-solid"
                    type="number"
                    value={sellingPrice}
                    placeholder="Enter selling price"
                    onChange={(e) => setSellingPrice(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Features </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    value={features}
                    placeholder="Enter features"
                    onChange={(e) => setFeatures(e.target.value)}
                  />
                </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleBookDetailsUpdate()}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
export default UpdateBookDetails