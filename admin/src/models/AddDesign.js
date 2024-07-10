import { useState } from "react"
import  {ResultFunction} from "../comman/resultFunction"
import { addDesign } from "../services/design.service"

export const AddDesign = (props) => {
    const[type,setType] = useState("")
    const[designType,setDesignType] = useState("")
    const[icon,setIcon] = useState("")
    const[file,setFile] = useState("")
    const array = ["Social Media","Book Cover","Visiting Card","Other"]

  const handleFileChange = (e) => {
      let file = e.target.files[0]
      let name = e.target.name
      if(name == "file"){
        setFile(file)
      }
      else{
        setIcon(file)
      }
  }

  const handleSubmit = async() => {
    const formdata = new FormData()
    formdata.append("designType",designType)
    formdata.append("file",file)
    formdata.append("icon",icon)
    let result = await addDesign(formdata)
    ResultFunction(result,props.designList)
  }

  return (
    <div
    class="modal"
    id="add_design"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog  alert_modal" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">
            Add
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
                  <label className="small mb-1">Select Design Type</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setDesignType(e.target.value)}>
                    <option>Select</option>
                    {
                      array.map((val,i)=>{
                        return <option value={val} key={i}>{val}</option>
                      })
                    }
                  </select>
                </div> <div className="form-group mb-3">
                  <label className="small mb-1">Add Icon </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="icon"
                    placeholder=""
                    onChange={handleFileChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="small mb-1">File </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="file"
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

export default AddDesign