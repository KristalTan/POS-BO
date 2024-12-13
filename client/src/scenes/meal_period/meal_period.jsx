import {
  Box,
  Typography,
  TablePagination,
  TableSortLabel,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AddCircle, EditOutlined } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow } from "../../theme"; 

const Meal_Period = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("meal_period_desc");
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:38998/mp/l', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: 'setting-meal-period',
            axn: 'l',
            data: [
              {
                current_uid: 'tester',
                is_in_use: -1,
              },
            ],
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log('List Data:', result); // Debugging: Check response structure
  
        if (result && result.data && Array.isArray(result.data.data)) {
          setRows(result.data.data); // Correctly set rows
        } else {
          console.error('Unexpected response structure:', result);
          setRows([]); // Fallback to an empty array if data is not valid
        }
      } catch (error) {
        console.error('Failed to fetch meal periods:', error);
        setRows([]); // Fallback to an empty array on error
      }
    };
  
    fetchData();
  }, []);
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(() => {
      return [...rows].sort((a, b) => {
          if (orderBy === "is_in_use") {
              return order === "asc" ? a.is_in_use - b.is_in_use : b.is_in_use - a.is_in_use;
          }
          return order === "asc"
              ? a[orderBy].localeCompare(b[orderBy])
              : b[orderBy].localeCompare(a[orderBy]);
      });
  }, [rows, order, orderBy]);

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


  return (
    <Box m="20px">
      <Header title="Meal Period" subtitle="List of meal period" />

            <Box display="flex" alignItems="flex-end" justifyContent="flex-end" mb="2px">
                <IconButton onClick={handleAdd}>
                    <AddCircle style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
            </Box>

            <TableContainer sx={{ border: "1px solid #ccc"}}>
            <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                    <TableSortLabel
                        active={orderBy === "meal_period_desc"}
                        direction={orderBy === "meal_period_desc" ? order : "asc"}
                        onClick={(event) => handleRequestSort(event, "meal_period_desc")}
                    >
                        Meal Period Name
                    </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">Period</StyledTableCell>
                <StyledTableCell align="center">
                    <TableSortLabel
                        active={orderBy === "is_in_use"}
                        direction={orderBy === "is_in_use" ? order : "asc"}
                        onClick={(event) => handleRequestSort(event, "is_in_use")}
                    >
                        Status
                    </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">Display Sequence</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
           {sortedRows.length > 0 ? (
              sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                  <StyledTableRow key={row.meal_period_id}>
                    <StyledTableCell component="th" scope="row">
                      {row.meal_period_desc}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.start_time} - {row.end_time}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.is_in_use ? "Active" : "Inactive"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.display_seq}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton onClick={() => handleEdit(row.meal_period_id)}>
                        <EditOutlined style={{ color: "#272829" }} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))                
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No record found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      
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

export default Meal_Period;
