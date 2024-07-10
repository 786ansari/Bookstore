import React,{useState, useEffect} from "react";
import { addDataTranslateFormDetails } from "../../services/datatranslate.service"
import { HotToaster } from "../../utils/Toaster";
const EnglishHindi =(props) =>{
  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[file,setFile] = useState("")
  const[message,setMessage] = useState("")

  const handleFIleChange = (e) => {
    let value = e.target.files[0]
    setFile(value)

  }
  const handleSubmit = async() => {
    let formdata = new FormData()
    formdata.append("subject",props.type)
    formdata.append("name",name)
    formdata.append("email",email)
    formdata.append("file",file)
    formdata.append("message",message)
      let result = await addDataTranslateFormDetails(formdata)
      HotToaster(result.status,result.message)
  }
    return (
        <>
          <>
        <div style={{fontFamily:"sans-serif",fontSize:"1.5rem",fontWeight:"bold"}}>Add Your Query Here</div>
        <div className="form-class">
        <div className="form-group col-md-6">
          <label className="large mb-2 font">Subject: </label>
          <input class="form-control" type="text" name="subject" value={props.type} readonly="readonly" />
        </div>
        <div className="form-group col-md-6">
          <label className="large mb-2 font">Name: </label>
          <input class="form-control" type="text" name="name" onChange={(e)=>{
            setName(e.target.value)
          }} />
        </div>
        <div className="form-group col-md-6">
          <label className="large mb-2 font">Email: </label>
          <input class="form-control" type="text" name="email" onChange={(e)=>{
            setEmail(e.target.value)
          }} />
        </div>
        <div className="form-group col-md-6">
          <label className="large mb-2 font">Upload File: </label>
          <input class="form-control" type="file" name="file" onChange={handleFIleChange} />
        </div>
        <div className="form-group col-md-6">
          <label className="large mb-2 font">Message: </label>
          <textarea class="form-control" type="text" name="message" onChange={(e)=>{
            setMessage(e.target.value)
          }} />
        </div>
        <div style={{marginTop:"10px"}}>
        <button
                  class="btn btn-s btn-primary btn-block "
                  type="button"
                  onClick={handleSubmit}
                >
                  Add
                </button> 
                </div>            
          </div>          
        </>
        </>
    )
}
export default EnglishHindi