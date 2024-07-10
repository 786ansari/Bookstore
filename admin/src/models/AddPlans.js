import { useState } from "react"
import { ResultFunction } from "../comman/resultFunction"
import { addSubscriptionPlans } from "../services/plans.service"

const AddPlans = (props) =>{
    const [title,setTitle] = useState("")
    const [amount,setAmount] = useState(0)
    const [days,setDays] = useState(0)

   
    const handlePlanChange = async() => {
        let data = {
            title:title,
            amount:amount,
            days:days
        }
        let result = await addSubscriptionPlans(data)
        ResultFunction(result,props.getData,[setTitle,setAmount,setDays])
    }

    return (
        <div
        class="modal"
        id="add_plans"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Plan Info
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
                Plan Title
                     <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                     Plan Amount
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter Amount"
                        name="amount"
                        required
                        value={amount}
                        onChange={(e)=>{
                            setAmount(e.target.value)
                        }}
                      />
                      </div>
                      <div className="form-group mb-3">
                      Plan Days
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Whats App Number"
                        name="days"
                        required
                        value={days}
                        onChange={(e)=>{setDays(e.target.value)}}
                      />
                      </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handlePlanChange()}
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
export default AddPlans