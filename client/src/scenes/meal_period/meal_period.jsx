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
  { meal_period_id: 1, meal_period_desc: "Breakfast", start_time:"07:00", end_time:"11:59", is_in_use: 1, display_seq: 12 },
  { meal_period_id: 2, meal_period_desc: "Lunch", start_time:"07:00", end_time:"11:59", is_in_use: 1, display_seq: 10 },
  { meal_period_id: 3, meal_period_desc: "Dinner",start_time:"07:00", end_time:"11:59", is_in_use: 1, display_seq: 8 },
  { meal_period_id: 4, meal_period_desc: "Snack", start_time:"07:00", end_time:"11:59", is_in_use: 0, display_seq: 5 },
  { meal_period_id: 5, meal_period_desc: "Dessert", start_time:"07:00", end_time:"11:59", is_in_use: 1, display_seq: 15 },
];

const Meal_Period = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

    const handleEdit = (meal_period_id) => {
      const selectedRow = rows.find(row => row.meal_period_id === meal_period_id);
      navigate("/meal-period/edit", { state: { response: selectedRow } }); 
    };
    

    const handleAdd = () => {
      navigate("/meal-period/add"); 
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
        <Header title="Meal Period" subtitle="List of meal period" />

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
                  <StyledTableCell sx={{ py: 1 }} >Meal Period Name</StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }}  align="center">Period</StyledTableCell>
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
                    <StyledTableRow key={row.meal_period_id}>
                      <StyledTableCell sx={{ py: 1 }}  component="th" scope="row">{row.meal_period_desc}</StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">{row.start_time} - {row.end_time}</StyledTableCell>

                      <StyledTableCell sx={{ py: 1 }}  align="center">
                        {row.is_in_use ? "Active" : "Inactive"}
                      </StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">{row.display_seq}</StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">
                        <IconButton onClick={() => handleEdit(row.meal_period_id)}>
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

export default Meal_Period;
