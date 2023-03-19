import { Button,Grid } from "@mui/material"
import { Google } from "@mui/icons-material"

export default function Login() {
  return (
    <Grid container spacing={0} direction="column" alignItems="center"
    justifyContent="center" style={{minHeight:"100vh"}}> 
        <Button variant="contained" startIcon={<Google/>}>GOOGLE İLE GİRİŞ YAP</Button>
    </Grid>
  )
}
