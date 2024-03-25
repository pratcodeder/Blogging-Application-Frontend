import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from '@mui/material/';
import { API_BASE_URL } from "../config";



export default function ResponsiveDialog({id}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
 

  const { enqueueSnackbar } = useSnackbar();
  const [loader,setLoader]= useState(false)
  const navigate = useNavigate();
  const[formData,setFormData]=useState(
    {
      title:"",
      content:"",
      
    }
  )

  function handleFormChange (e) {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  
  }


  
  const register = async (e,formData) => {
    let blogId= e.target.id ;
    console.log(blogId);
    try {
      let res;
      if(validateInput(formData)){
        setLoader(true)
        {blogId ? 
          (res=await axios.put(`${API_BASE_URL}/blogs/${blogId}`,
          {
            title:formData.title,
            content:formData.content
          },
          {
            headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
             'Content-Type':'application/json',
          }
        }
          ) )
        :
        (res= await axios.post(`${API_BASE_URL}/blogs/`,
        {
          title:formData.title,
          content:formData.content
        },
        {
          headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
           'Content-Type':'application/json',
        }
      }
        ) )
        }
      
      if (res.status===201){
        enqueueSnackbar('Blog Posted Successfully',{
          variant:'success'
        })       
      
      
      }
      handleClose();
      window.location.reload()
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
    if (data.title===""|| data.title === undefined || data.title.trim() === "") {
      enqueueSnackbar("Title is a required field",{
        variant:'error'
      })
    return false;
    }
    
    
    if (data.content==="") {
      enqueueSnackbar("Content is a required field",{
        variant:'error'
      })
    return false;  
    }
        
    return true;
      };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment >
      {id ?
      
      <Button  variant="outlined" onClick={handleClickOpen}>
      update
    </Button> 
    :
    <Button variant="contained" onClick={handleClickOpen}>
    Post Blog
  </Button>
    }
     
      <Dialog
      
        
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Title :"}
        </DialogTitle>       
        
        <DialogContent>
         
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            title="Title"
            name="title"
            value={formData.title}
            placeholder="Enter Title"
            onChange={handleFormChange}
            sx={{width : "50vw", mt:"1vh"}}
            
          />
         
        </DialogContent>

        <DialogTitle id="responsive-dialog-title">
          {"Content :"}
        </DialogTitle>       
        
        <DialogContent>
         
          <TextField
            id="content"
            label="Content"
            variant="outlined"
            title="Content"
            name="content"
            value={formData.content}
            placeholder="Enter Content"
            onChange={handleFormChange}
            sx={{width : "50vw" , mt:"1vh"}}
            
          />
         
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          {id ? 
          <Button autoFocus id={id} className="button" onClick={(e)=>{
            register(e,formData)
           }} variant="outlined">
            update
           </Button>

           :
          <Button autoFocus className="button" onClick={(e)=>{
            register(e,formData)
           }} variant="outlined">
            Post
           </Button>
}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}