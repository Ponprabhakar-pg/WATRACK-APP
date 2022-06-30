import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CreateAdminUser from './CreateAdminUser';
import CreateUser from './CreateUser';
import LinkUsers from './LinkUsers';
import UserBrancher from '../Utils/UserBrancher';


export default function UserOperation() {
  const [userOperation, setUserOperation] = React.useState(<CreateUser />)
  const ref = React.useRef(null);

  
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      {userOperation}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction label="User" icon={<PersonIcon />} onClick={_=>setUserOperation(<CreateUser />)}/>
          <BottomNavigationAction label="Admin User" icon={<AccountCircleIcon />} onClick={_=>setUserOperation(<CreateAdminUser />)}/>
          <BottomNavigationAction label="Link User" icon={<AssignmentIndIcon />} onClick={_=>setUserOperation(<LinkUsers />)}/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}