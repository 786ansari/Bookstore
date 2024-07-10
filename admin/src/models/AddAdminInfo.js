import { useState } from "react"
import { ResultFunction } from "../comman/resultFunction"
import { addAdminInformation } from "../services/admin.service"

const AddAdminInfo = (props) =>{
    const [emailId,setEmailId] = useState("")
    const [mobileNum,setMobileNum] = useState("")
    const [address,setAddress] = useState("")
    const [whatsAppNumber,setWhatsAppNumber]  = useState("")

    const handleMobileNumberChange = (e,index) => {
        let value = e.target.value
        setMobileNum(value);
    }
    const handleAdminInfoChange = async() => {
        let data = {
            emailId:emailId,
            mobileNumber:mobileNum,
            address:address,
            whatsAppNumber:whatsAppNumber
        }
        let result = await addAdminInformation(data)
        ResultFunction(result,props.getData)
    }

    return (
        <div
        class="modal"
        id="add_admininfo"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Admin Info
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
                        type="email"
                        required
                        placeholder="Email Address"
                        name="heading"
                        value={emailId}
                        onChange={(e)=>{setEmailId(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Mobile Number"
                        name="mobile"
                        required
                        value={mobileNum}
                        onChange={(e)=>{
                            handleMobileNumberChange(e)
                        }}
                      />
                      </div>
                      <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Whats App Number"
                        name="whatsAppNumber"
                        required
                        value={whatsAppNumber}
                        onChange={(e)=>{setWhatsAppNumber(e.target.value)}}
                      />
                      </div>
                <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                        name="address"
                        required
                        value={address}
                        onChange={(e)=>{
                            setAddress(e.target.value)
                        }}
                      />
                    </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleAdminInfoChange()}
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
export default AddAdminInfo