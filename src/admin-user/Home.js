import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LiquidChart from 'react-liquidchart';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home({hrefCallback}) {
  let userData = JSON.parse(localStorage.getItem('watrack'));
  let date = new Date();
  let year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate();
  const MINUTE_MS = 4000;
  const [overallWaterDataTillNow, setOverallWaterDataTillNow] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCharts, setUserCharts] = useState([]);
  const [loader, setLoader] = useState(true);
useEffect(() => {
  const interval = setInterval(() => {
    setOverallWaterDataTillNow([]);
    setUsers([]);
    setUserCharts([]);
    userData['controlled_devices'].forEach(device => {
        getOverallWaterData(device);
    });
    drawCharts();
    setLoader(false);
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [overallWaterDataTillNow, users, userCharts])
  
  const getOverallWaterData = (device) => {
        axios.get(`http://watrack-restapi.herokuapp.com/get_water_usage_filter/${device}/${year}:${month}`).then((response) => {
            setOverallWaterDataTillNow(prevState => [...prevState, response.data[0].water_used]);
        });
        axios.get(`http://watrack-restapi.herokuapp.com/user_login/${device}`).then((response) => {
            setUsers(prevState => [...prevState, {name: response.data.name, device_id: response.data.device_id}]);
        }); 
  }

  const drawCharts = () => {
    for(let i=0; i< users.length; i++){
        setUserCharts(prevState => [...prevState, <Grid item xs={6} align="center">
        <div
        style={{
          width: '50%',
          height: '250px',
        }}
      >
        <LiquidChart
            responsive
            legend="litres"
            value={overallWaterDataTillNow[i]/1000}
            showDecimal
            amplitude={4}
            frequency={2}
            animationTime={2000}
            animationWavesTime={2250}
            outerBound = {0.8}
            innerBound ={0.7}
            gradient={{
              type: 1,
              x1: 0,
              x2: 0,
              y1: 100,
              y2: 0,
              stops,
            }}
            postfix=""
            legendFontSize={0.1}
          />{users[i]['name']}<br/>[{users[i]['device_id']}]
      </div>
        </Grid>])
    }
  }


  const componentsList = [<Home hrefCallback={hrefCallback} />]
  const stops = [
    <stop key={1} stopColor="someColor1" offset="5%" />,
  ];
  return (
    <><Box display='flex' alignItems="center" justifyContent="center">
    <h2 justify="center">Tenents</h2>
    </Box>

    {loader && <Box display='flex' alignItems="center" justifyContent="center" disabled={true} >
        <CircularProgress />
      </Box>}
    <Box sx={{ width: '100%' }} >
      <Grid container spacing={24}
      justify="center">
        {userCharts}
      </Grid>
    </Box>
    </>
  );
}
