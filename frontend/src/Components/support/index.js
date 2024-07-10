import React, { useEffect, useState } from "react";
import { AddSupport } from "../../services/support.service";
import { HotToaster } from "../../utils/Toaster";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
const FeedbackForm = (props) => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [tcName, setTcName] = useState("");
  const [type, setType] = useState("");
  const [relatedTo, setRelatedTo] = useState("");
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);


  useEffect(() => {
    setIsOpenFeedback(props.isOpenFeedback);
  }, [props]);

  const handleCloseDialogFeedback = (event, reason) => {
    setIsOpenFeedback(false);
  };


  const handleChange = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    switch (name) {
      case "type":
        return setType(value);
      case "inquiry_related_to":
        return setRelatedTo(value);
      case "tcname":
        return setTcName(value);
        case "emailId":
          return setEmailId(value);
        case "mobileId":
          return setMobileNumber(value);
        case "inquiry_message":
          return setMessage(value);
      default:
        return value;
    }
  };
  const emptyState = () => {
    setEmailId("");
    setMobileNumber("");
    setMessage("");
    setType("");
    setRelatedTo("");
    setTcName("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      type:type,
      relatedTo:relatedTo,
      tcName:tcName,
      emailId: emailId,
      mobileNumber: mobileNumber,
      message: message,
    };
    let result = await AddSupport(data);
    HotToaster(result.status, result.message);
    handleCloseDialogFeedback()
    emptyState();
  };

  return (
    <Dialog open={isOpenFeedback} onClose={handleCloseDialogFeedback}>
      <DialogActions>
        <Button onClick={handleCloseDialogFeedback} className="close-btn"><i class="fa fa-times-circle-o" aria-hidden="true"></i></Button>
      </DialogActions>
      <DialogContent>
        <h4 className="cust-p">
          <h5>DEAR VALUED COACHING / TEACHER,</h5>
                 <h6> We prioritize your satisfaction. Respecting your time, 
                  visit our FAQs for general inquiries. If unanswered, 
                  feel free to ask below, email us at care@coachingtest.in, 
                  or call +91 7017944662, +91 7417109998.
                  Every query is valued and we aim to respond within 1 working day</h6>
                 
        </h4>
          
         <div className="feed-form-main row"> 

        <form style={{ margin: "10px", padding: "5px,5px,5px,5px" }}>
          <div className="form-group">
            <label for="staticEmail" class="col-sm-12 col-form-label"> Type<span>*</span></label>
            <select className="col-sm-12" name="type" onChange={handleChange} value={type}>
            <option value="">Select</option>
              <option value="enquiry">Enquiry</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          <div className="form-group">
            <label>Related to<span>*</span></label>
            <select name="inquiry_related_to" id="inquiry_related_to" onChange={handleChange} value={relatedTo} className="col-sm-12">
              <option value="">-- Select --</option>
              <option value="Current Affairs">Current Affairs</option>
              <option value="Test Series">Test Series</option>
              <option value="E-Book/Notes">E-Book/Notes</option>
              <option value="Design">Design</option>
              <option value="Typing">Typing</option>
              <option value="Data Translate">Data Translate</option>
              <option value="Previous Year Paper">Previous Year Paper</option>
              <option value="Payment">Payment</option>
              <option value="Shopping">Shopping</option>
              <option value="Newsletter">Newsletter</option>
              <option value="Sign Up">Sign Up</option>
              <option value="Login">Login</option>
              <option value="Social Media">Social Media</option>
              <option value="Sales (For Coaching, Teacher)">Sales (For Coaching, Teacher)</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Coaching/Teacher Name<span>*</span>
            </label>
             <input type="text" name="tcname" onChange={handleChange} value={tcName} />
          </div>
          <div class="form-group row">
            <label for="inputEmail" class="col-sm-12 col-form-label">Email<span>*</span></label>
            <div class="col-sm-12">
              <input type="text" name="emailId" class="form-control" id="staticEmail" placeholder="Enter your email" onChange={handleChange} value={emailId} />
            </div>
          </div>
          <div className="form-group">
              <label>Mob. No.<span>*</span></label>
              <input type="tel" name="mobileId" className="col-sm-12" onChange={handleChange} value={mobileNumber}/>
          </div> 
          <div className="form-group">
             <label>Message<span>*</span></label>
             <textarea className="col-sm-12" name="inquiry_message" onChange={handleChange} value={message}  >

             </textarea>
          </div>        

          <div className="field-button" style={{ position: 'relative' }}>
          <button className="btn-blue esub" type="button" onClick={handleCloseDialogFeedback}>
              Cancel
            </button>
            <button className="btn-blue esub" type="submit" onClick={handleSubmit}>
              Submit
            </button>
            <span className="loader"></span>
          </div>
          <span id="nmsg"></span>
        </form>

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
