import { useEffect, useState } from "react"
import hasEmptyValue from "../validations/Category"
import { HotToaster } from "../utils/Toaster"
import { CategoryUpdate } from "../services/book.service"
import {ResultFunction} from "../comman/resultFunction"
import { Categories } from "../Validation/Categories"
import { ModelClose } from "../utils/ModelClose"

const UpdateCategory = (props) => {
    const [categoryName,setCategoryName] = useState("")
    const [categoryNameError,setCategoryNameError] = useState("")
    const [categoryIdForUpdate,setCategoryIdForUpdate] = useState("")
    useEffect(()=>{
        if(Object.keys(props).length>0 && Object.keys(props.data).length>0 ){
            setCategoryIdForUpdate(props.data._id)
            setCategoryName(props.data.categoryName)
        }
    },[props])
    const handleChange = async(e) => {
      setCategoryName(e.target.value)
      let error = await Categories(e.target.value)
      setCategoryNameError(error)
    }
    const handleCategoryUpdate = async() => {
      let error = await Categories(categoryName)
      setCategoryNameError(error)
      if(error || categoryNameError) return false
        let data = {
          id:categoryIdForUpdate,
          categoryName:categoryName
        }
        let result = await CategoryUpdate(data)
        ModelClose("edit_category_close_button")
        ResultFunction(result,props.categoryList,setCategoryName)    
      }
    return (
        <div
        class="modal"
        id="edit_category"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Update category
              </h5>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="edit_category_close_button"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3 ">
                  <label className="small mb-1"> Category Name </label>
                  <input
                    class="form-control  form-control-solid"
                    type="text"
                    value={categoryName}
                    placeholder="Enter Category Name"
                    onChange={handleChange}
                  />
                  <span style={{color:"red"}}>{categoryNameError}</span>
                </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  // data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleCategoryUpdate()}
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
export default UpdateCategory