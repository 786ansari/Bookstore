import { useEffect, useState } from "react"
import hasEmptyValue from "../validations/Category"
import { HotToaster } from "../utils/Toaster"
import  {ResultFunction} from "../comman/resultFunction"
import { currentAffairsFileUpdate } from "../services/currentAffairs.service"
import { imageUrl } from "../services/dataurl"

export const UpdateCurrentAffairs = (props) => {
    const[id,setId] = useState("")
    const[type,setType] = useState("")
    const[file,setFile] = useState("")
    const[fileType,setFileType] = useState("")
    const[range,setRange] = useState(null)
    const[plan,setPlan] = useState("")

    useEffect(()=>{
      console.log("propsorpsoepr",props);
        if(props && props.data){
            setId(props.data._id)
            setType(props.data.type)
            setFileType(props.data.fileType)
            setFile(props.data.file)
            setRange(props.data.range)
            setPlan(props.data.plan)
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
    formdata.append("fileType",fileType)
    formdata.append("type",type)
    formdata.append("file",file)
    formdata.append("range",range)
    formdata.append("plan",plan)
    let result = await currentAffairsFileUpdate(formdata)
    ResultFunction(result,props.currentAffairs)
  }

  return (
    <div
    class="modal"
    id="edit_currentAffairs"
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
                  <label className="small mb-1">Select Type</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setType(e.target.value)}>
                    <option value={type}>{type}</option>
                    {/* {
                      type.map((val,i)=>{
                        return <option value={val} key={i}>{val}</option>
                      })
                    } */}
                  </select>
                </div>
                {type !== "Daily" && <div className="form-group mb-3">
                  <label className="small mb-1">Select Range</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setRange(e.target.value)}>
                    <option value={range}>{range}</option>
                  </select>
                </div>}
                <div className="form-group mb-3">
                  <label className="small mb-1">Select File Type</label>
                  <select
                   class="form-control  form-control-solid">
                    <option value={fileType}>{fileType}</option>
                    {/* {console.log("consolelog",categoryList)} */}
                    {/* {
                      categoryList.map((val,i)=>{
                        return <option value={val._id} key={i}>{val.categoryName}</option>
                      })
                    } */}
                  </select>
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
                  <label className="small mb-1">File </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="file"
                    // value={bookIcon}
                    placeholder=""
                    onChange={handleFileChange}
                  />
                  <a href={imageUrl+file} alt="no file" target="_blank" download>View File</a>
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

export default UpdateCurrentAffairs