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
    { pymt_mode_id: 1, pymt_mode_desc: "Bank Transfer", pymt_type: 1, for_store:"", is_in_use:1 },
    { pymt_mode_id: 2, pymt_mode_desc: "Credit card", pymt_type: 1, for_store:"", is_in_use: 1 },
    { pymt_mode_id: 3, pymt_mode_desc: "QR Pay", pymt_type: 1, for_store:"", is_in_use: 1 },
    { pymt_mode_id: 4, pymt_mode_desc: "E-wallet", pymt_type: 1, for_store:"", is_in_use: 0 },
  ];
  
  const Payment_Mode = () => {
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
  
    const handleEdit = (pymt_mode_id) => {
      const selectedRow = rows.find(row => row.pymt_mode_id === pymt_mode_id);
      navigate("/payment-mode/edit", { state: { response: selectedRow } }); 
    };
    
  
    const handleAdd = () => {
      navigate("/payment-mode/add"); 
    };
  
    return (
      <Box m="20px">
        <Header title="Payment Mode" subtitle="List of payment mode" />
  
        <Box display="flex" alignItems="flex-end" justifyContent="flex-end" mb="2px">
          <IconButton onClick={handleAdd}>
            <AddCircle style={{ color: "#272829", fontSize: "38px" }} />
          </IconButton>
        </Box>
  
        <Box>
          <TableContainer >
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ py: 1 }} >Payment Name</StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }}  align="center">Status</StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }}  align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {rows.length > 0 ? (
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <StyledTableRow key={row.pymt_mode_id}>
                    <StyledTableCell sx={{ py: 1 }}  component="th" scope="row">
                      {row.pymt_mode_desc}
                    </StyledTableCell>
                    <StyledTableCell sx={{ py: 1 }}  align="center">
                      {row.is_in_use ? "Active" : "Inactive"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ py: 1 }}  align="center">
                    <IconButton onClick={() => handleEdit(row.pymt_mode_id)}>
                    <EditOutlined style={{ color: "#272829" }} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No record found
                  </TableCell>
                </TableRow>
              )}
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
  
  export default Payment_Mode;