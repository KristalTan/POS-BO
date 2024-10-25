/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="5px">
      <Typography
        variant="h2"
        fontWeight="bold"
        color={"#272829"}
        mb="5px"
      >
        {title}
      </Typography>
      <Typography variant="h5" color={"#394867"}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
