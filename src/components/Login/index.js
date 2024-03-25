import React from 'react';
import LoginPage, { Reset,Input, Logo, Password, Footer,Submit, Username } from '@react-login-page/page7';
import LoginLogo from 'react-login-page/logo-rect';
import { useNavigate } from "react-router-dom";
import {Link} from '@mui/material/';
import Header from "../Header/";
import FooterOfPage from "../Footer/";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import axios from 'axios';


const Login = () =>{
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loader,setLoader]= useState(false)

  const[formData,setFormData]=useState(
    {
      username:"",
      password:""
    }
  );

  function handleFormChange (e) {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  
  }
  

  const login = async (formData) => {
    try {
      if(validateInput(formData)){
        setLoader(true)
        let res = await axios.post(`${API_BASE_URL}/users/login`,
      {
        email:formData.email,
        password:formData.password
      }) 
      persistLogin(res.data.token,res.data.userId)
      if (res.status===201){
        enqueueSnackbar('Logged in successfully',{
          variant:'success'
        })

        navigate('/')
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
    if (data.email===""|| data.email === undefined || data.email.trim() === "") {
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


  const persistLogin = (token, userId) => {
    localStorage.setItem('token',token);
    localStorage.setItem('userId',userId);
   
  };


  return (
  <>
  <Header />
  <LoginPage style={{ height: "100vh",width : "100vw" }}>
    <Logo>
      <LoginLogo />
    </Logo>
    <Username visible={false} />
    <Input type='email' id='email' name="email" index={0} placeholder="email" value={formData.email} onChange={handleFormChange}/>
    <Password id="password" name="password" value={formData.password} onChange={handleFormChange} />
    <Submit onClick={()=>{login(formData)}} />
    <Footer>
      Not a member? <Link underline="hover" href="/register">Sign up now</Link>
    </Footer>
  </LoginPage>
  <FooterOfPage />
  </>
);
}
export default Login;