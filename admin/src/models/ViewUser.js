import { imageUrl } from "../services/dataurl"
import moment from "moment"

const ViewUser = ({user}) => {
    console.log("useruseruseruser",user)
        
            return (
                <div
                class="modal"
                id="view_user"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog  alert_modal" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">
                        User Details
                      </h5>
                      <button
                        class="btn-close"
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                        {user?.name && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Name</label>
                                <p>{user?.name}</p>  
                            </div>
                        </div>}
                        {user?.emailId && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Email Id</label>
                                <p>{user?.emailId}</p>  
                            </div>
                        </div>}
                        {user?.mobileNumber && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Mobile Number</label>
                                <p>{user?.mobileNumber}</p>  
                            </div>
                        </div>}
                        {user?.dob && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Date of Birth</label>
                                <p>{user?.dob}</p>  
                            </div>
                        </div>}
                        {user?.profileIcon && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Profile Picture</label>
                                <img src={imageUrl+user?.profileIcon} alt="profile_icon" width={100} height={100}/>  
                            </div>
                        </div>}
                        {user?.gender && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Gender</label>
                                <p>{user?.gender}</p>  
                            </div>
                        </div>}
                       {user?.address1 && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Address 1</label>
                                <p>{user?.address1}</p>  
                            </div>
                        </div>}
                        {user?.address2 && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Address 2</label>
                                <p>{user?.address2}</p>  
                            </div>
                        </div>}
                        {user?.city && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>City</label>
                                <p>{user?.city}</p>  
                            </div>
                        </div>}
                        {user?.state && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>State</label>
                                <p>{user?.state}</p>  
                            </div>
                        </div>}
                        {user?.country && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Country</label>
                                <p>{user?.country}</p>  
                            </div>
                        </div>}
                        {user?.pincode && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Pincode</label>
                                <p>{user?.pincode}</p>  
                            </div>
                        </div>}
                        {console.log("users,",user.is_active,user.is_deleted)}
                        {user && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Active</label>
                                <p>{user?.is_active?"True":"False"}</p>  
                            </div>
                        </div>}
                        {user && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Delete</label>
                                <p>{user?.is_deleted?"True":"False"}</p>  
                            </div>
                        </div>}
                        {user?.createdAt && <div className="row">
                            <div className="col-md-12 d-flex justify-content-between">
                                <label>Account Created</label>
                                <p>{moment(user?.createdAt).format('DD/MM/YYYY')}</p>  
                            </div>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>
                    )
}
export default ViewUser