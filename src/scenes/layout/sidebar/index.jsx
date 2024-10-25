/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  WavesOutlined,
} from "@mui/icons-material";
import logo from "../../../assets/images/backend (2).png";
import Item from "./Item";
import { ToggledContext } from "../../../App";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Sidebar
      backgroundColor={"#9BA4B4"}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height:"100px",
            margin: "15px 0 10px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!collapsed && (
              <Box
                // display="flex"
                alignItems="center"
                // sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={logo}
                />
                
              </Box>
            )}
           
          </Box>
        </MenuItem>
      </Menu>
      

      <Box mb={5} py={collapsed ? undefined : "5%"}>
        <Menu
        >
          <Item
            title="Dashboard"
            path="/"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={"#F1F6F9"}
          sx={{ m: "15px 0 5px 20px" }}
        >
          PRODUCT SETTINGS
        </Typography>{" "}
        <Menu
         
        >
          <Item
            title="Product Category"
            path="/product-category"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />
          <Item
            title="Product Item "
            path="/contacts"
            colors={colors}
            icon={<ContactsOutlined />}
          />
          <Item
            title="Product Modifier"
            path="/invoices"
            colors={colors}
            icon={<ReceiptOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={"#F1F6F9"}
          sx={{ m: "15px 0 5px 20px" }}
        >
          STORE SETTINGS
        </Typography>
        <Menu
        >
          <Item
            title="Profile Form"
            path="/form"
            colors={colors}
            icon={<PersonOutlined />}
          />
          <Item
            title="Calendar"
            path="/calendar"
            colors={colors}
            icon={<CalendarTodayOutlined />}
          />
          <Item
            title="FAQ Page"
            path="/faq"
            colors={colors}
            icon={<HelpOutlineOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={"#F1F6F9"}
          fontWeight="bold"
          fontStyle="underline"
          sx={{ m: "15px 0 5px 20px" }}
        >
          PAYMENT SETTINGS
        </Typography>
        <Menu
        >
          <Item
            title="Bar Chart"
            path="/bar"
            colors={colors}
            icon={<BarChartOutlined />}
          />
          <Item
            title="Pie Chart"
            path="/pie"
            colors={colors}
            icon={<DonutLargeOutlined />}
          />
          <Item
            title="Line Chart"
            path="/line"
            colors={colors}
            icon={<TimelineOutlined />}
          />
          <Item
            title="Geography Chart"
            path="/geography"
            colors={colors}
            icon={<MapOutlined />}
          />
          <Item
            title="Stream Chart"
            path="/stream"
            colors={colors}
            icon={<WavesOutlined />}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
