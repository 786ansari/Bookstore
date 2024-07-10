import { useEffect, useState } from "react"
import { PosterUpdate } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"
import { imageUrl } from "../services/dataurl"

const UpdatePoster = (props) =>{
    const [selectedCategory,setSelectedCategory] = useState([])
    const [posterIcon,setPosterIcon] = useState("")
    const [encodedIcon,setEncodedIcon] = useState("")
    const [categoryId,setCategoryId] = useState("")
    const [id,setId] = useState("")

    useEffect(()=>{
      console.log("sdfsdkuyyfgsduykbs",props.categoryDetails)
        if(Object.keys(props).length>0 && Object.keys(props.categoryDetails).length>0){
          setSelectedCategory(props.categoryDetails.categoryData)
          setPosterIcon(props.categoryDetails.posterIcon)
          setId(props.categoryDetails._id)
          setCategoryId(props.categoryDetails.categoryData[0]._id)
        }

    },[props])

    const handlePosterImage = (e) => {
        let image = e.target.files[0]
        if(image){
            const imgata = URL.createObjectURL(e.target.files[0]);
            setPosterIcon(image)
            setEncodedIcon(imgata)
          }
          else{
            setPosterIcon("")
            setEncodedIcon("")
          }
        
    }
    const handlePosterChange = async() => {
        let formdata = new FormData()
            formdata.append("_id",id)
            formdata.append("categoryId",categoryId)
            formdata.append("posterIcon",posterIcon)
            let result = await PosterUpdate(formdata)
            resultfunction(result)
    }
    const resultfunction = (result) => {
        if(result.status){
          HotToaster(result.status,result.message)
          props.callingPosterApiAgainAfterAddNewOne()
        setCategoryId("")
        }
        else{
          HotToaster(result.status,result.message)
        //   setCategoryName("")
        }
      }

    return (
        <div
        class="modal"
        id="edit_poster"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Update poster
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
                            {/* <option value="">Select</option> */}
                           
                            {selectedCategory.length>0 &&
                            selectedCategory.map((categoriess,i)=>{
                                return <option value={categoriess._id}>{categoriess.categoryName}</option>
                            })}
                        </select>
                    </div>
                <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="file"
                        placeholder="poster image"
                        name="poster"
                        onChange={handlePosterImage}
                      />
                      <div className="form-control">
                        <img src={encodedIcon || imageUrl+posterIcon} alt="no image choosed" width="100px" height="100px"/>
                      </div>
                    </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handlePosterChange()}
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
export default UpdatePoster