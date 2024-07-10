import React,{useContext, useEffect, useState} from "react"
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import Cart from "../pages/cart";
import BookDetails from "../pages/bookdetails";
import BooksCategory from "../pages/booksaccordingtocategory";
import Checkout from "../pages/checkout";
import Profile from "../pages/profile";
import CurrentAffairs from "../pages/currentaffairs";
import Design from "../pages/design";
import EbookAndNotes from "../pages/ebook/EbookAndNotes";
import PreviousYearPaper from "../pages/previousyearpaper/PreviousYearPaper";
import TestSeries from "../pages/testseries/TestSeries";
import Typing from "../pages/typing";
import DataTranslate from "../pages/datatranslate/DataTranslate";
import SocialMediaProvider from "../context/SocialMediaContext";
import AuthProvider from "../context/AuthContext";
import AdminProvider from "../context/AdminInfoContext";
import CategoryProvider from "../context/CategoryContext";
import { Terms } from "../pages/terms";
import BookContent from "../pages/bookcontent";
import Subscription from "../pages/subscription";
 


const Routes = () => {
  const [routes,setRoutes] = useState([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/cart",
      element:<Cart/>
    },
    {
      path:"/bookdetails/:id",
      element:<BookDetails/>
    },
    {
      path:"/bookcontent/:id",
      element:<BookContent/>
    },
    {
      path:"/books/:id",
      element:<BooksCategory/>
    },
    {
      path:"/checkout",
      element:<Checkout/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/currentaffairs",
      element:<CurrentAffairs/>
    },
    {
      path:"/design",
      element:<Design/>
    },

    {
      path:"/ebooks",
      element:<EbookAndNotes/>
    },
    {
      path:"/ebooks/:id",
      element:<EbookAndNotes/>
    },

    {
      path:"/previousyearpaper",
      element:<PreviousYearPaper/>
    },
    {
      path:"/previousyearpaper/:id",
      element:<PreviousYearPaper/>
    },
    {
      path:"/testseries",
      element:<TestSeries/>
    },
    {
      path:"/testseries/:id",
      element:<TestSeries/>
    },
    {
      path:"/typing",
      element:<Typing/>
    },
    {
      path:"/terms&condition",
      element:<Terms/>
    },
    {
      path:"/datatranslate",
      element:<DataTranslate/>
    },
    {
      path:"/subscription-plan",
      element:<Subscription/>
    },
    {
        path:"/*",
        element:<NotFound/>
      }

  ])
    
    let Routes =  routes.map((route,i)=>{
        return {
          path:route.path,
          element:route.path == "/" || route.path == "/*" ?route.element:(
            <>
            {route.element}
            </>
          )
        }
    })
    const router = createBrowserRouter(
        Routes
      );
    return(
        <>
        <AuthProvider>
          <AdminProvider>
            <CategoryProvider>
            <SocialMediaProvider>
              <RouterProvider router={router}/>
            </SocialMediaProvider>
            </CategoryProvider>
          </AdminProvider>
        </AuthProvider>
        </>
    )
}

export default Routes