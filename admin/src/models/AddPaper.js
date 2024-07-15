import { useEffect, useState } from "react"
import  {ResultFunction} from "../comman/resultFunction"
import { paperAdd } from "../services/paper.service"

export const AddPreviousYearPaper = (props) => {
    const[file,setFile] = useState("")
    const[subject,setSubject] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState([])
    const [examType,setExamType] = useState("")

    useEffect(()=>{
      if(props && props.categoryList){
        setCategoryList(props.categoryList)
      }
    },[props])

    const handleFileChange = (e) => {
      let pdf = e.target.value
        setFile(pdf)
  }
  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    if(name == "subject"){
        setSubject(value)
    }
    if(name == "examType"){
        setExamType(value)
    }
  }

  const handleSubmit = async() => {
    const formdata = {}
    formdata.categoryId = categoryId
    formdata.file = file
    formdata.examType = examType
    formdata.subject = subject
    let result = await paperAdd(formdata)
    ResultFunction(result,props.paperList)
  }

  return (
    <div
    class="modal"
    id="add_Paper"
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
                  <label className="small mb-1">Exam Type</label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    name="examType"
                    value={examType}
                    placeholder="Exam Type"
                    onChange={handleChange}
                  />
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
                    type="text"
                    name="file"
                    // value={bookIcon}
                    placeholder="Add file link here"
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

export default AddPreviousYearPaper