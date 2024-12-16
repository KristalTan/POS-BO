import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import * as React from "react";

const Item = ({ title, path, icon }) => {
  const location = useLocation();
  return (
    <MenuItem
      component={<Link to={path} />}
      to={path}
      icon={icon}
      rootStyles={{
        backgroundColor: path === location.pathname && "#394867",
        color: path === location.pathname && "#F5F5F5",
        ":hover": {
          color: "#394867",
          backgroundColor: "#F5F5F5",
          // transition: ".4s ease",
        },
      }}
    >
      {title}
    </MenuItem>
  );
};

export default Item;
