import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import "./index.css";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import BlogPost from "../blogPost";
import Comment from '../comment';
import  { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";





export default function RecipeReviewCard() {
  const navigate = useNavigate();

  const [blogs,setBlogs] =useState([]);
  const [comments,setComments] =useState([]);



useEffect(()=>{
  (async ()=>{
    const blogData = await axios.get(`${API_BASE_URL}/blogs/`,
    {headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`  
    }}
    );
    setBlogs(blogData.data);
  })()  
},[])

useEffect(()=>{
  (async ()=>{
    const commentData = await axios.get(`${API_BASE_URL}/blogs/all/comment`,
    {headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`  
    }}
    );
    setComments(commentData.data);
  })()  
},[])
// console.log(blogs);


const handleDelete = async (e)=>{
  await axios.delete(`${API_BASE_URL}/blogs/${e.target.id}`,
    {headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`  
    }}
    );
    window.location.reload();
}

    
  return (
  
    <div className='bloglist' >   
        <div id="blogPost">
        <BlogPost  />
        </div>     
        <div className='blog'>
          {blogs.map((item)=>{ return (
 <Card sx={{ maxWidth: "80vw", mb:"2vh" }}>
 <CardHeader
   avatar={
   <Avatar alt={item.username} sx={{ bgcolor: red[500] }} src="/static/images/avatar/1.jpg" />
   }
   action={           
           <Comment id={item._id}/>      
          }
   title={item.username}
   subheader={item.title}
 />
 
 <CardContent>
   <Typography variant="body2" color="text.secondary">
   Content : {item.content}
   </Typography>

 </CardContent>
 { localStorage.getItem("userId") === item.userId &&
 <Stack direction="row" spacing={2} sx={{ml:"3vw",mt:"1vh"}} >
  
      <BlogPost id={item._id} />
      <Button variant="outlined" id={item._id} onClick={(e)=>handleDelete(e)} startIcon={<DeleteIcon />}>
        Delete
      </Button>
     
    </Stack>
          }
 <CardActions >          
    <Accordion sx={{ width: '100%', maxWidth: "80vw", bgcolor: 'background.paper' }}>
   <AccordionSummary
     expandIcon={<ArrowDownwardIcon />}
     aria-controls="panel1-content"
     id="panel1-header"
   >          
   <Chip  label="See All Comments"  />
   </AccordionSummary>
   <AccordionDetails >       
    {comments.map((commentItem)=>{
      if(item._id == commentItem.blogId){
        return(
          <List >
         <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt={commentItem.username} src="/static/images/avatar/1.jpg" />
           </ListItemAvatar>
           <ListItemText
             primary={commentItem.username}
             secondary={
               <React.Fragment>
                 <Typography
                   sx={{ display: 'inline' }}
                   component="span"
                   variant="body2"
                   color="text.primary"
                 >
                 {commentItem.comment}
                 </Typography>
                </React.Fragment>
             }
           />
         </ListItem>
         <Divider variant="inset" component="li" />
           
        </List>
        )
        
      }

    })}

  



   </AccordionDetails>
 </Accordion>

 </CardActions>

</Card> 

          )})}
   

    </div>
    </div>
  );
}
