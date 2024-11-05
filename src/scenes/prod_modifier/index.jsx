import { Box, Typography, TablePagination, Tabs, Tab } from "@mui/material";
import { TabContext, TabList,TabPanel } from "@mui/lab";

import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import * as React from 'react';




const Prod_Modifier = () => {
    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
      <Box m="20px">
        <Header title="Product Modifier" />

        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#D8D9DA' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>

        
        
        
      </Box>
    );
};

export default Prod_Modifier;
