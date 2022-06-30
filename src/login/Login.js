import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import User from './User';
import AdminUser from './AdminUser';
import SuperAdminUser from './SuperAdminUser';
import UserBrancher from '../Utils/UserBrancher';


export default function Login() {
  const [login, setLogin] = React.useState(<User />)
  const ref = React.useRef(null);
  UserBrancher();

  
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      {login}
      <Paper sx={{ position: 'fixed', bottom: 250, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction label="User" icon={<PersonIcon />} onClick={_=>setLogin(<User />)}/>
          <BottomNavigationAction label="Admin User" icon={<AccountCircleIcon />} onClick={_=>setLogin(<AdminUser />)}/>
          <BottomNavigationAction label="Super Admin User" icon={<AssignmentIndIcon />} onClick={_=>setLogin(<SuperAdminUser />)}/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}