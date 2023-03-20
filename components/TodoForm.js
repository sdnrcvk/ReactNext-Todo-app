import { Button,TextField,Typography } from "@mui/material"
import { collection,addDoc,serverTimestamp,updateDoc,doc } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { async } from "@firebase/util"
import { useContext,useState,useRef,useEffect } from "react"
import { TodoContext } from "@/contexts/TodoContext"
import { AuthContext } from "@/contexts/AuthContext"

export default function TodoForm() {
    const {showAlert,todo,setTodo}=useContext(TodoContext);
    const inputRef=useRef();
    const {currentUser}=useContext(AuthContext);

    useEffect(()=>{
        const tiklanmaKontrol=(e)=>{
            if(!inputRef.current.contains(e.target)){
                console.log("inputlara tıklandı");
                setTodo({baslik:"",aciklama:""})
            }else{
                console.log("inputlar harici tıklandı");
            }
        }
        document.addEventListener("mousedown",tiklanmaKontrol);
        return ()=>{
            document.removeEventListener("mousedown",tiklanmaKontrol);
        }
    },[])

    const handleClick=async(e)=>{
        e.preventDefault();
        //console.log(todo);
        if(todo.baslik=="" || todo.aciklama=="" ){
            showAlert("error","Başlık ya da açıklama boş geçilemez")
            return;
        }

        if(todo?.hasOwnProperty("id")){
            //güncelleme
            const ref=doc(db,"todos",todo.id);
            const newTodo={baslik:todo.baslik,aciklama:todo.aciklama,sonGuncellemeTarih:serverTimestamp()};
            
            updateDoc(ref,newTodo);
            setTodo({baslik:"",aciklama:""})
            showAlert("success","todo güncellendi")
        }else{
            //ekleme
            const ref=collection(db,"todos");
            const docRef=await addDoc(ref,{...todo,kullaniciEmail:currentUser.email,tarih:serverTimestamp()}) ;           
            console.log(docRef);
            setTodo({baslik:"",aciklama:""})
            //alert(`${docRef.id} id li todo eklendi`)
            showAlert("success",`${docRef.id} id'li todo eklendi`);
        }

    }

  return (
    <div ref={inputRef}>
        <Typography sx={{mt:3,fontWeight:"bold"}} variant="h5"
        color="darkgrey">Yeni Todo Ekle</Typography>
        <TextField value={todo.baslik} fullWidth label="Başlık" margin="normal" onChange={(e)=>setTodo({...todo,baslik:e.target.value})}></TextField>
        <TextField value={todo.aciklama} fullWidth label="Açıklama" multiline maxRows={3} margin="normal" onChange={(e)=>setTodo({...todo,aciklama:e.target.value})}></TextField>
        {
            todo?.hasOwnProperty("id") ? (
                <Button sx={{mt:3}} variant="outlined" color="warning" onClick={handleClick}>Todo Güncelle</Button>
            ) : (
                <Button sx={{mt:3}} variant="outlined" color="success" onClick={handleClick}>Todo Ekle</Button>
            )
        }
    </div>
  )
}
