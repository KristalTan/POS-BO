import {
  Box,
  Typography,
  TablePagination,
  TableSortLabel,
  IconButton,
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

const Table_Location = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("table_desc");
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch("http://localhost:38998/ts/l", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: "setting-table-sec",
              axn: "l",
              data: [
                {
                  current_uid: "tester",
                  is_in_use: -1,
                },
              ],
            }),
          }),
          fetch("http://localhost:38998/t/l", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: "setting-table",
              axn: "l",
              data: [
                {
                  current_uid: "tester",
                  is_in_use: -1,
                },
              ],
            }),
          }),
        ]);
  
        if (!response1.ok || !response2.ok) {
          throw new Error(`HTTP error!`);
        }
  
        const [result1, result2] = await Promise.all([
          response1.json(),
          response2.json(),
        ]);
  
        if (
          result1?.data?.data &&
          Array.isArray(result1.data.data) &&
          result2?.data?.data &&
          Array.isArray(result2.data.data)
        ) {
          // Create a map of table_section_id to table_section_name from the first response
          const sectionMap = result1.data.data.reduce((map, section) => {
            map[section.table_section_id] = section.table_section_name;
            return map;
          }, {});
  
          // Map the second response data to include table_section_name
          const combinedData = result2.data.data.map((table) => ({
            ...table,
            table_section_name: sectionMap[table.table_section_id] || "Unknown",
          }));
  
          setRows(combinedData);
        } else {
          console.error("Unexpected response structure", result1, result2);
          setRows([]);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
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
      const aValue = a[orderBy] || "";
      const bValue = b[orderBy] || "";
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [rows, order, orderBy]);
  


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (table_id) => {
    const selectedRow = rows.find((row) => row.table_id === table_id);
    navigate("/table/edit", { state: { response: selectedRow } });
  };

  const handleAdd = () => {
    navigate("/table/add");
  };

  return (
    <Box m="20px">
      <Header title="Table Location" />

      <Box display="flex" alignItems="flex-end" justifyContent="flex-end" mb="2px">
        <IconButton onClick={handleAdd}>
          <AddCircle style={{ color: "#272829", fontSize: "38px" }} />
        </IconButton>
      </Box>

      
        <TableContainer sx={{ border: "1px solid #ccc" }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "table_desc"}
                    direction={orderBy === "table_desc" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "table_desc")}
                  >
                    Table Name
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "table_section_name"}
                    direction={orderBy === "table_section_name" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "table_section_name")}
                  >
                    Table Section Name
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
                <StyledTableCell align="center">Display Sequence</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.length > 0 ? (
                sortedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.table_id}>
                      <StyledTableCell component="th" scope="row">
                        {row.table_desc}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.table_section_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.is_in_use ? "Active" : "Inactive"}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.display_seq}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton onClick={() => handleEdit(row.table_id)}>
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

export default Table_Location;
