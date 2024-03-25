import React from 'react';
import LoginPage, { Reset,Input, Logo, Password, Footer, Username, Submit } from '@react-login-page/page7';
import LoginLogo from 'react-login-page/logo-rect';
import { useNavigate } from "react-router-dom";
import {Link} from '@mui/material/';
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useSnackbar } from "notistack";
import Header from "../Header/";
import FooterOfPage from "../Footer/";


const Register = () =>{
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [loader,setLoader]= useState(false)
  const[formData,setFormData]=useState(
    {
      username:"",
      email:"",
      password:""
    }
  )
 
  function handleFormChange (e) {
   
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  
  }

  const register = async (formData) => {

    try {
      if(validateInput(formData)){
        setLoader(true)
        let res = await axios.post(`${API_BASE_URL}/users/register`,
      {
        username:formData.username,
        email:formData.email,
        password:formData.password
      }) 
      console.log(res.status);
      if (res.status===201){
        enqueueSnackbar('Registered Successfully',{
          variant:'success'
        })
        navigate('/login')
      }
      
      }
      
    } catch (e) {
      if (e.response && e.response.status===400){
        enqueueSnackbar(e.response.data.message,{
          variant:'error'
        })
      } else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON",{
          variant:'error'
        })
      }
     
    }

    finally {
      setLoader(false)
    }
  };


  const validateInput = (data) => {
    if (data.username===""|| data.username === undefined || data.username.trim() === "") {
      enqueueSnackbar("Username is a required field",{
        variant:'error'
      })
    return false;
    }
 
    if (data.password==="") {
      enqueueSnackbar("Password is a required field",{
        variant:'error'
      })
    return false;  
    }
    
    if (data.password.length<6) {
      enqueueSnackbar("Password must be at least 6 characters",{
        variant:'error'
      })
     return false; 
    }   
    
    return true;
      };
    

  const heading = () => {
   const data =  document.querySelector(".login-page4-logo + div").textContent="Register";
return data
}

setTimeout(()=>{
    heading();
},50)
  
  return (
  <>
  <Header />
  <LoginPage style={{ height: 890 }}>
    
    <Logo>
      <LoginLogo />
    </Logo>
   
    <Input type='email' id='email' name="email" index={1} placeholder="email" value={formData.email} onChange={handleFormChange}/>
    <Username id="username" title="Username" value={formData.username} onChange={handleFormChange} />
    <Password id="password" name="password" value={formData.password} onChange={handleFormChange} />
    <Submit onClick={()=>{register(formData)}}/>
    <Footer>
      Already a member? <Link underline="hover" href="/Login">Login now</Link>
    </Footer>
    
   
  </LoginPage>
  <FooterOfPage />
  
  </>
);

}
export default Register;