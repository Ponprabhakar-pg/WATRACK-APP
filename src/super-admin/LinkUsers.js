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

const LinkUsers = () => {
    let navigate = useNavigate();
  const [mailId, setmailId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userIdOnChange = (event) => {
    setUserId(event.target.value);
  };

  const mailIdOnChange = (event) => {
    setmailId(event.target.value);
  };

  const onSubmit = () => {
      if(mailId ===null && userId === null){
        setErrorMessage("kindly fill all the text box");
        setOpen(true);
      }
    axios.get(`http://watrack-restapi.herokuapp.com/link_user_to_admin/${userId}/${mailId}`)
    .then(response =>{
        if(response.data === true){

            setOpen(false);
            alert("User linked to admin successfully");
            window.location.reload();
        }
        else{
            setErrorMessage("Unable to link");
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
            <h3>Link User To Admin</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Admin Mail ID" onChange={ e => mailIdOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Device ID" type={'text'} onChange={ e => userIdOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={_=>onSubmit()}> Link Device </Button>
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

export default LinkUsers;