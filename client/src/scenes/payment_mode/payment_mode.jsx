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

const Payment_Mode = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("pymt_mode_desc");

  const navigate = useNavigate();

  React.useEffect(() => {
      const fetchData = async () => {

          try {
              const response = await fetch("http://localhost:38998/pm/l", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      code: "setting-pymt-mode",
                      axn: "l",
                      data: [
                          {
                              current_uid: "tester",
                              is_in_use: -1,
                          },
                      ],
                  }),
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const result = await response.json();
              if (result && result.data && Array.isArray(result.data.data)) {
                  setRows(result.data.data);
              } else {
                  console.error("Unexpected response structure:", result);
                  setRows([]);
              }
          } catch (error) {
              console.error("Failed to fetch payment modes:", error);
              setRows([]);
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

  const handleEdit = (pymt_mode_id) => {
      const selectedRow = rows.find((row) => row.pymt_mode_id === pymt_mode_id);
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

            <TableContainer sx={{ border: "1px solid #ccc"}}>
              <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={orderBy === "pymt_mode_desc"}
                                    direction={orderBy === "pymt_mode_desc" ? order : "asc"}
                                    onClick={(event) => handleRequestSort(event, "pymt_mode_desc")}
                                >
                                    Payment Name
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TableSortLabel
                                    active={orderBy === "is_in_use"}
                                    direction={orderBy === "is_in_use" ? order : "asc"}
                                    onClick={(event) => handleRequestSort(event, "is_in_use")}
                                >
                                    Status
                                </TableSortLabel>
                            </StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {sortedRows.length > 0 ? (
                      sortedRows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                                <StyledTableRow key={row.pymt_mode_id}>
                                    <StyledTableCell>{row.pymt_mode_desc}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {row.is_in_use ? "Active" : "Inactive"}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton onClick={() => handleEdit(row.pymt_mode_id)}>
                                            <EditOutlined style={{ color: "#272829" }} />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                    ))                
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
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

export default Payment_Mode;