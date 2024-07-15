import { useEffect, useState } from "react"
import { titleImageUpdateById } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"
import { imageUrl } from "../services/dataurl"
import { ResultFunction } from "../comman/resultFunction"

const UpdateTrendingTitles = (props) =>{
    const [title,setTitle] = useState("")
    const [titleIcon,setTitleIcon] = useState("")
    const [encodedIcon,setEncodedIcon] = useState("")
    const [id,setId] = useState("")

    useEffect(()=>{
        console.log("sdhfsjfgdsfjsdfds",props);
        if(Object.keys(props).length>0 && Object.keys(props.data).length>0){
          setTitle(props.data.title)
          setTitleIcon(props.data.icon)
          setEncodedIcon(imageUrl+props.data.icon)
          setId(props.data._id)
        }

    },[props])

    const handleTitleImage = (e) => {
        let image = e.target.files[0]
        if(image){
            const imgata = URL.createObjectURL(e.target.files[0]);
            setTitleIcon(image)
            setEncodedIcon(imgata)
          }
          else{
            setTitleIcon("")
            setEncodedIcon("")
          }
        
    }
    const handleTitleChange = async() => {
        let formdata = new FormData()
            formdata.append("_id",id)
            formdata.append("title",title)
            formdata.append("titleIcon",titleIcon)
            let result = await titleImageUpdateById(formdata)
            ResultFunction(result,props.apiRecall)
            
    }
    return (
        <div
        class="modal"
        id="edit_title"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Update Title Image
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
                        <select 
                        className="form-control"
                        // onChange={(e)=>{setCategoryId(e.target.value)}}
                        >
                         <option value={title}>{title}</option>
                        </select>
                    </div>
                <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="file"
                        placeholder="title image"
                        name="title"
                        onChange={handleTitleImage}
                      />
                      <div className="form-control">
                        <img src={encodedIcon || titleIcon} alt="no image choosed" width="100px" height="100px"/>
                      </div>
                    </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleTitleChange()}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
            )
}
export default UpdateTrendingTitles