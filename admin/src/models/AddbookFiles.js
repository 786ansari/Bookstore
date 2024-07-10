import { useEffect, useState } from "react"
import  {ResultFunction} from "../comman/resultFunction"
import { addBookFiles } from "../services/book.service"

export const AddBookFiles = (props) => {
    const[file,setFile] = useState("")
    const[chapter,setChapter] = useState("")
    const[chapterCount,setChapterCount] = useState(0)
    const[files,setFiles] = useState(["ppt","pdf","pptPdf","editable"])
    const[fileType,setFileType] = useState("")
    const [bookList, setBookList] = useState([])
    const [bookId, setBookId] = useState([])
    useEffect(()=>{
      if(props && props.bookList){
        setBookList(props.bookList)
      }
    },[props])

    const handleFileChange = (e) => {
      let pdf = e.target.files[0]
        setFile(pdf)
  }
  const handleBookChange = (e) => {
    console.log("valuevaluevalue",e.target.value)
    const {name, value} = e.target
    let val = value && JSON.parse(value)
    setChapterCount(val?.chapterCount)
    setBookId(val?._id)

  }
  const chapterHtml = () =>{
    console.log("htmlhtmlhtml",chapterCount)
    const html=[]
    for(let i=0; i<chapterCount; i++){
      html.push(<option value={`Chapter ${i+1}`}>{`Chapter ${i+1}`}</option>)
    }
    return html
  } 

  const handleSubmit = async() => {
    const formdata = new FormData()
    formdata.append("bookId",bookId)
    formdata.append("file",file)
    formdata.append("fileType",fileType)
    formdata.append("chapter",chapter)
    let result = await addBookFiles(formdata)
    ResultFunction(result,props.bookFiles)
  }

  return (
    <div
    class="modal"
    id="add_bookFiles"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog  alert_modal" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">
            Add Files
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
                  <label className="small mb-1">Select Book</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={handleBookChange}>
                    <option value="">Select</option>
                    {
                      bookList.map((val,i)=>{
                        return <option value={JSON.stringify(val)} key={i}>{val.bookName}</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Select Chapter</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setChapter(e.target.value)}>
                    <option>Select</option>
                    {chapterHtml()}
                    <option value="Full Book">Full Book</option>
                  </select>
                </div>
              <div className="form-group mb-3">
                  <label className="small mb-1">Select File Type</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setFileType(e.target.value)}>
                    <option>Select</option>
                    {chapter == "Full Book"?
                      files.map((val,i)=>{
                        return <option value={val} key={i}>{val}</option>
                      }):
                      <option value="pdf">pdf</option>
                    }
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">file </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="file"
                    // value={bookIcon}
                    placeholder=""
                    onChange={handleFileChange}
                  />
                </div>
            <button
              class="btn btn-s btn-indigo btn-block w-100"
              data-bs-dismiss="modal"
              type="button"
              onClick={() => handleSubmit()}
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

export default AddBookFiles