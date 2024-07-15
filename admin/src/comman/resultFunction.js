import { HotToaster } from "../utils/Toaster"

export const ResultFunction = async(result,fun,state) => {
  console.log("insdieresultfunction",result)
    if(result.status){
        HotToaster(result.status,result.message)
        await fun()
        // state?.length>0 && state.map((item)=>{
        //   return item("")
        // })
      }
      else{
        HotToaster(result.status,result.message)
      }
}