import { useEffect, useState } from "react"
import { ResultFunction } from "../comman/resultFunction"
import { updateFlash } from "../services/flashMessage.service"

const UpdateFlashMessage = ({data,get}) =>{
    const [message,setMessage] = useState("")
    const [id,setId] = useState("")

    useEffect(()=>{
        if(data){
            setMessage(data?.message)
            setId(data?._id)
        }
    },[data])

    const handleClick = async() => {
        let data = {
            _id:id,
            message:message
        }
        let result = await updateFlash(data)
        ResultFunction(result,get)
    }

    return (
        <div
        class="modal"
        id="edit_flash"
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
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
            )
}
export default UpdateFlashMessage