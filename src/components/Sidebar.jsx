import React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';

const MenuItems = [{label: 'Users', key: 1}];

function Sidebar() {
  return (
    <div>
      <Toolbar/>
      <Divider/>
      <List>
        {MenuItems.map((obj) => (
          <ListItem key={obj.key} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary={obj.label}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
    </div>
  )
}

export default Sidebar;
