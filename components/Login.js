import { Button,Grid } from "@mui/material"
import { Google } from "@mui/icons-material"
import { auth,provider } from "@/firebase/firebase"
import { signInWithPopup } from "firebase/auth"

export default function Login() {


  const loginGoogle=()=>{
    signInWithPopup(auth,provider);
  } 

  return (
    <Grid container spacing={0} direction="column" alignItems="center"
    justifyContent="center" style={{minHeight:"100vh"}}> 
        <Button onClick={loginGoogle} variant="contained" startIcon={<Google/>}>GOOGLE İLE GİRİŞ YAP</Button>
    </Grid>
  )
}
