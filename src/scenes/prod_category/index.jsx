import { Box, Typography, TablePagination } from "@mui/material";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AddCircle, EditOutlined } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FFB000",
      color: "black",
      fontSize: "14px",
      fontWeight: "bold"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  const rows = [
    { id: 1, category_desc: "Breakfast", is_in_use: 1, display_seq: 12 },
    { id: 2, category_desc: "Lunch", is_in_use: 1, display_seq: 10 },
    { id: 3, category_desc: "Dinner", is_in_use: 1, display_seq: 8 },
    { id: 4, category_desc: "Snack", is_in_use: 0, display_seq: 5 },
    { id: 5, category_desc: "Dessert", is_in_use: 1, display_seq: 15 },
  ];
  
  const Prod_Category = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate(); 
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleEdit = (id) => {
      console.log("Edit item with id:", id);
    };
  
    const handleAdd = () => {
      navigate("/product-category/add"); 
    };
  
    return (
      <Box m="20px">
        <Header title="Product Category" subtitle="List of product category" />
  
        <Box display="flex" alignItems="flex-end" justifyContent="flex-end" mb="2px">
          <IconButton onClick={handleAdd}>
            <AddCircle style={{ color: "#272829", fontSize: "32px" }} />
          </IconButton>
        </Box>
  
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Category Name</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Display Sequence</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.category_desc}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.is_in_use ? "Active" : "Inactive"}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.display_seq}</StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => handleEdit(row.id)}>
                        <EditOutlined style={{ color: "#272829" }} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
  };
  
  export default Prod_Category;