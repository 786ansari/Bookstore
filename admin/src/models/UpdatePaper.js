import { useEffect, useState } from "react"
import  {ResultFunction} from "../comman/resultFunction"
import { paperUpdate } from "../services/paper.service"

export const UpdatePreviousYearPaper = (props) => {
    const[id,setId] = useState("")
    const[file,setFile] = useState("")
    const[subject,setSubject] = useState("")
    const[categoryId, setCategoryId] = useState([])
    const[examType,setExamType] = useState("")
    const[categoryName, setCategoryName] = useState("")


    useEffect(()=>{
        if(props && props.data){
            setId(props.data._id)
            setFile(props.data.file)
            setSubject(props.data.subject)
            setExamType(props.data.examType)
            props.data.categoryData && setCategoryName(props.data.categoryData[0].categoryName)
            props.data.categoryData && setCategoryId(props.data.categoryData[0]._id)
        }
    },[props])

    const handleFileChange = (e) => {
      let pdf = e.target.value
      let name = e.target.name
      setFile(pdf)
  }
  const handleChange = (e) => {
    let value = e.target.value
    setSubject(value)
  }

  const handleSubmit = async() => {
    const formdata = {}
    formdata.id = id
    formdata.categoryId = categoryId
    formdata.file = file
    formdata.examType = examType
    formdata.subject = subject
    let result = await paperUpdate(formdata)
    ResultFunction(result,props.paperList)
  }

  return (
    <div
    class="modal"
    id="edit_Paper"
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
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Exam Type </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    name="examType"
                    value={examType}
                    placeholder="Exam Type"
                    onChange={(e)=>{
                        setExamType(e.target.value)
                    }}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">Subject</label>
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
                  <label className="small mb-1">file</label>
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

export default UpdatePreviousYearPaper