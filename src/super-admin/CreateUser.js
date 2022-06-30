import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Alert
} from '@mui/material';
import SuperAdmin from '../super-admin/SuperAdmin'
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  let userData = JSON.parse(localStorage.getItem('watrack'));
  let navigate = useNavigate();
  const [deviceId, setDeviceId] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [mailId, setMailId] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [address, setAddress] = useState(null);
  const [area, setArea] = useState(null);
  const [district, setDistrict] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passOnChange = (event) => {
    setPassword(event.target.value);
  };

  const idOnChange = (event) => {
    setDeviceId(event.target.value);
  };

  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const mailIdOnChange = (event) => {
    setMailId(event.target.value);
  };


  const mobileOnChange = (event) => {
    setMobileNo(event.target.value);
  };

  const addressOnChange = (event) => {
    setAddress(event.target.value);
  };

  const areaOnChange = (event) => {
    setArea(event.target.value);
  };

  const countryOnChange = (event) => {
    setCountry(event.target.value);
  };

  const districtOnChange = (event) => {
    setDistrict(event.target.value);
  };

  const stateOnChange = (event) => {
    setState(event.target.value);
  };

  const onSubmit = () => {
      if(deviceId ===null && password === null){
        setErrorMessage("kindly fill all the text box");
        setOpen(true);
      }
    axios.post('http://watrack-restapi.herokuapp.com/register_user', {
        "device_id": deviceId,
        "password": password,
        "name": name,
        "mail_id": mailId,
        "mobile": mobileNo,
        "address": address,
        "area": area,
        "district": district,
        "state": state,
        "country": country,
        "super_admin_id": userData['mail_id']
    })
    .then(response =>{
        console.log(response);
            alert("User Added Successfully");
            window.location.reload();

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
            <h3>User Creation</h3>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Device ID" onChange={ e => idOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} onChange={ e => passOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Name" type={'text'} onChange={ e => nameOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Mail Id" type={'mail'} onChange={ e => mailIdOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Mobile NO" type={'number'} onChange={ e => mobileOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Address" type={'text'} onChange={ e => addressOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="area" type={'text'} onChange={ e => areaOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="district" type={'text'} onChange={ e => districtOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="state" type={'text'} onChange={ e => stateOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="country" type={'text'} onChange={ e => countryOnChange(e)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={_=>onSubmit()}> Register </Button>
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

export default CreateUser;