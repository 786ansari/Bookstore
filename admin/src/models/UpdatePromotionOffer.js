import { useEffect, useState } from "react"
import { PermotiopromotionAndOfferAdd, PosterAdd, updatePromotionAndOfferDetails } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"
import { ResultFunction } from "../comman/resultFunction"
import { imageUrl } from "../services/dataurl"

const UpdatePromotionOffer = (props) =>{
    const [categoryList,setCategoryList] = useState([])
    const [promotionImageSize,setPromotionImageSize] = useState(["321 × 509 px","321 × 498 px","267 × 227 px","236 × 340 px","524 × 134 px"])
    const [promotionIcon,setPromotionIcon] = useState("")
    const [encodedIcon,setEncodedIcon] = useState("")
    const [categoryId,setCategoryId] = useState("")
    const [id,setId] = useState("")


    useEffect(()=>{
        console.log("szdxfcguhijojhhcvhb",props);
        if(Object.keys(props).length>0 && Object.keys(props.promotionData).length>0){
            setCategoryList(props.promotionData.categoryData)
            setPromotionIcon(imageUrl+props.promotionData.icon)
            setCategoryId(props.promotionData.categoryId)
            setId(props.promotionData._id)
        }

    },[props])

    const handleImage = (e) => {
        let image = e.target.files[0]
        if(image){
            const imgata = URL.createObjectURL(e.target.files[0]);
            setPromotionIcon(image)
            setEncodedIcon(imgata)
          }
          else{
            setPromotionIcon("")
            setEncodedIcon("")
          }
    }
    const handlePromotionChange = async() => {
        let formdata = new FormData()
            formdata.append("_id",id)
            formdata.append("categoryId",categoryId)
            formdata.append("promotionIcon",promotionIcon)
            let result = await updatePromotionAndOfferDetails(formdata)
            ResultFunction(result,props.getData)
    }

    return (
        <div
        class="modal"
        id="edit_promotion"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add poster
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
                {console.log("handlePosterChange",categoryList)}
                        <select 
                        className="form-control"
                        >
                            {/* <option value="">Select</option> */}
                            {categoryList.length>0 &&
                            categoryList.map((category,i)=>{
                                return <option value={category._id}>{category.categoryName}</option>
                            })}
                        </select>
                    </div>
                <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="file"
                        placeholder="promotion image"
                        name="promotionIcon"
                        onChange={handleImage}
                      />
                      <div className="form-control">
                        <img src={encodedIcon || promotionIcon} alt="no image choosed" width="100px" height="100px"/>
                      </div>
                      {/* <h6>Note: Please Add {promotionImageSize[props.length]} size of image</h6> */}
                    </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handlePromotionChange()}
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
export default UpdatePromotionOffer