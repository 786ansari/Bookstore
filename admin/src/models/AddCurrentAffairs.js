import { useState } from "react"
import hasEmptyValue from "../validations/Category"
import { HotToaster } from "../utils/Toaster"
import  {ResultFunction} from "../comman/resultFunction"
import { currentAffairsFileAdd } from "../services/currentAffairs.service"

export const AddCurrentAffairs = (props) => {
    const[type,setType] = useState("")
    const[files,setFiles] = useState(["ppt","pdf","pptPdf","editable"])
    const[fileType,setFileType] = useState("")
    const[range,setRange] = useState("")
    const[Weekly,setWeekly] = useState(["Jan 01 - Jan 07",
    "Jan 08 - Jan 14",
    "Jan 15 - Jan 21",
    "Jan 22 - Jan 28",
    "Jan 29 - Feb 04",
    "Feb 05 - Feb 11",
    "Feb 12 - Feb 18",
    "Feb 19 - Feb 25",
    "Feb 26 - Mar 04",
    " Mar 05 - Mar 11",
    " Mar 12 - Mar 18",
    " Mar 19 - Mar 25",
    " Mar 26 - Apr 01",
    " Apr 02 - Apr 08",
    " Apr 09 - Apr 15",
    " Apr 16 - Apr 22",
    " Apr 23 - Apr 29",
    " Apr 30 - May 06",
    " May 07 - May 13",
    " May 14 - May 20",
    " May 21 - May 27",
    " May 28 - Jun 03",
    " Jun 04 - Jun 10",
    " Jun 11 - Jun 17",
    " Jun 18 - Jun 24",
    " Jun 25 - Jul 01",
    " Jul 02 - Jul 08",
    " Jul 09 - Jul 15",
    " Jul 16 - Jul 22",
    " Jul 23 - Jul 29",
    " Jul 30 - Aug 05",
    " Aug 06 - Aug 12",
    " Aug 13 - Aug 19",
    " Aug 20 - Aug 26",
    " Aug 27 - Sep 02",
    " Sep 03 - Sep 09",
    " Sep 10 - Sep 16",
    " Sep 17 - Sep 23",
    " Sep 24 - Sep 30",
    " Oct 01 - Oct 07",
    " Oct 08 - Oct 14",
    " Oct 15 - Oct 21",
    " Oct 22 - Oct 28",
    " Oct 29 - Nov 04",
    " Nov 05 - Nov 11",
    " Nov 12 - Nov 18",
    " Nov 19 - Nov 25",
    " Nov 26 - Dec 02",
    " Dec 03 - Dec 09",
    " Dec 10 - Dec 16",
    " Dec 17 - Dec 23",
    " Dec 24 - Dec 30"])
    const [Monthly,setMonthly] = useState([
      "january","fabruary","march","april","may","june","july","august","september","october","november","december"
    ])
    const[HalfYearly,setHalfYearly] = useState(["january-june","july-december"])
    const[Yearly,setYearly] = useState(["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041","2042","2043","2044","2045","2046","2047","2048","2049","2050"])
    const[file,setFile] = useState("")
    const[plan,setPlan] = useState("")
    const array = ["Daily","Weekly","Monthly","Half Yearly","Yearly"]

  const handleFileChange = (e) => {
      let file = e.target.files[0]
      let name = e.target.name
      setFile(file)
  }

  const handleSubmit = async() => {
    const formdata = new FormData()
    formdata.append("type",type)
    formdata.append("fileType",fileType)
    formdata.append("file",file)
    formdata.append("range",range)
    formdata.append("plan",plan)
    let result = await currentAffairsFileAdd(formdata)
    ResultFunction(result,props.currentAffairs)
  }

  return (
    <div
    class="modal"
    id="add_category"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog  alert_modal" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">
            Add Files
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
                  <label className="small mb-1">Select Type</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setType(e.target.value)}>
                    <option>Select</option>
                    {
                      array.map((val,i)=>{
                        return <option value={val} key={i}>{val}</option>
                      })
                    }
                  </select>
                </div>
                {type && type !== "Daily" && <div className="form-group mb-3">
                  <label className="small mb-1">Select {type} range</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setRange(e.target.value)}>
                    <option value="">Select</option>
                    {
                      (type == "Weekly" && Weekly || type == "Monthly" && Monthly || type == "Half Yearly" && HalfYearly || type == "Yearly" && Yearly).map((val,i)=>{
                        return <option value={val} key={i}>{val}</option>
                      })
                    }
                  </select>
                </div>}
                <div className="form-group mb-3">
                  <label className="small mb-1">Select Plan Type</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setPlan(e.target.value)}>
                    <option>Select</option>
                     <option value="Free">Free</option>
                     <option value="Premium">Premium</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label className="small mb-1">Select File Type</label>
                  <select
                   class="form-control  form-control-solid"
                   onChange={(e)=>setFileType(e.target.value)}>
                    <option>Select</option>
                    {
                      files.map((val,i)=>{
                        return <option value={val} key={i}>{val}</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="small mb-1">File </label>
                  <input
                    class="form-control  form-control-solid"
                    type="file"
                    name="file"
                    placeholder=""
                    onChange={handleFileChange}
                  />
                </div>
            <button
              class="btn btn-s btn-indigo btn-block w-100"
              data-bs-dismiss="modal"
              type="button"
              onClick={() => handleSubmit()}
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

export default AddCurrentAffairs