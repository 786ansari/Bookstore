import { useEffect, useRef, useState } from "react"
import { setTrendingTitleImage } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"
import { ResultFunction } from "../comman/resultFunction"
import EmptyState from "../utils/manageEmptyState"

const AddTrendingTitles = (props) =>{
    const [trendingTitles,setTrandingTitles] = useState(["NEW ARRIVALS","BEST SELLERS","UPCOMING EXAM BOOKS"])
    const [titleIcon,setTitleIcon] = useState("")
    const [title, setTitle] = useState("")
    const [encodedIcon,setEncodedIcon] = useState("")
    const imageRef = useRef(null);

    const handleTitleImage = (e) => {
        let image = e.target.files[0]
        console.log("handleposterimage",image)
        if(image){
            const imgata = URL.createObjectURL(image);
            setTitleIcon(image)
            setEncodedIcon(imgata)
          }
          else{
            setTitleIcon("")
            setEncodedIcon("")
          }
        
    }
    const handleTitleChange = async() => {
      console.log("titleIcontitleIcon",titleIcon,title)
        let formdata = new FormData()
            formdata.append("title",title)
            formdata.append("icon",titleIcon)
            let result = await setTrendingTitleImage(formdata)
            // setTitle("")
            // setTitleIcon("")
            // setEncodedIcon("")
            ResultFunction(result,props.apiRecall)
            EmptyState([setTitle,setTitleIcon,setEncodedIcon],imageRef)
    }

    return (
        <div
        class="modal"
        id="add_trending-titles"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Title
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
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                        >
                            <option value="">Select</option>
                            {trendingTitles.map((titles,i)=>{
                                return <option value={titles}>{titles}</option>
                            })}
                        </select>
                    </div>
                <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="file"
                        ref={imageRef}
                        placeholder="title image"
                        name="icon"
                        onChange={handleTitleImage}
                      />
                      <div className="form-control">
                        <img src={encodedIcon} alt="no image choosed" width="100px" height="100px"/>
                      </div>
                    </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleTitleChange()}
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
export default AddTrendingTitles