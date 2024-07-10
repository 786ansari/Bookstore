import React, { useState, useEffect } from "react";
import { getCurrentAffairs } from "../../services/currrentaffairs.service"  
import { imageUrl } from "../../services/dataurl";
const DailyCurrent = (props) => {

  return (
    <div className="current-affier-show">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2">
          <div className="plan-fr">
            PLAN
          </div>
        </div>
     </div>

{/*======================== end ==============================*/}
{
  props && props.data.map((item,i)=>{
    return <div className="row cur-inn">
        <div className="col-lg-2">
          <div className="date-cu">
            <p>{item._id} </p>
          </div>
        </div>
          {
            item.documents.map((val,i)=>{
             return  <div className="col-lg-2">
              {console.log("sdmfbsdfbsdfnbsd",val)}
          <div className="curr-but">
            {/* <a href={imageUrl+val.file} className="current-img" target="_black" download> */}
            <a href="#" className="current-img" onClick={()=>props.getFile(val)}>
              <p>{val.fileType.toUpperCase()} <span><i class="fa fa-download" aria-hidden="true"></i></span></p>
            </a>
          </div>
        </div>
            })
          }
        </div>
  })
}
    </div>
  )
}
export default DailyCurrent;