import { useEffect, useState } from "react"
import { PosterAdd } from "../services/book.service"
import { HotToaster } from "../utils/Toaster"
import { PosterVal } from "../Validation/PosterVal"

const AddPoster = (props) =>{
    const [categoryList,setCategoryList] = useState([])
    const [posterIcon,setPosterIcon] = useState("")
    const [encodedIcon,setEncodedIcon] = useState("")
    const [categoryId,setCategoryId] = useState("")
    const [fields,setFields] = useState({
      posterIcon:"",
      categoryId:"",
    })
    const [fieldsError,setFieldsError] = useState({
      posterIconError:"",
      categoryIdError:"",
    })


    useEffect(()=>{
        if(props && props.categoryList){
            setCategoryList(props.categoryList)
        }

    },[props])

    const handleChange = async(e) => {
        let name = e.target.name
        let image = name == "posterIcon" && e.target.files[0]
        let value = name == "categoryId"?e.target.value:image
        setFields(prevState=>({
          ...prevState,
          [name]:value
        }))
        // let error = await PosterVal(name,value)
        // let error = await
        // setUserInput(prevState=>({
        //   ...prevState,
        //   [name]:value
        // }
        // ))
        if(image){
            const imgata = URL.createObjectURL(image);
            setEncodedIcon(imgata)
          }
        
    }
    const handlePosterChange = async() => {
      console.log("console.log",fields);
        let formdata = new FormData()
            formdata.append("categoryId",fields.categoryId)
            formdata.append("posterIcon",fields.posterIcon)
            let result = await PosterAdd(formdata)
            resultfunction(result)
    }
    const resultfunction = (result) => {
      console.log('resltresultresult',result.message)
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
        id="add_poster"
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
                        <select 
                        className="form-control"
                        name="categoryId"
                        onChange={handleChange}
                        >
                            <option value="">Select</option>
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
                        placeholder="poster image"
                        name="posterIcon"
                        onChange={handleChange}
                      />
                      <div className="form-control">
                        <img src={encodedIcon} alt="no image choosed" width="100px" height="100px"/>
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
export default AddPoster