import {  useState } from "react"
import { ResultFunction } from "../comman/resultFunction"
import { addPermotionPopupData } from "../services/permotionpopup.service"

const AddPermotionPopup = ({get}) =>{
    const [link,setLink] = useState("")
    const [modalIcon,setModalIcon] = useState("")
    const [encodedIcon,setEncodedIcon] = useState("")

    const handleImageChange = (e) => {
        let image = e.target.files[0]
        setModalIcon(image)
        if(image){
            const imgata = URL.createObjectURL(image);
            setEncodedIcon(imgata)
          }
    }
    const handleClick = async() => {
        let formdata = new FormData()
        formdata.append("link",link)
        formdata.append("modalIcon",modalIcon)
        let result = await addPermotionPopupData(formdata)
        ResultFunction(result,get)
        setModalIcon('')
        setLink("")
    }

    return (
        <div
        class="modal"
        id="add_popup"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Permotion Popup
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
                     <input
                        className="form-control"
                        type="text"
                        placeholder="Permotion Link"
                        name="link"
                        value={link}
                        onChange={(e)=>{setLink(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                     <input
                        className="form-control"
                        type="file"
                        placeholder="Permotion Icon"
                        name="modalIcon"
                        // value={link}
                        onChange={handleImageChange}
                      />
                    </div>
                    <img src={encodedIcon}/>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={handleClick}
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
export default AddPermotionPopup