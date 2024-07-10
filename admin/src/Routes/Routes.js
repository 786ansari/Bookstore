import React,{useContext, useEffect, useState} from "react"
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import Dashboard from "../component/ui/dashboard";
import {Sidebar} from '../comman/Sidebar';
import Headers from "../comman/header";
import Categories from "../component/ui/category"
import LoginPage from "../component/ui/login";
import ForgotPassword from "../component/ui/forgotpassword"
import Users from "../component/ui/user";
import Books from "../component/ui/books";
import Poster from "../component/ui/poster";
import Notfound from "../component/ui/notFound/notFound";
import { ProfileContext } from "../component/ui/contextProvider";
import Coaching from "../component/ui/coaching";
import Staff from "../component/ui/staff";
// import AddsubAdmin from "../component/ui/subadmins/AddSubadmin";
import Review from "../component/ui/review";
import Cart from "../component/ui/cart";
import Support from "../component/ui/support";
import TrendingTitles from "../component/ui/trendingtitles";
import PromotionAndOffer from "../component/ui/promotion & offer";
import AdminInfo from "../component/ui/adminInfo";
import SocialMedia from "../component/ui/socialmedia";
import CurrentAffairs from "../component/ui/currentaffairs";
import TestSeries from "../component/ui/testseries";
import BookFiles from "../component/ui/bookfiles";
import Design from "../component/ui/design/index.js";
import PreviousYearPapers from "../component/ui/previousyearpaper/index.js";
import Typing from "../component/ui/typing/index.js";
import DataTranslatePage from "../component/ui/datatranslate/index.js";
import NewsLetter from "../component/ui/newsletter/index.js";
import FlashMessge from "../component/ui/flashmessage/index.js";
import PermotionPopup from "../component/ui/permotionpopup/index.js";
import StaffManagement from "../component/ui/staff/StaffManagement.js";
import CoachingManagement from "../component/ui/coaching/CoachingManagement.js";
import Plan from "../component/ui/plans"
const PrivateRoute = ({ element: Element }) => {
  const token = localStorage.getItem("token")

  return token ? <Element /> : <Navigate to="/" replace />;
};
const Routes = () => {
  const [routes,setRoutes] = useState([
    {
      path:"/dashboard",
      element:<PrivateRoute element={Dashboard} />
    },
    {
      path:"/users",
      element:<PrivateRoute element={Users} />
    },
    {
      path:"/categories",
      element:<PrivateRoute element={Categories} />
    },
    {
      path:"/",
      element:<LoginPage/>
    },
    {
      path:"/forgot-password",
      element:<ForgotPassword/>
    },
    {
      path:"/books",
      element:<PrivateRoute element={Books} />
    },
    {
      path:"/bookfiles",
      element:<PrivateRoute element={BookFiles} />
    },
    {
      path:"/currentaffairs",
      element:<PrivateRoute element={CurrentAffairs} />
    },
    {
      path:"/testseries",
      element:<PrivateRoute element={TestSeries} />
    },
    {
      path:"/newsletter",
      element:<PrivateRoute element={NewsLetter} />
    },
    {
      path:"/flash-message",
      element:<PrivateRoute element={FlashMessge} />
    },
    {
      path:"/permotion-popup",
      element:<PrivateRoute element={PermotionPopup} />
    },
    {
      path:"/previousyearpaper",
      element:<PrivateRoute element={PreviousYearPapers} />
    },
    {
      path:"/design",
      element:<PrivateRoute element={Design} />
    },
    {
      path:"/typingData",
      element:<PrivateRoute element={Typing} />
    },
    {
      path:"/datatranslate",
      element:<PrivateRoute element={DataTranslatePage} />
    },
    {
      path:"/posters",
      element:<PrivateRoute element={Poster} />
    },
    {
      path:"/list-staff",
      element:<PrivateRoute element={Staff} />
    },
    {
      path:"/list-coaching",
      element:<PrivateRoute element={Coaching} />
    },
    {
      path:"/add-staff",
      element:<PrivateRoute element={StaffManagement} />
    },
    {
      path:"/add-coaching",
      element:<PrivateRoute element={CoachingManagement} />
    },
    {
      path:"/reviews",
      element:<PrivateRoute element={Review} />
    },
    {
      path:"/carts",
      element:<PrivateRoute element={Cart} />
    },
    {
      path:"/plans",
      element:<PrivateRoute element={Plan} />
    },
     {
      path:"/support",
      element:<PrivateRoute element={Support} />
    },
    {
      path:"/trendingtitles",
      element:<PrivateRoute element={TrendingTitles} />
    },
    {
      path:"/promotion-and-offers",
      element:<PrivateRoute element={PromotionAndOffer} />
    },
    {
      path:"/admin-information",
      element:<PrivateRoute element={AdminInfo} />
    },
    {
      path:"/social-media",
      element:<PrivateRoute element={SocialMedia} />
    },
    {
      path:"/*",
      element:<Notfound/>
    }
  ])
  const token = localStorage.getItem('token');
  const [profileState] = useContext(ProfileContext);
  useEffect(()=>{
      // let token = localStorage.getItem("token")
      // console.log("tokentoken",token,profileState)
      // if(!token || !profileState.token){
      //   window.location.replace("/")
      // }

  },[])
    
    let Routes =  routes.map((route,i)=>{
        return {
          path:route.path,
          element:route.path == "/" || route.path == "/*" || route.path == "/forgot-password" ?route.element:(
            <>
            <Headers/>
            <div id="layoutSidenav">
            <Sidebar/>
            {route.element}
            </div>
            </>
          )
        }
      // }
      
    })
    const router = createBrowserRouter(
        Routes
      );
    return(
        <>
        <RouterProvider router={router}/>
        </>
    )
}

export default Routes