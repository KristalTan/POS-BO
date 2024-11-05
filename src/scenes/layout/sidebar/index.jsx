/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  FlatwareOutlined,
  BorderColorOutlined,
  DashboardOutlined,
  ScheduleOutlined,
  PercentOutlined,
  AddCardOutlined,
  ReceiptLongOutlined,
  CategoryOutlined,
  TableChartOutlined,
  ReceiptOutlined,
  TableBarOutlined,
  AddBusinessOutlined,
} from "@mui/icons-material";
import logo from "../../../assets/images/backend (2).png";
import Item from "./Item";
// import Dropdown from "./Dropdown";
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
            title="Meal Period"
            path="/meal-period"
            colors={colors}
            icon={<ScheduleOutlined />}
          />
          <Item
            title="Product Category"
            path="/product-category"
            colors={colors}
            icon={<CategoryOutlined />}
          />
          <Item
            title="Product Item "
            path="/product-item"
            colors={colors}
            icon={<FlatwareOutlined />}
          />
          <Item
            title="Product Modifier"
            path="/product-modifier"
            colors={colors}
            icon={<BorderColorOutlined />}
          />
          
        </Menu>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={"#F1F6F9"}
          sx={{ m: "15px 0 5px 20px" }}
        >
          PAYMENT SETTINGS
        </Typography>
        <Menu
        >
          <Item
            title="Payment Mode"
            path="/payment_mode"
            colors={colors}
            icon={<AddCardOutlined />}
          />
          <Item
            title="Tax"
            path="/calendar"
            colors={colors}
            icon={<PercentOutlined />}
          />
          <Item
            title="Receipt Template"
            path="/faq"
            colors={colors}
            icon={<ReceiptLongOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={"#F1F6F9"}
          fontWeight="bold"
          fontStyle="underline"
          sx={{ m: "15px 0 5px 20px" }}
        >
          STORE SETTINGS
        </Typography>
        <Menu
        >
          <Item
            title="Store"
            path="/line"
            colors={colors}
            icon={<AddBusinessOutlined />}
          />
          <Item
            title="Table Section"
            path="/bar"
            colors={colors}
            icon={<TableChartOutlined />}
          />
          <Item
            title="Table Location"
            path="/pie"
            colors={colors}
            icon={<TableBarOutlined />}
          />
         
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
