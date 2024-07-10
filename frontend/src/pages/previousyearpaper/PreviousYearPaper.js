import React, { useState, useEffect } from "react";
import Header from "../../comman/Header";
import Footer from "../../comman/Footer";
import Category from "../../Components/categorylist";
import { CategoryListGet } from "../../services/book.service";
import { getallPreviousYearPaper } from "../../services/previousYearPaper.service";
import { useParams } from "react-router-dom";
import Papers from "../previousyearpaper/Papers";
import SlideShow from "../../Components/Slideshow/Slideshow";
import SocialIcons from "../../Components/socialmedia";

const PreviousYearPaper = () => {
    const [papersList, setPaperList] = useState([])
    const params = useParams()

    useEffect(() => {
        getPapers()
    }, [params.id])

    const getPapers = async () => {
        let data = {
            categoryId:params.id
        }
        const result = await getallPreviousYearPaper(data)
        if(result.status){
            setPaperList(result.data)
        }
        console.log("getallPreviousYearPaper",result); 

    };
    
    return (
        <>
         <SlideShow list={["asdadadas", "sdadadaddas", "dsadsasad"]}  />
            <Header />
            <SocialIcons/>
            <div className="container-fluid">
                <div className="row">
                    <div className={"col-12"}>

                        <div className="current-aff-main">
                            <div className="current-title">
                                <h4>Previous Year Paper</h4>
                            </div>
                            <div className="current-broadcum">
                                <a href="#">Home<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span></a>
                                <a href="">Previous Year Paper</a>
                            </div>
                            <div className="current-mm">
                                <div className="row current-inner">
                                    <div className="col-lg-3 current-left">
                                        <div className="current-name">Previous Year Paper</div>
                                        <div className="current-link">
                                            <div className="current-link-inner">
                                                <div className="test-cat">
                                                    <div className="over_home">
                                                        <Category page={"/previousyearpaper"}   />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-9 current-right">
                                        <div className="current-filter">

                                        </div>
                                        <div className="current-main">
                                            <div className="current-right">

                                                
                                                            <Papers data={papersList} />
                                                   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}
export default PreviousYearPaper