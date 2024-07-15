import { useEffect, useState } from "react"
import  {ResultFunction} from "../comman/resultFunction"
import { BookFilesUpdate } from "../services/book.service"
import { imageUrl } from "../services/dataurl"

export const UpdateBookFiles = (props) => {
    const[id,setId] = useState("")
    const [file,setFile] = useState("")
    const [chapter, setChapter] = useState(null)
    const [fileType,setFileType] = useState("")
    const[bookName,setBookName] = useState("")
    const[bookId,setBookId] = useState("")


    useEffect(()=>{
      console.log("jajddkdhadndn",props)
        if(props && props.data){
            setId(props?.data?._id)
            setFile(props?.data?.file)
            setFileType(props?.data?.fileType)
            setChapter(props?.data?.chapter)
            props?.data?.booksData && setBookName(props?.data?.booksData[0]?.bookName)
            props?.data?.booksData && setBookId(props?.data?.booksData[0]?._id)
        }
    },[props])

    const handleFileChange = (e) => {
      let pdf = e.target.files[0]
      let name = e.target.name
      setFile(pdf)
  }

  const handleSubmit = async() => {
    const formdata = new FormData()
    formdata.append("id",id)
    formdata.append("bookId",bookId)
    formdata.append("file",file)
    formdata.append("chapter",chapter)
    formdata.append("fileType",fileType)
    let result = await BookFilesUpdate(formdata)
    ResultFunction(result,props.bookFiles)
  }

  return (
    <div
    class="modal"
    id="edit_bookFiles"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog  alert_modal" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">
            Update Files
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
                  <label className="small mb-1">Select Book Name</label>
                  <select
                   class="form-control  form-control-solid">
                    <option>{bookName}</option>
                    {/* {console.log("consolelog",categoryList)} */}
                    {/* {
                      categoryList.map((val,i)=>{
                        return <option value={val._id} key={i}>{val.categoryName}</option>
                      })
                    } */}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Select File Type</label>
                  <select
                   class="form-control  form-control-solid">
                    <option>{fileType}</option>
                    {/* {console.log("consolelog",categoryList)} */}
                    {/* {
                      categoryList.map((val,i)=>{
                        return <option value={val._id} key={i}>{val.categoryName}</option>
                      })
                    } */}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Chapter </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    name="chapter"
                    value={chapter}
                    placeholder="Add chapter"
                    disabled
                    onChange={(e)=>{setChapter(e.target.value)}}
                  />
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
                  <a href={imageUrl+file} target="_blank" download >View Pdf File</a>
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

export default UpdateBookFiles