import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink , useNavigate} from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Signin = () => {
  const [email,setEmail] = useState(null);
  const {setUserEmail} = useUser();
  const Navigate = useNavigate();
  const HandleSubmit = (e)=>{
    e.preventDefault();
    setUserEmail(email);
    Navigate('/chat');
  }

    return (
      <Container className='box' sx={{width:'500px'}}>
          <Typography variant="h4">Signin</Typography>
          <form onSubmit={HandleSubmit}>
            <TextField label="Username" fullWidth margin="normal" />
            <TextField label="Email" fullWidth 
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <TextField label="Password" fullWidth margin="normal" />
            <Button variant="contained" sx={{width:'100%'}} type="submit" >Signin</Button>
          </form>
      </Container>
     );
}
 
export default Signin;