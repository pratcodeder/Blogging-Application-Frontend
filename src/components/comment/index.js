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
      comment:"",
           
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
        let res = await axios.post(`${API_BASE_URL}/blogs/${id}/comment`,
      {
        comment:formData.comment,
        
      },
      {
        headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
         'Content-Type':'application/json',
      }
    }
      ) 
      console.log(res.status);
      if (res.status===201){
        enqueueSnackbar('Comment Posted Successfully',{
          variant:'success'
        })       
      
      
      }
      handleClose();
      window.location.reload();
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
    if (data.comment===""|| data.comment === undefined || data.comment.trim() === "") {
      enqueueSnackbar("Comment is a required field",{
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
      <Button variant="outlined" onClick={handleClickOpen}>
        comment
      </Button>
      <Dialog
      
        
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Comment :"}
        </DialogTitle>       
        
        <DialogContent>
         
          <TextField
            id="comment"
            label="Comment"
            variant="outlined"
            title="Comment"
            name="comment"
            value={formData.comment}
            placeholder="Enter Comment"
            onChange={handleFormChange}
            sx={{width : "50vw", mt:"1vh"}}
            
          />
         
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus className="button" onClick={()=>{
            register(formData)
           }} variant="outlined">
            Post
           </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}