import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import DoughnutChart from '../Utils/Charts/DoughnutChart';
import { PolarChart } from '../Utils/Charts/PolarChart';
import { BarChart } from '../Utils/Charts/BarChart';
import { LineChart } from '../Utils/Charts/LineChart';
import { PieChart } from '../Utils/Charts/PieChart';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CheckHistory({device_id, tenent_name}) {
    let grbColors = [
      'rgba(255,20,147,0.5)',
      'rgba(75,0,130,0.5)',
      'rgba(127,255,0,0.5)',
      'rgba(220,20,60,0.5)',
      'rgba(0,128,0,0.5)',
      'rgba(210,180,140,0.5)',
      'rgba(127,255,212,0.5)',
      'rgba(218,165,32,0.5)',
      'rgba(0,255,255,0.5)',
      'rgba(0,0,139,0.5)',
      'rgba(255,250,205,0.5)',
      'rgba(255,215,0,0.5)',
      'rgba(211,211,211,0.5)',
      'rgba(47,79,79,0.5)',
      'rgba(255,192,203,0.5)',
      'rgba(0,250,154,0.5)',
      'rgba(255,160,122,0.5)',
      'rgba(154,205,50,0.5)',
      'rgba(102,205,170,0.5)',
      'rgba(128,0,0,0.5)',
      'rgba(173,255,47,0.5)',
      'rgba(255,240,245,0.5)',
      'rgba(147,112,219,0.5)',
      'rgba(100,149,237,0.5)',
      'rgba(0,250,154,0.5)',
      'rgba(210,105,30,0.5)',
      'rgba(0,128,128,0.5)',
      'rgba(160,82,45,0.5)',
      'rgba(119,136,153,0.5)',
      'rgba(221,160,221,0.5)',
      'rgba(255,69,0,0.5)',
      ];

      let grbBorderColors = [
        'rgba(255,20,147,1)',
        'rgba(75,0,130,1)',
        'rgba(127,255,0,1)',
        'rgba(220,20,60,1)',
        'rgba(0,128,0,1)',
        'rgba(210,180,140,1)',
        'rgba(127,255,212,1)',
        'rgba(218,165,32,1)',
        'rgba(0,255,255,1)',
        'rgba(0,0,139,1)',
        'rgba(255,250,205,1)',
        'rgba(255,215,0,1)',
        'rgba(211,211,211,1)',
        'rgba(47,79,79,1)',
        'rgba(255,192,203,1)',
        'rgba(0,250,154,1)',
        'rgba(255,160,122,1)',
        'rgba(154,205,50,1)',
        'rgba(102,205,170,1)',
        'rgba(128,0,0,1)',
        'rgba(173,255,47,1)',
        'rgba(255,240,245,1)',
        'rgba(147,112,219,1)',
        'rgba(100,149,237,1)',
        'rgba(0,250,154,1)',
        'rgba(210,105,30,1)',
        'rgba(0,128,128,1)',
        'rgba(160,82,45,1)',
        'rgba(119,136,153,1)',
        'rgba(221,160,221,1)',
        'rgba(255,69,0,1)',
        ];

    const [data, setData] = useState({
        labels: ["2022"],
        datasets: [
          {
            label: 'water usage in litres',
            data: [0],
            backgroundColor: grbColors.slice(0,1),
            borderColor: grbBorderColors.slice(0,1),
            borderWidth: 1,
          },
        ],
      });
      const [chart, setChart] = useState(<DoughnutChart data={data} />);
    const [loader, setLoader] = useState(true);

    const [year, setYear] = React.useState(2022);
    const [month, setMonth] = React.useState(0);
    const [day, setDay] = React.useState(0);

    const MINUTE_MS = 5000;
    useEffect(() => {
        const interval = setInterval(() => {
          setLoader(true);
            getOverallWaterData();
            setLoader(false);
        }, MINUTE_MS);
    
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        }, [data, chart])
        
        const getOverallWaterData = () => {
          var filter_query ="";
            if(month == 0){
                filter_query=`${year}`;
            }
            else{
              if(day == 0){
                filter_query = `${year}:${month}`;
              }
              else{
                filter_query = `${year}:${month}:${day}`;
              }
            }
            axios.get(`http://watrack-restapi.herokuapp.com/get_water_usage_filter_raw/${device_id}/${filter_query}`).then((response) => {
                let chartdata = response.data;
                if(response.data.length > 0)
                {
                let customData = {
                  labels: chartdata.map((k)=>k.time_stamp),
                  datasets: [
                    {
                      label: 'water usage in litres',
                      labelSuffix: "l",
                      data: chartdata.map((k)=>k.water_quantity/1000),
                      backgroundColor: grbColors.slice(0,response.data.length),
                      borderColor: grbBorderColors.slice(0,response.data.length),
                      borderWidth: 1,
                    },
                  ],
                };
                setData(customData);
              }
              else{
                setData({
                  labels: ["2022"],
                  datasets: [
                    {
                      label: 'water usage in litres',
                      data: [0],
                      backgroundColor: grbColors.slice(0,1),
                      borderColor: grbBorderColors.slice(0,1),
                      borderWidth: 1,
                    },
                  ],
                });
              }

            });
        }

    return (<>
        {loader && <Box display='flex' alignItems="center" justifyContent="center" disabled={true} >
            <CircularProgress />
          </Box>}
        <Box sx={{ width: '100%' }} >
          <Grid container 
          justify="center">
            {tenent_name && <Grid item xs={12} align="center">
              <h4>{tenent_name +" -> Tenent"}</h4>
            </Grid>}
            <Grid item xs={12} align="center">
            <div
                style={{
                width: '40%',
                height: '150px',
                }}
            >
            {chart}
            <br/><br/><br/><br/><br/>
            </div>
            </Grid>
          </Grid>
      <Paper sx={{ position: 'fixed', bottom: 50, left: 0, right: 0 }} elevation={3} align="center">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={year}
          label="Year"
          onChange = {(e)=>setYear(e.target.value)}
        >
          <MenuItem value={2022}>2022</MenuItem>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
        <Select
          value={month}
          onChange={(e)=>setMonth(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select None to get Yearly value' }}
          label="Month"
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>January</MenuItem>
          <MenuItem value={2}>Febrary</MenuItem>
          <MenuItem value={3}>March</MenuItem>
          <MenuItem value={4}>April</MenuItem>
          <MenuItem value={5}>May</MenuItem>
          <MenuItem value={6}>June</MenuItem>
          <MenuItem value={7}>July</MenuItem>
          <MenuItem value={8}>August</MenuItem>
          <MenuItem value={9}>September</MenuItem>
          <MenuItem value={10}>October</MenuItem>
          <MenuItem value={11}>November</MenuItem>
          <MenuItem value={12}>December</MenuItem>
        </Select>
        <FormHelperText>Select None to get Yearly value</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Day</InputLabel>
        <Select
          value={day}
          onChange={(e)=>setDay(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select None to get Monthly value' }}
          label="Month"
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={26}>26</MenuItem>
          <MenuItem value={27}>27</MenuItem>
          <MenuItem value={28}>28</MenuItem>
          <MenuItem value={29}>29</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={31}>31</MenuItem>
        </Select>
        <FormHelperText>Select None to get monthly value</FormHelperText>
      </FormControl>
    </Paper>

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
            showLabels
            >
            <BottomNavigationAction label="Doughnut" onClick={_=>setChart(<DoughnutChart data={data} />)}/>
            <BottomNavigationAction label="Bar Chart" onClick={_=>setChart(<BarChart data={data}/>)}/>
            <BottomNavigationAction label="Polar Chart" onClick={_=>setChart(<PolarChart data={data}/>)}/>
            <BottomNavigationAction label="Line Chart" onClick={_=>setChart(<LineChart data={data}/>)}/>
            <BottomNavigationAction label="Pie Chart" onClick={_=>setChart(<PieChart data={data}/>)}/>
            </BottomNavigation>
        </Paper>
        </Box>
        </>);
}

