import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {imageUrl} from "../../services/dataurl" 
const PermotionPopup  = ({data}) => {
    const [isPopupOpen,setIsPopupOpen] = useState(false)
    useEffect(()=>{
        if(data?.length>0){
            setIsPopupOpen(true)
        }
        else{
            setIsPopupOpen(false)
        }
  },[data])
    
      const handleCloseDialogForgot = (event, reason) => {
        setIsPopupOpen(false)
      };
    return (
        <Dialog open={isPopupOpen} onClose={handleCloseDialogForgot} >
        {/* <DialogTitle>Dialog Title</DialogTitle> */}
        <DialogActions>
          <Button onClick={handleCloseDialogForgot}>Close</Button>
        </DialogActions>
        <DialogContent>
          {console.log("datadaatdatatat",data)}
                        <div className="log-top-inner">
                  {data?.length>0 && 
                  <a href = {data[0]?.link} target="_blank">
                    <img src={imageUrl + data[0]?.modalIcon} width={300} height={300}/>
                  </a>
                  }
                  </div>
           
          </DialogContent>
        
          </Dialog>

   
    )
}
export default PermotionPopup