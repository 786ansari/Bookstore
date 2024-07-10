import React, {useState, useEffect} from "react";
import Header from "../../comman/Header";
import Footer from "../../comman/Footer";
import { getAllDesign } from "../../services/design.service"
import Design from "./Design";
import SocialIcons from "../../Components/socialmedia"
import SlideShow from "../../Components/Slideshow/Slideshow";

const MainIndex =() =>{
    const [tabSelected, setTabSelected] = useState("Social Media");
    const [designList,setDesignList] = useState([])
    useEffect(()=>{
        getDesign()
    },[tabSelected])

    const getDesign = async() => {
        let data = {
            designType:tabSelected
        }
        let result = await getAllDesign(data)
        if(result.status){
            setDesignList(result.data)
        }
        console.log("sdsdjfbsdjhbsdjsd",result);
    }

    return(
        <>
                <SlideShow list={["asdadadas", "sdadadaddas", "dsadsasad"]} />
               <div className="container-fluid">
            <div className="row">
                <div className={"col-12"}>
                    <Header />
                    <div className="current-aff-main">
                        <div className="current-title">
                            <h4>Design</h4>
                        </div>
                        <div className="current-broadcum">
                            <a href="#">Home<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span></a>
                            <a href="#">Design</a>
                        </div>
                        <div className="current-mm">
                        <div className="row current-inner">                        
                            <div className="col-lg-2 current-left">
                            <div className="current-name">Design</div>
                                <div className="current-link">
                                    <div className="current-link-inner">
                                        <ul>
                                            <li><a className={tabSelected == "Social Media" ? "active" : ""} href="#" onClick={() => setTabSelected("Social Media")}>Social Media </a></li>
                                            <li><a className={tabSelected == "Book Cover" ? "active" : ""} href="#" onClick={() => setTabSelected("Book Cover")}>Book Cover </a></li>
                                            <li><a className={tabSelected == "Visiting Card" ? "active" : ""} href="#" onClick={() => setTabSelected("Visiting Card")}>Visiting Card </a></li>
                                            <li><a className={tabSelected == "Other" ? "active" : ""} href="#" onClick={() => setTabSelected("Other")}>Other </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 current-right">
                            <SocialIcons  />
                                <div className="current-main">
                                    <div className="current-right">
                                     <Design design={designList}/>  
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>

        </>
    )
}

export default MainIndex