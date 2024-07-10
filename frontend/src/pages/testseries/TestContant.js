import React,{useState, useEffect} from "react";
import { imageUrl } from "../../services/dataurl"
const TestContant = (props) =>{
    return(
        <div className="current-affier-show">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-2">
        <div className="plan-fr">
            Subject/Topic
            </div>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2"></div>
        <div className="col-lg-2">
          <div className="plan-fr">
            PLAN
          </div>
        </div>
     </div>

{/*======================== start ==============================*/}
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
             return  <>
             {/* <div className="col-lg-2 col-pading">
          <div className="date-cu">
            <p>{val.subject}</p>
          </div>
        </div> */}
             <div className="col-lg-2">
          <div className="curr-but">
            {/* <a href={imageUrl+val?.file} className="current-img" target="_blank" download> */}
            <a href="#" className="current-img" onClick={()=>props.getFile(val)}>
              <p>{val.fileType.toUpperCase()} <span><i class="fa fa-download" aria-hidden="true"></i></span></p>
            </a>
          </div>
        </div>
        </>
            })
          }
        </div>
  })
}
  {/* <div className="row cur-inn">
        <div className="col-lg-2 col-pading">
          <div className="date-cu">
            <p>15 September 2023 </p>
          </div>
        </div>
        <div className="col-lg-2 col-pading">
          <div className="date-cu">
            <p>Full Test</p>
          </div>
        </div>

        <div className="col-lg-1 col-pading">
          <div className="curr-but">
            <a href="https://ab2software.com/sample.pdf" className="current-img" download>
              <p>PDF <span><i class="fa fa-download" aria-hidden="true"></i></span></p>
            </a>
          </div>
        </div>

        <div className="col-lg-1 col-pading">
          <div className="curr-but">
            <a href="https://ab2software.com/sample.pdf" className="current-img" download>
              <p>PPT <span><i class="fa fa-download" aria-hidden="true"></i></span></p>
            </a>
          </div>
        </div>

        <div className="col-lg-2 col-pading">
          <div className="curr-but">
            <a href="https://ab2software.com/sample.pdf" className="current-img" download>
              <p>PDF + PPT <span><i class="fa fa-download" aria-hidden="true"></i></span></p>
            </a>
          </div>
        </div>

        <div className="col-lg-2 col-pading">
          <div className="curr-but">
            <a href="https://ab2software.com/sample.pdf" className="current-img" download>
              <p>EDITABLE FILE <span><i class="fa fa-download" aria-hidden="true"></i></span></p>
            </a>
          </div>
        </div>

        <div className="col-lg-2 col-pading">
          <div className="curr-but">
            <a href="https://ab2software.com/sample.pdf" className="current-img" download>
              <p>FREE</p>
            </a>
          </div>
        </div>
        </div> */}
        {/*======================== end ==============================*/}


      
    </div>
    )
}

export default TestContant