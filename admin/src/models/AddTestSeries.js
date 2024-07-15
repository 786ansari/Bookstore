import { useEffect, useState } from "react"
import hasEmptyValue from "../validations/Category"
import { HotToaster } from "../utils/Toaster"
import  {ResultFunction} from "../comman/resultFunction"
import { testSeriesAdd } from "../services/testseries.service"

export const AddTestSeries = (props) => {
    const[file,setFile] = useState("")
    const[files,setFiles] = useState(["ppt","pdf","pptPdf","editable"])
    const[fileType,setFileType] = useState("")
    const[subject,setSubject] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState([])
    const [plan, setPlan] = useState([])
    const [releaseDate,setReleaseDate] = useState("")

    useEffect(()=>{
      if(props && props.categoryList){
        setCategoryList(props.categoryList)
      }
    },[props])

    const handleFileChange = (e) => {
      let pdf = e.target.files[0]
        setFile(pdf)
  }
  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    if(name == "subject"){
    setSubject(value)
    }
    if(name == "releaseDate"){
      setReleaseDate(value)
    }
  }

  const handleSubmit = async() => {
    const formdata = new FormData()
    formdata.append("categoryId",categoryId)
    formdata.append("file",file)
    formdata.append("fileType",fileType)
    formdata.append("subject",subject)
    formdata.append("plan",plan)
    formdata.append("releaseDate",releaseDate)
    let result = await testSeriesAdd(formdata)
    ResultFunction(result,props.testSeries)
  }

  return (
    <div
    class="modal"
    id="add_testseries"
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
                  <label className="small mb-1">Select Category</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setCategoryId(e.target.value)}>
                    <option value="">Select</option>
                    {console.log("consolelog",categoryList)}
                    {
                      categoryList.map((val,i)=>{
                        return <option value={val._id} key={i}>{val.categoryName}</option>
                      })
                    }
                  </select>
                </div>
              <div className="form-group mb-3">
                  <label className="small mb-1">Select File Type</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setFileType(e.target.value)}>
                    <option value="">Select</option>
                    {console.log("consolelog",categoryList)}
                    {
                      files.map((val,i)=>{
                        return <option value={val} key={i}>{val}</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Release Date </label>
                  <input
                    class="form-control  form-control-solid"
                    type="date"
                    name="releaseDate"
                    value={releaseDate}
                    placeholder="Release Date"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Select Plan Type</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setPlan(e.target.value)}>
                    <option value="">Select</option>
                     <option value="Free">Free</option>
                     <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Subject </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    name="subject"
                    value={subject}
                    placeholder="subject"
                    onChange={handleChange}
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

export default AddTestSeries