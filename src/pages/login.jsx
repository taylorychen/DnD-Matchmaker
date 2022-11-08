import React from "react";
import Header from "../components/header";
import "../components/login.css";
import titlePNG from '../images/ddtitle.png'
import background from "../images/ddbackgroundtan.jpg";
import dice from "../images/DNDdiceRoll.gif";
//import { Row } from "react-bootstrap";


function Login(){

    /*document.body.style = 'background-image: linear-gradient(white, red);';*/

    return( 
            <div>
                <Header></Header>
                <body style={{display: 'flex', height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundImage: `url(${background})`,backgroundRepeat: 'no-repeat' }}>
                    
                    {/* <h1>Welcome to UNHINGED: A Dungeons and Dragon's Matchmaker</h1> */}
                    
                    {/* the box container */}
                    <div style={{
                        display: 'flex', 
                        height: '60vh', 
                        width:'40vw', 
                        backgroundColor: '#FFFFFF', 
                        color: 'black',
                        borderStyle: 'solid',
                        borderColor: '#9e0b0f',
                        borderRadius: '15px', 
                        borderWidth: '10px',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        }}>

                            {/* the image/title */}
                            <img src={titlePNG} alt="title" style={{
                            position: 'center',
                            alignSelf: 'center',
                            //borderStyle: 'solid',
                            order: '1',
                            height: '20vh',
                            width: '25vw',
                            // margin: '1rem 0'
                            }}/>


                            <h1>
                                    Matchmaker
                            </h1>
                            

                            {/* username*/}
                            <div className="input-container" style={{order: '3'}}>
                                <label>Username </label>
                                <br></br>
                                <input type="text" name="uname" required />
                            </div>


                            {/* password */}
                            <div className="input-container" style={{order: '4'}}>
                                    <label>Password </label>
                                    <br></br>
                                    <input type="password" name="pass" required />
                            </div>
                    
                    

                            {/* login button */}
                            <button onClick="sayHello()" style={{order: '5', height: '4vh', width: '6vw'}}>
                                Login
                            </button>

                             <div style={{order: '6'}}> don't have an account? </div>

                              {/* create account */} 
                            <button onClick="sayHello()" style={{order: '7'}}>
                                create account
                            </button> 
                    
                    </div>

                    <img src={dice} alt="loading..." style={{
                            position: 'absolute',
                            height: '25%',
                            bottom: '0px', 
                            right: '0px',
                            
                    }}/>
                                  
                
                    {/* <div className='flex justify-center items-center h-full'>
                        <h2 className='text-4xl font-bold text-center py-4'>BRAND</h2>
                        <div className='flex justify-between py-8'>

                        </div>
                        <div className='flex flex-col nb-4'>
                            <label>Username</label>
                            <input className='border relative big-gray-100 p-2' type="text" />

                        </div>
                    </div> */}

                    
                </body>
            </div>
        
    );
}

export default Login;