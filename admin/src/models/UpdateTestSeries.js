import { useEffect, useState } from "react"
import  {ResultFunction} from "../comman/resultFunction"
import { testSeriesUpdate } from "../services/testseries.service"

export const UpdateTestSeries = (props) => {
    const[id,setId] = useState("")
    const [file,setFile] = useState("")
    const [fileType,setFileType] = useState("")
    const [subject,setSubject] = useState("")
    const[categoryName,setCategoryName] = useState("")
    const[categoryId,setCategoryId] = useState("")
    const [plan, setPlan] = useState([])
    const [releaseDate,setReleaseDate] = useState("")


    useEffect(()=>{
        if(props && props.data){
            setId(props.data._id)
            setFile(props.data.file)
            setFileType(props.data.fileType)
            setSubject(props.data.subject)
            setPlan(props.data.plan)
            setReleaseDate(props.data.releaseDate)
            props.data.categoryData && setCategoryName(props.data.categoryData[0].categoryName)
            props.data.categoryData && setCategoryId(props.data.categoryData[0]._id)
        }
    },[props])

    const handleFileChange = (e) => {
      let pdf = e.target.files[0]
      let name = e.target.name
      setFile(pdf)
  }
  const handleChange = (e) => {
    let value = e.target.value
    setSubject(value)
  }

  const handleSubmit = async() => {
    const formdata = new FormData()
    formdata.append("id",id)
    formdata.append("categoryId",categoryId)
    formdata.append("file",file)
    formdata.append("fileType",fileType)
    formdata.append("subject",subject)
    formdata.append("plan",plan)
    formdata.append("releaseDate",releaseDate)
    let result = await testSeriesUpdate(formdata)
    ResultFunction(result,props.testSeries)
  }

  return (
    <div
    class="modal"
    id="edit_testSeries"
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
                  <label className="small mb-1">Select Category</label>
                  <select
                   class="form-control  form-control-solid">
                    <option>{categoryName}</option>
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
                     <option value={plan}>{plan}</option>
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
                {/* <div className="form-group mb-3">
                  <label className="small mb-1">Ppt file </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="pptFile"
                    // value={bookIcon}
                    placeholder=""
                    onChange={handleFileChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Ppt Pdf file </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="pptPdfFile"
                    // value={bookIcon}
                    placeholder=""
                    onChange={handleFileChange}
                  />
                </div> */}
                {/* <div className="form-group mb-3">
                  <label className="small mb-1">Editable file </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="editableFile"
                    // value={bookIcon}
                    placeholder=""
                    onChange={handleFileChange}
                  />
                </div> */}
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

export default UpdateTestSeries