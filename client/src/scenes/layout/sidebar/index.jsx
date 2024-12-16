import * as React from "react";
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
  KeyboardArrowRightRounded as ArrowIcon,
} from "@mui/icons-material";
import logo from "../../../assets/images/backend.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [productSettingsOpen, setProductSettingsOpen] = useState(false);
  const [paymentSettingsOpen, setPaymentSettingsOpen] = useState(false);
  const [storeSettingsOpen, setStoreSettingsOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [machineOpen, setMachineOpen] = useState(false);

  const toggleSection = (sectionSetter) => sectionSetter((prev) => !prev);

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
            height: "100px",
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
              <Box alignItems="center">
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
        <Menu>
          <Item
            title="Dashboard"
            path="/"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>
        <Menu>
          <Item
            title="General Settings"
            path="/general-setting"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>

        <Box
          onClick={() => toggleSection(setProductSettingsOpen)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            "&:hover": {
              backgroundColor: '#14274E',
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={"#F1F6F9"}
          >
            PRODUCT SETTINGS
          </Typography>
          <ArrowIcon
            sx={{
              transition: 'transform 0.3s',
              transform: productSettingsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              color: "#F1F6F9",
            }}
          />
        </Box>
        {productSettingsOpen && (
          <Menu>
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
              title="Product Item"
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
        )}

        <Box
          onClick={() => toggleSection(setPaymentSettingsOpen)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            "&:hover": {
              backgroundColor: '#14274E',
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={"#F1F6F9"}
          >
            PAYMENT SETTINGS
          </Typography>
          <ArrowIcon
            sx={{
              transition: 'transform 0.3s',
              transform: paymentSettingsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              color: "#F1F6F9",
            }}
          />
        </Box>
        {paymentSettingsOpen && (
          <Menu>
            <Item
              title="Payment Mode"
              path="/payment-mode"
              colors={colors}
              icon={<AddCardOutlined />}
            />
            <Item
              title="Tax"
              path="/tax"
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
        )}

        <Box
          onClick={() => toggleSection(setStoreSettingsOpen)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            "&:hover": {
              backgroundColor: '#14274E',
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={"#F1F6F9"}
          >
            STORE SETTINGS
          </Typography>
          <ArrowIcon
            sx={{
              transition: 'transform 0.3s',
              transform: storeSettingsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              color: "#F1F6F9",
            }}
          />
        </Box>
        {storeSettingsOpen && (
          <Menu>
            <Item
              title="Store"
              path="/store"
              colors={colors}
              icon={<AddBusinessOutlined />}
            />
            <Item
              title="Table Section"
              path="/table-sec"
              colors={colors}
              icon={<TableChartOutlined />}
            />
            <Item
              title="Table Location"
              path="/table"
              colors={colors}
              icon={<TableBarOutlined />}
            />
          </Menu>
        )}

        <Box
          onClick={() => toggleSection(setAccountSettingsOpen)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            "&:hover": {
              backgroundColor: '#14274E',
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={"#F1F6F9"}
          >
            ACCOUNT SETTINGS
          </Typography>
          <ArrowIcon
            sx={{
              transition: 'transform 0.3s',
              transform: accountSettingsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              color: "#F1F6F9",
            }}
          />
        </Box>
        {accountSettingsOpen && (
          <Menu>
            <Item
              title="User Groups"
              path="/user-group"
              colors={colors}
              icon={<AddBusinessOutlined />}
            />
            <Item
              title="User"
              path="/user"
              colors={colors}
              icon={<AddBusinessOutlined />}
            />
            <Item
              title="Customer"
              path="/bar"
              colors={colors}
              icon={<TableChartOutlined />}
            />
            {/* <Item
              title="Supplier"
              path="/pie"
              colors={colors}
              icon={<TableBarOutlined />}
            /> */}
          </Menu>
        )}

        <Box
          onClick={() => toggleSection(setInventoryOpen)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            "&:hover": {
              backgroundColor: '#14274E',
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={"#F1F6F9"}
          >
            STORE INVENTORY 
          </Typography>
          <ArrowIcon
            sx={{
              transition: 'transform 0.3s',
              transform: inventoryOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              color: "#F1F6F9",
            }}
          />
        </Box>
        {inventoryOpen && (
          <Menu>
            <Item
              title="Daily Availability"
              path="/line"
              colors={colors}
              icon={<AddBusinessOutlined />}
            />
          
          <Item
            title="Physical Inventory"
            path="/line"
            colors={colors}
            icon={<AddBusinessOutlined />}
          />
        </Menu>
        )}

        <Box
          onClick={() => toggleSection(setMachineOpen)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            "&:hover": {
              backgroundColor: '#14274E',
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={"#F1F6F9"}
          >
            POS MACHINE SETUP
          </Typography>
          <ArrowIcon
            sx={{
              transition: 'transform 0.3s',
              transform: machineOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              color: "#F1F6F9",
            }}
          />
        </Box>
        {machineOpen && (
          <Menu>
            <Item
              title="POS Station"
              path="/station"
              colors={colors}
              icon={<AddBusinessOutlined />}
            />
            <Item
              title="POS Printer"
              path="/printer"
              colors={colors}
              icon={<AddBusinessOutlined />}
            />
          </Menu>
        )}

        <Box
          onClick={() => toggleSection(setReportsOpen)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            "&:hover": {
              backgroundColor: '#14274E',
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color={"#F1F6F9"}
          >
            REPORTS
          </Typography>
          <ArrowIcon
            sx={{
              transition: 'transform 0.3s',
              transform: reportsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              color: "#F1F6F9",
            }}
          />
        </Box>
        {reportsOpen && (
          <Menu>
            <Item
              title="User"
              path="/line"
              colors={colors}
              icon={<AddBusinessOutlined />}
            />
          </Menu>
        )}
        
      </Box>
     
    </Sidebar>
  );
};

export default SideBar;
