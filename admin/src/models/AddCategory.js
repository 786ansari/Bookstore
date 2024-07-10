import { useState } from "react"
import {Categories} from "../Validation/Categories"
import { HotToaster } from "../utils/Toaster"
import  {ResultFunction} from "../comman/resultFunction"
import { CategoryAdd } from "../services/book.service"
import { ModelClose } from "../utils/ModelClose"

export const AddCategory = (props) => {
  const [categoryName,setCategoryName] = useState()
  const [categoryNameError,setCategoryNameError] = useState()


  const handleChange = async(e) => {
    let {name, value} = e.target
    setCategoryName(e.target.value)
    let error = await Categories(value)
    setCategoryNameError(error)
  }
  const handleCategoryAdd = async() => {
    let error = await Categories(categoryName)
    setCategoryNameError(error)
    if(error || categoryNameError)return null;
    let data = {
      categoryName:categoryName
    }
    let result = await CategoryAdd(data)
    ModelClose('add_category_close_button')
    ResultFunction(result,props.categoryList,setCategoryName)
  }

  return (
    <div
    class="modal"
    id="add_category"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog  alert_modal" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">
            Add category
          </h5>
          <button
            class="btn-close"
            type="button"
            id="add_category_close_button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group mb-3 ">
              <label className="small mb-1"> Category Name </label>
              <input
                class="form-control  form-control-solid"
                type="text"
                name="category"
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
              onClick={() => handleCategoryAdd()}
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

export default AddCategory