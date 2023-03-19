import React from 'react'
import { ListItem, ListItemText, IconButton } from '@mui/material'
import moment from 'moment/moment'
import 'moment/locale/tr';
import { Delete,MoreVert } from '@mui/icons-material';
import { async } from '@firebase/util';
import { deleteDoc,doc } from 'firebase/firestore';
import { TodoContext } from '@/contexts/TodoContext';
import { useContext } from 'react';
import { db } from '@/firebase/firebase';

export default function Todo({todo}) {
    const {id,baslik,aciklama,tarih}=todo;
    const {showAlert}=useContext(TodoContext);

  const handleDelete=async(id,e)=>{
    e.preventDefault();

    const ref=doc(db,"todos",id);
    await deleteDoc(ref);
    showAlert("warning",id + " id'li todo silindi")
  }

  return (
    <ListItem sx={{mt:3,boxShadow:3}} style={{backgroundColor:"#FAFAFA"}} secondaryAction={
      <>
      <IconButton onClick={(e)=>handleDelete(id,e)}>
        <Delete/>
      </IconButton>
      <IconButton>
        <MoreVert/>
      </IconButton>
      </>
    }>
        <ListItemText primary={baslik} secondary={moment(tarih).format("LLL")}/>
    </ListItem>
    )
}
