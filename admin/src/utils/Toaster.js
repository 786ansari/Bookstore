import { toast } from "react-hot-toast"

export const HotToaster = (boolean,message) => {
    if(boolean){
        toast.success(message)
    }
    else{
        toast.error(message)
    }

}