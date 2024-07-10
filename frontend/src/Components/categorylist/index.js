import React, { useContext } from "react"
import CategoryLoader from "../../utils/loaders/myLoader"
import { useState } from "react"
import { useEffect } from "react"
import { CategoryListGet } from "../../services/book.service"
import { Link } from "react-router-dom"
import { CategoryContext } from "../../context/CategoryContext"

const Category = (props) => {
  const [categoryLists, setCategoryList] = useState([])
  const { categoryList } = useContext(CategoryContext)
  console.log("sbsdjhfbfhjsdfhsf",categoryList)
    return(
       <div className={props.type} style={{width:props.width}}>
                      <div className="banner_top2 p5">
                        <samp className="fl  pr5">
                          <img src="../images/img_n.png" />
                        </samp>{" "}
                        <samp className="fl  categories">Categories</samp>
                        <div className="w100p fr">
                          <span className="fl tran">English</span>{" "}
                          <span className="fr tran">Hindi</span>
                        </div>
                      </div>

                      <div className="over_home">
                        <div id="test"></div>
                        <div className="left1" id="engcat">
                      <tug>
                      <ul>
                      {categoryList.length>0 ? categoryList.map((category,index)=>{
                        return (
                          <li>
                          <Link to={`${props.page}/${category._id}`}>
                            {category.categoryName}
                          </Link>
                        </li>
                        )
                      }):<CategoryLoader />}                     
                    </ul>
                      </tug>
                        </div>
                      </div>
                    </div>

    )
}

export default React.memo(Category)