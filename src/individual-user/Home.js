import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LiquidChart from 'react-liquidchart';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import HomeCard from './Subcomponents/HomeCard';
import Analytics from './Analytics';
import Queries from './Queries';
import Profile from './Profile';
import CheckHistory from './CheckHistory';

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
  const MINUTE_MS = 2000;
  const [waterDataTillNow, setWaterDataTillNow] = useState(0);
  const [loader, setLoader] = useState(true);
useEffect(() => {
  const interval = setInterval(() => {
    getOverallWaterData();
    setLoader(false);
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [waterDataTillNow])
  
  const getOverallWaterData = () => {
    axios.get(`http://localhost:8000/get_water_usage_filter/${userData['device_id']}/${year}:${month}:${day}`).then((response) => {
      setWaterDataTillNow(response.data[0].water_used);
    });
  }
  const componentsList = [<Home hrefCallback={hrefCallback} />, <Analytics hrefCallback={hrefCallback}/>, <Queries />, <Profile />]
  const history = <CheckHistory device_id={userData["device_id"]}/>
  const stops = [
    <stop key={1} stopColor="someColor1" offset="5%" />,
  ];
  return (
    <>
    {loader && <Box display='flex' alignItems="center" justifyContent="center" disabled={true} >
        <CircularProgress />
      </Box>}
    <Box sx={{ width: '100%' }} >
      <Grid container spacing={24}
      justify="center">
        <Grid item xs={12} align="center">
        <div
        style={{
          width: '75%',
          height: '350px',
        }}
      >
        <LiquidChart
            responsive
            legend="litres"
            value={waterDataTillNow/1000}
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
          />
      </div>
        </Grid>
        <Grid item xs={6} align="center">
          <HomeCard title="View Analytics" description="View usage of water in a graphical representation" image="https://cdn.optinmonster.com/wp-content/uploads/2019/07/google-analytics-wordpress-2.png" hrefCallback={hrefCallback} component={componentsList[1]} subComponent={CheckHistory}/>
        </Grid>
        <Grid item xs={6} align="center">
          <HomeCard title="Queries" description="If you have any queries, don't hesitate to reach us" image="https://crosstalk.cell.com/hs-fs/hubfs/Images/Alex%20Lenkei/An%20authors%20guide%20to%20copyediting%20queries/query-letter-featured.jpg?width=1000&name=query-letter-featured.jpg" hrefCallback={hrefCallback} component={componentsList[2]}/>
        </Grid>
        <Grid item xs={6} align="center">
          <HomeCard title="Profile" description="View your profile" image="https://cdn.optinmonster.com/wp-content/uploads/2019/07/google-analytics-wordpress-2.png" hrefCallback={hrefCallback} component={componentsList[3]}/>
        </Grid>
        <Grid item xs={6} align="center">
          <HomeCard title="About" description="hello" image="https://cdn.optinmonster.com/wp-content/uploads/2019/07/google-analytics-wordpress-2.png" hrefCallback={hrefCallback} component={componentsList[3]}/>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
