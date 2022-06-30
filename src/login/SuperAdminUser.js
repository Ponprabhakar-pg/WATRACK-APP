import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import {
  Grid,
  TextField,
  Paper,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SuperAdminUser = () => {
    let navigate = useNavigate();
  const [mailId, setmailId] = useState(null);
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passOnChange = (event) => {
    setPassword(event.target.value);
  };

  const idOnChange = (event) => {
    setmailId(event.target.value);
  };

  const onSubmit = () => {
      if(mailId ===null && password === null){
        setErrorMessage("kindly fill all the text box");
        setOpen(true);
      }
    axios.get('http://127.0.0.1:8000/super_admin_login/'+mailId)
    .then(response =>{
        if(response.data.password === password){
            response.data.password = "****";
            localStorage.setItem('watrack', JSON.stringify(response.data));
            setOpen(false);
            navigate('/superadmin');
        }
        else{
            setErrorMessage("Incorrect Password");
            setOpen(true);
        }
    }).catch(er => {
        setErrorMessage(er.response.data.detail);
        setOpen(true);
    });
  }

  return (
    <div style={{ padding: 30 }}>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <h3>Super Admin Login</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Mail ID" onChange={ e => idOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={ e => passOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={_=>onSubmit()}> Login </Button>
          </Grid>
        </Grid>
      {errorMessage && <Snackbar
        open={open}
        autoHideDuration={3000}
        message={errorMessage}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
      />
      }
    </div>
  );
};

export default SuperAdminUser;