import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';
import Body from './Body';
import CartApp from './cart';
import CartAppFooter from './Footer';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LogInForm } from "./Header";

export const AppComponent=()=>{
    return (
        <>
           <Header/>
           <div>SearchHere</div>
           <Body/>
           <CartAppFooter/> 
        </>
    );     
};

export const App=()=>{
    return (
        <>
           <div>Welcome to About tab</div>
           <div>SearchHere</div>   
        </>
    );     
};

export const AppContact=()=>{
    return (
        <>
           <div>Welcome to Contact tab</div>
           <div>SearchHere</div>   
        </>
    );     
};

export const AppHome=()=>{
    return (
        <>
           <div>Welcome to Home tab</div>
           <div>SearchHere</div>   
        </>
    );     
};

export const AppCart=()=>{
    return (
        <>
           <div>Welcome to Cart tab</div>
           <div>SearchHere</div>   
        </>
    );     
};

const appRouter=createBrowserRouter([
    //     {
    //         path:"",
    //         element:<LogInForm/>,
    //    },
        {
                path:"/",
                element:<AppComponent/>,
        },
        {
            path:"/app",
            element:<App/>,
        },
        {
                path:"/login",
                element:<LogInForm/>,
        },
        {
            path:"/appContact",
            element:<AppContact/>,
        },
        {
            path:"/home",
            element:<AppHome/>,
        },
        {
            path:"/cart",
            element:<CartApp/>,
        },

]);

//select root element
const rootElement=document.getElementById('root');

//create root element
const root=ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={appRouter}/>);