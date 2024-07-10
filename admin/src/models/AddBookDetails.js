import { useEffect, useState } from "react"
import { BookAdd, CategoryListGet } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"

const AddBookDetails =  () => {
  const[bookName,setBookName] = useState("")
  const[itemType,setItemType] = useState("")
  const[bookIcon,setBookIcon] = useState("")
  const[MRP,setMRP] = useState("")
  const[ISBN,setISBN] = useState("")
  const[author,setAuthor] = useState("")
  const[bookCode,setBookCode] = useState("")
  const[chapterCount,setChapterCount] = useState(0)
  const[language,setLanguage] = useState("")
  const[samplePdf,setSamplePdf] = useState({})
  const[sellingPrice,setSellingPrice] = useState("")
  const[categoryId,setCategoryId] = useState("")
  const[type,setType] = useState("")
  const[features,setFeatures] = useState("")
  const[bookType,setBookType] = useState(["NEW ARRIVALS","BEST SELLERS","UPCOMING EXAM BOOKS"])
  const[catogaryList,setCatogaryList] = useState([])

  useEffect(()=>{
    getCategoryData()
  },[])
  const getCategoryData = async() => {
    let result = await CategoryListGet()
    setCatogaryList(result.data)
  }
  const handleBookImage = (e) => {
    let image = e.target.files[0]
    setBookIcon(image)
  }

  const handleBookSampleImage = (e) => {
    let pdf = e.target.files[0]
    setSamplePdf(pdf)
  }


  const handleBookDetailsSave = async() => {
    const formdata = new FormData()
    formdata.append("itemType",itemType)
    formdata.append("categoryId",categoryId)
    formdata.append("samplePdf",samplePdf)
    formdata.append("bookName",bookName)
    formdata.append("bookIcon",bookIcon)
    formdata.append("MRP",MRP)
    formdata.append("chapterCount",chapterCount)
    formdata.append("ISBN",ISBN)
    formdata.append("author",author)
    formdata.append("bookCode",bookCode)
    formdata.append("type",type)
    formdata.append("language",language)
    formdata.append("features",features)
    formdata.append("sellingPrice",sellingPrice)

    let result = await BookAdd(formdata)
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

    return (
        <div
        class="modal"
        id="add_books"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Book Details
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
                    <option value="">Select</option>
                    {catogaryList.length>0 && catogaryList.map((category,i)=>{
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
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1">Mrp Price </label>
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
                    placeholder="Enter Chapter Count"
                    onChange={(e) => setChapterCount(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Book Type </label>
                  <select className="form-control"
                  onChange={(e)=>setType(e.target.value)}>
                    <option value="">Select type</option>
                    {bookType.map((type,i)=>{
                      return <option className="" value={type}>{type}</option>
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
                  onClick={() => handleBookDetailsSave()}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
export default AddBookDetails