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
  { user_id: 1, login_id: "a", user_name:"a", email:"a@abc.com", pwd: "", user_group_id: 1, is_active: 1 },
  { user_id: 2, login_id: "b", user_name:"b", email:"b@abc.com", pwd: "", user_group_id: 2 ,is_active: 1 },
  { user_id: 3, login_id: "c",user_name:"c", email:"c@abc.com", pwd: "", user_group_id: 3 ,is_active: 1 },
  { user_id: 4, login_id: "d", user_name:"d", email:"d@abc.com", pwd: "", user_group_id: 5 ,is_active: 1 },
  { user_id: 5, login_id: "e", user_name:"e", email:"e@abc.com", pwd: "", user_group_id: 4 ,is_active: 0 },
];

const user_group = [
    { user_group_id: 1, user_group_desc: "Manager", is_in_use: 1, display_seq: 12, actions: [1, 2, 3] },
    { user_group_id: 2, user_group_desc: "CEO", is_in_use: 1, display_seq: 10, actions: [2, 4, 5] },
    { user_group_id: 3, user_group_desc: "Supervisor", is_in_use: 1, display_seq: 8, actions: [1, 3, 5] },
    { user_group_id: 4, user_group_desc: "Cashier", is_in_use: 0, display_seq: 5, actions: [3, 4] },
    { user_group_id: 5, user_group_desc: "Waiter", is_in_use: 1, display_seq: 15, actions: [2, 5] },
  ];
  

const User = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState(initialRows);
    const [statusSortAsc, setStatusSortAsc] = React.useState(true);
    const navigate = useNavigate(); 

    const groupMap = React.useMemo(() => {
        return user_group.reduce((map, user_group) => {
            map[user_group.user_group_id] = user_group.user_group_desc;
            return map;
        }, {});
    }, []);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleEdit = (user_id) => {
      const selectedRow = rows.find(row => row.user_id === user_id);
      navigate("/user/edit", { state: { response: selectedRow } }); 
    };
    

    const handleAdd = () => {
      navigate("/user/add"); 
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
        <Header title="User" subtitle="List of users" />

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
                  <StyledTableCell sx={{ py: 1 }} >Username</StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }}  align="center">Email</StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }}  align="center">User Group</StyledTableCell>

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
                  <StyledTableCell sx={{ py: 1 }}  align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <StyledTableRow key={row.user_id}>
                      <StyledTableCell sx={{ py: 1 }}  component="th" scope="row">{row.user_name}</StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">{row.email}</StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">{groupMap[row.user_group_id] || ""}</StyledTableCell>

                      <StyledTableCell sx={{ py: 1 }}  align="center">
                        {row.is_active ? "Active" : "Inactive"}
                      </StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">
                        <IconButton onClick={() => handleEdit(row.user_id)}>
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

export default User;
