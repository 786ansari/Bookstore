import React, { useContext } from "react"
import CategoryLoader from "../../utils/loaders/myLoader"
import { useState } from "react"
import { useEffect } from "react"
import { CategoryListGet } from "../../services/book.service"
import { Link } from "react-router-dom"
import { CategoryContext } from "../../context/CategoryContext"

const FileSection = ({file}) => {
  const [categoryLists, setCategoryList] = useState([])
  const { categoryList } = useContext(CategoryContext)
    return(
       <div className="">
                      <div className="banner_top2 p5">
                      </div>
                      <div className="over_home">
                        <div className="left1" id="engcat">
                      <tug>
                      <ul>
                        <iframe  src={file} alt="PDF Preview" width="100%" height="500px"></iframe>               
                    </ul>
                      </tug>
                        </div>
                      </div>
                    </div>

    )
}

export default React.memo(FileSection)