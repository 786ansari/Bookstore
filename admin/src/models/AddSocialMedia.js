import { useState } from "react"
import { ResultFunction } from "../comman/resultFunction"
import { addSocialMediaurl } from "../services/socialmedia.service"

const AddSocialMedia = (props) =>{
    const [facebook,setFacebook] = useState("")
    const [instagram,setInstagram] = useState("")
    const [whatsapp,setWhatsapp] = useState("")
    const [linkedin,setLinkedin] = useState("")
    const [youtube,setYoutube] = useState("")
    const [twitter,setTwitter] = useState("")
    const [telegram,setTelegram] = useState("")


    const handleSocialMediaUrl = async() => {
        let data = {
            facebook:facebook,
            instagram:instagram,
            whatsapp:whatsapp,
            linkedin:linkedin,
            youtube:youtube,
            twitter:twitter,
            telegram:telegram

        }
        let result = await addSocialMediaurl(data)
        ResultFunction(result,props.getData)
        // ResultFunction(result,props.allNews)
        // setHeading("")
        // setNews("")
    }

    return (
        <div
        class="modal"
        id="add_socialmedia"
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
                        type="text"
                        required
                        placeholder="Facebook Url"
                        name="facebook"
                        value={facebook}
                        onChange={(e)=>{setFacebook(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                     <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Instagram Url"
                        name="instagram"
                        value={instagram}
                        onChange={(e)=>{setInstagram(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                     <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Whatsapp Url"
                        name="whatsapp"
                        value={whatsapp}
                        onChange={(e)=>{setWhatsapp(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                     <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Linkedin Url"
                        name="linkedin"
                        value={linkedin}
                        onChange={(e)=>{setLinkedin(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                     <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Youtube Url"
                        name="youtube"
                        value={youtube}
                        onChange={(e)=>{setYoutube(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                     <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Telegram Url"
                        name="telegram"
                        value={telegram}
                        onChange={(e)=>{setTelegram(e.target.value)}}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Twitter Url"
                        name="twitter"
                        required
                        value={twitter}
                        onChange={(e)=>{
                            setTwitter(e.target.value)
                        }}
                      />
                    </div>
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleSocialMediaUrl()}
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
export default AddSocialMedia