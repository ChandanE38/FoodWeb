import React from 'react';
import { useState } from 'react';
import {Link} from "react-router-dom"


export const LogInForm=()=>{

    const [ passwordValue, setPasswordValue ]=useState("");
    const [ emailValue,setEmailValue ]=useState("");


    return(
        <>
           <div>Log in with</div>
   
           <input
                type='email'
                placeholder='email'
                id='email'   
                value={emailValue}
                onChange={(e)=>{
                    setEmailValue(e.target.value)
                    }
                }      
           />

           <input
                type="password"
                placeholder='password'
                id='password'
                value={passwordValue}
                onChange={(e)=>{
                    setPasswordValue(e.target.value)
                  }
                }
           />

           <button>
               Submit
           </button>
        
        </>
    );
};

const Header=()=>{
    return (
        <div className='divHeader'>
            <a>
                 <img
                     className='HeaderImage'
                     src="https://i.pinimg.com/originals/e6/17/f1/e617f1bfb9af4d9cf132cd3dec0da072.jpg" 
                 />   
            </a>
           
           <div className='header'>

              <div className="header1">
                         <Link to="/home">
                             <div>Home</div>
                         </Link>     
              </div>

              <div className="header2">
                      <Link to="/app">
                             <div>About</div>
                      </Link>
              </div>

              <div className="header3">
                   <Link to="/appContact">
                         <div>Contact</div>
                    </Link>
              </div>
              <div className="header4">
                    <Link to="/cart">
                         <div>Cart</div>
                    </Link>
              </div>

           </div>  

           <div className='headerLog'>
                <Link to="/login">
                     <li>LogIn</li>
                </Link>
           </div>

        </div>
     
    );     

};

export default Header;