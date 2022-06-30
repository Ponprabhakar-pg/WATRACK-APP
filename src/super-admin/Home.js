import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


import HomeCard from './Subcomponents/HomeCard';
import Analytics from './Analytics';
import CheckHistory from './CheckHistory';
import UserOperation from './UserOperation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home({hrefCallback}) {
  let userData = JSON.parse(localStorage.getItem('watrack'));

  const componentsList = [<UserOperation hrefCallback={hrefCallback} />, <Analytics hrefCallback={hrefCallback}/>]

  return (
    <>
    <Box sx={{ width: '100%' }} >
      <Grid container spacing={24}
      justify="center">
        <Grid item xs={6} align="center">
          <HomeCard title="User Operation" description="To link a user to a admin." image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROumwh3Oc8kam0WIyX_6k4Z19VjjkCVCZdsRi2Pv_EYgVMNh2dxprRyt6oTmRiUMn0_Kk&usqp=CAU" hrefCallback={hrefCallback} component={<UserOperation/>}/>
        </Grid>
        <Grid item xs={6} align="center">
          <HomeCard title="View Analytics" description="To view analytics in all possible combinations" image="https://cdn.optinmonster.com/wp-content/uploads/2019/07/google-analytics-wordpress-2.png" hrefCallback={hrefCallback} component={<Analytics/>}/>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
