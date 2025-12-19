import React from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";

const drawerWidth = 220;

const SideMenu = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem
          button
          component={NavLink}
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#e3f2fd" : "transparent",
          })}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          component={NavLink}
          to="/products"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#e3f2fd" : "transparent",
          })}
        >
          <ListItemText primary="Product List" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
