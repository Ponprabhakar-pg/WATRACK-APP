import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LiquidChart from 'react-liquidchart';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import CheckHistory from './CheckHistory';


export default function Analytics({hrefCallback}) {
    let userData = JSON.parse(localStorage.getItem('watrack'));
    const MINUTE_MS = 5000;
    const [todayWaterData, setTodayWaterData] = useState(0);
    const [monthWaterData, setMonthWaterData] = useState(0);
    const [yearWaterData, setYearWaterData] = useState(0);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
    const interval = setInterval(() => {
        getOverallWaterData();
        setLoader(false);
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [todayWaterData, monthWaterData, yearWaterData])
    
    const getOverallWaterData = () => {
        let date = new Date();
        let year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate();
        axios.get(`http://localhost:8000/get_water_usage_filter/${userData['device_id']}/${year}:${month}:${day}`).then((response) => {
            console.log(response.data[0]['water_used'])
            setTodayWaterData(response.data[0]['water_used']);
        });

        axios.get(`http://localhost:8000/get_water_usage_filter/${userData['device_id']}/${year}:${month}`).then((response) => {
            console.log(response.data[0]['water_used'])
            setMonthWaterData(response.data[0]['water_used']);
        });

        axios.get(`http://localhost:8000/get_water_usage_filter/${userData['device_id']}/${year}`).then((response) => {
            console.log(response.data[0]['water_used'])
            setYearWaterData(response.data[0]['water_used']);
        });
    }

    const stops = [
        <stop key={1} stopColor="someColor1" offset="5%" />,
      ];
    return(
      <>
      {loader && <Box display='flex' alignItems="center" justifyContent="center" disabled={true} >
        <CircularProgress />
      </Box>}
        <Box sx={{ width: '100%' }} >
      <Grid container spacing={24}
      justify="center">
        <Grid item xs={4} align="center">
        <div
        style={{
          width: '75%',
          height: '350px',
        }}
      >
        <LiquidChart
            responsive
            legend="litres"
            value={todayWaterData/1000}
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
          />Today
      </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div
        style={{
          width: '75%',
          height: '350px',
        }}
      >
        <LiquidChart
            responsive
            legend="litres"
            value={monthWaterData/1000}
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
          />This Month
      </div>
        </Grid>
        <Grid item xs={4} align="center">
        <div
        style={{
          width: '75%',
          height: '350px',
        }}
      >
        <LiquidChart
            responsive
            legend="litres"
            value={yearWaterData/1000}
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
          />This Year
      </div>
        </Grid>
        <Grid item xs={12} align="center">
          <div
            style={{
              width: '75%',
              height: '350px',
            }}
          >
            <Button variant="contained" onClick={(_e)=>hrefCallback(<CheckHistory device_id={userData["device_id"]}/>)}>View History</Button>
          </div>
        </Grid>
      </Grid>
    </Box>
    
    </>
    );
}

