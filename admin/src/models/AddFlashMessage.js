import {  useState } from "react"
import { ResultFunction } from "../comman/resultFunction"
import { addFlash } from "../services/flashMessage.service"

const AddFlashMessage = (props) =>{
    const [message,setMessage] = useState("")

    const handleClick = async() => {
        let data = {
            message:message,
        }
        let result = await addFlash(data)
        ResultFunction(result,props.get)
        setMessage('')
    }

    return (
        <div
        class="modal"
        id="add_flash"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Flash Message
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
                        placeholder="Flash Message"
                        name="message"
                        value={message}
                        onChange={(e)=>{setMessage(e.target.value)}}
                      />
                    </div>
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
export default AddFlashMessage