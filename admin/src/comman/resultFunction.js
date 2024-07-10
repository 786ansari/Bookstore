import { HotToaster } from "../utils/Toaster"

export const ResultFunction = (result,fun,state) => {
    if(result.status){
        HotToaster(result.status,result.message)
        fun()
        state?.length>0 &&state.map((item)=>{
          return item("")
        })
      }
      else{
        HotToaster(result.status,result.message)
      }
}