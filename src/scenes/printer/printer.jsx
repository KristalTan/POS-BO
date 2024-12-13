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
import { AddCircle, EditOutlined, ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#FFB000",
      color: "black",
      fontSize: "14px",
      fontWeight: "bold",
      position: "relative",
      "&:hover .sortIcon": { // Show icons on hover
        opacity: 1,
      },
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


const initialRows = [
    { pos_printer_id: 1, pos_printer_code: "Cashier Receipt", pos_printer_name:"",is_in_use: 1, display_seq: 12, is_default:1, printer_type_id:1 },
    { pos_printer_id: 2, pos_printer_code: "Kitchen", pos_printer_name:"",is_in_use: 1, display_seq: 10, is_default:0, printer_type_id:1},
    { pos_printer_id: 3, pos_printer_code: "Office Printer",pos_printer_name:"",is_in_use: 1, display_seq: 8,is_default:0, printer_type_id:1 },
];

const Printer = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(initialRows);
    const [statusSortAsc, setStatusSortAsc] = React.useState(true);
    const navigate = useNavigate(); 

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleEdit = (pos_station_id) => {
      const selectedRow = rows.find(row => row.pos_station_id === pos_station_id);
      navigate("/printer/edit", { state: { response: selectedRow } }); 
    };
    

    const handleAdd = () => {
      navigate("/printer/add"); 
    };

    const handleStatusSort = () => {
      const sortedRows = [...rows].sort((a, b) => {
        if (a.is_in_use === b.is_in_use) return 0;
        return statusSortAsc ? a.is_in_use - b.is_in_use : b.is_in_use - a.is_in_use;
      });
      setRows(sortedRows);
      setStatusSortAsc(!statusSortAsc);
    };

    return (
      <Box m="20px">
        <Header title="POS Printer" />

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
                  <StyledTableCell sx={{ py: 1 }} >POS Printer Name</StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }} 
                    align="center"
                    onClick={handleStatusSort}
                    style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    Status
                    <span className="sortIcon" style={{ opacity: 5, transition: "opacity 0.3s", marginLeft: "4px" }}>
                      {statusSortAsc ? <ArrowDropUp fontSize="small" /> : <ArrowDropDown fontSize="small" />}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }}  align="center">Display Sequence</StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }}  align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <StyledTableRow key={row.pos_printer_id}>
                      <StyledTableCell sx={{ py: 1 }}  component="th" scope="row">{row.pos_printer_code} - {row.pos_printer_name}</StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">
                        {row.is_in_use ? "Active" : "Inactive"}
                      </StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">{row.display_seq}</StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">
                        <IconButton onClick={() => handleEdit(row.pos_printer_id)}>
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
            rowsPerPageOptions={[10, 15, 20]}
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

export default Printer;
