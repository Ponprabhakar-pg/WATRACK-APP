import './App.css';
import axios from "axios";
import {React, useEffect, useState} from 'react';

const apiUrl = "http://192.168.1.27:5000";
const device_id = "watrack-device-002";
const columns = ["water_quantity", "time_stamp"]

function App() {
  const MINUTE_MS = 2000;
  const [waterDataTillNow, setWaterDataTillNow] = useState([{'water_consumed': 0}]);
  const [waterOverallData, setOverallWaterData] = useState([]);

useEffect(() => {
  const interval = setInterval(() => {
    getOverallWaterData();
    console.log(waterDataTillNow[0]['water_consumed']);
  }, MINUTE_MS);

  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
}, [waterDataTillNow, waterOverallData])
  
  const getOverallWaterData = () => {
    axios.post(`${apiUrl}/FetchOverallWaterUsageData`,{device_id}).then((response) => {
      setOverallWaterData(response.data);
    });
    axios.post(`${apiUrl}/FetchWaterUsageDataTillNow`,{device_id}).then((response) => {
      setWaterDataTillNow(response.data);
    });
  }
  
  const generateRows = () => {
    let OverallData = waterOverallData.reverse();
    return OverallData.map((data)=>{
      return(
          <tr>
               {
                  columns.map((v)=>{
                      return <td>{data[v]}</td>
                  })
               }
          </tr>
      )
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Device ID: {device_id}</h3>
        <h2>
          Welcome To WATRACK!
        </h2>
        <div><h4>Water Consumed till now!</h4>
          {waterDataTillNow && <h4>{waterDataTillNow[0]['water_consumed']}</h4>}
        </div>
        <div>
          <h4>Number of Records: {waterOverallData.length}</h4>
          <table>
            <thead>
            <tr><th>Water Consumed at that instant</th><th>Timestamp</th></tr>
            </thead>
            <tbody>
            {generateRows()}
            </tbody>
          </table>
        </div>
      </header>
      
    </div>
  );
}

export default App;
