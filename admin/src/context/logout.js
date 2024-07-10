import { createContext, useEffect, useState } from "react"

export let logoutContext = createContext({

})
export const LogoutAfterTokenExpire = (props) => {
        const [isLogout,setIsLogout] = useState(false)

        return (
            <>
            <logoutContext.Provider value={{isLogout,setIsLogout}}>
                {props.children}
            </logoutContext.Provider>
            <LogoutModal isLogout={isLogout}/>
            </>
        )
}

const LogoutModal = ({isLogout}) =>{


  const handleClick = () => {
    localStorage.clear()
    window.location.href = "/"
  }
    return (
        <div
        class="modal"
        id="logout_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        style={{ display: isLogout ? 'block' : 'none',marginTop:"10%" }} 
      >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Your Token is Expire! You want to login again 
              </h5>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <button
                  class="btn btn-s btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={handleClick}
                >
                  OK
                </button>
            </div>
          </div>
        </div>
      </div>
            )
}
export default LogoutModal