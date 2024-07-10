import React, { useContext } from "react"
import CategoryLoader from "../../utils/loaders/myLoader"
import { useState } from "react"
import { useEffect } from "react"
import { CategoryListGet, getBookContent } from "../../services/book.service"
import { Link, useParams } from "react-router-dom"
import { CategoryContext } from "../../context/CategoryContext"

const ChapterSection = (props) => {
  const [book, setBook] = useState([])
  const { categoryList } = useContext(CategoryContext)
  const params = useParams()
  useEffect(()=>{
    getBookCon()
  },[])

  const getBookCon =  async() => {
  const result = await getBookContent(params.id)
    if(result?.status){
      props.getFile(result?.data[0]?.bookIcon)
      setBook(result?.data[0])
    }
  }
  const handlePdfGetClick = (book) => {
    props.getFile(book)

  }
  const handleChapterChange = () => {
    let html=[]
    for(let i=0; i<book?.bookFilesData?.length; i++){
      html.push(<li onClick={()=>handlePdfGetClick(book?.bookFilesData[i]?.file)}>{book?.bookFilesData[i]?.chapter}</li>)
    }
    return html
  }

    return(
       <div className="">
                      <div className="banner_top2 p5">
                        <samp className="fl  categories">Book Files</samp>
                      </div>

                      <div className="over_home">
                        <div className="left1" id="engcat">
                      <tug>
                      <ul>
                      {book?.chapterCount ? 
                      handleChapterChange():<CategoryLoader />}                     
                    </ul>
                      </tug>
                        </div>
                      </div>
                    </div>

    )
}

export default React.memo(ChapterSection)