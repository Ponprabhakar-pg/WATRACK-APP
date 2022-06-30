import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckHistory from '../individual-user/CheckHistory';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Analytics({hrefCallback}) {
  let userData = JSON.parse(localStorage.getItem('watrack'));
  const [gridItem, setGridItem] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(()=>{
    setGridItem([]);
    for(var ele of userData['controlled_devices']){
    axios.get(`http://localhost:8000/user_login/${ele}`).then((response) => {
      let element = response.data;
      setGridItem((prevState)=> [...prevState,<Grid item xs={6}  key={element['device_id']} align="center"><Card sx={{ maxWidth: 345 }} onClick={(_e)=>hrefCallback(<CheckHistory tenent_name={element.name} device_id={element["device_id"]}/>)}>
      <CardActionArea>
  
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name : {element.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email Id: {element.mail_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mobile No: {element.mobile}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Addess: {element.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card></Grid>])
        });
      }  
    setLoader(false);
    },gridItem)

  return (
    <><Box display='flex' alignItems="center" justifyContent="center">
    <h2 justify="center">Tenents - Analytics</h2>
    </Box>

    {loader && <Box display='flex' alignItems="center" justifyContent="center" disabled={true} >
        <CircularProgress />
      </Box>}
    <Box sx={{ width: '100%' }} >
      <Grid container spacing={24}
      justify="center">
        {gridItem.slice(0,userData['controlled_devices'].length)}
      </Grid>
    </Box>
    </>
  );
}
