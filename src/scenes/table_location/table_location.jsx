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
  { table_id: 1, table_desc: "A1", table_section_id: 1, qr_code: "not_sure", is_in_use: 1, display_seq: 12 },
  { table_id: 2, table_desc: "A2", table_section_id: 1, qr_code: "not_sure", is_in_use: 1, display_seq: 10 },
  { table_id: 3, table_desc: "A3", table_section_id: 1, qr_code: "not_sure", is_in_use: 1, display_seq: 8 },
  { table_id: 4, table_desc: "A4", table_section_id: 1, qr_code: "not_sure", is_in_use: 0, display_seq: 5 },
  { table_id: 5, table_desc: "A5", table_section_id: 1, qr_code: "not_sure", is_in_use: 1, display_seq: 15 },
];

const table_section = [
  { table_section_id: 1, table_section_name: "Zone A", is_in_use: 1, display_seq: 12 },
  { table_section_id: 2, table_section_name: "Zone B", is_in_use: 1, display_seq: 10 },
  { table_section_id: 3, table_section_name: "Zone C", is_in_use: 1, display_seq: 8 },
  { table_section_id: 4, table_section_name: "Zone D", is_in_use: 0, display_seq: 5 },
  { table_section_id: 5, table_section_name: "Zone E", is_in_use: 1, display_seq: 15 },
];

const Table_Location = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState(initialRows);
    const [statusSortAsc, setStatusSortAsc] = React.useState(true);
    const navigate = useNavigate(); 

    const sectionMap = React.useMemo(() => {
        return table_section.reduce((map, section) => {
            map[section.table_section_id] = section.table_section_name;
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

    const handleEdit = (table_id) => {
      const selectedRow = rows.find(row => row.table_id === table_id);
      navigate("/table/edit", { state: { response: selectedRow } }); 
    };
    

    const handleAdd = () => {
      navigate("/table/add"); 
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
        <Header title="Table Location" />

        <Box display="flex" alignItems="flex-end" justifyContent="flex-end" mb="2px">
          <IconButton onClick={handleAdd}>
            <AddCircle style={{ color: "#272829", fontSize: "38px" }} />
          </IconButton>
        </Box>

        <Box>
        <TableContainer>
  <Table sx={{ minWidth: 700 }}>
    <TableHead>
      <TableRow>
        <StyledTableCell sx={{ py: 1 }}>Table Name</StyledTableCell>
        <StyledTableCell align="center" sx={{ py: 1 }}>Table Section</StyledTableCell>
        <StyledTableCell 
          align="center"
          sx={{ py: 1 }}
          onClick={handleStatusSort}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          Status
          <span className="sortIcon" style={{ opacity: 5, transition: "opacity 0.3s", marginLeft: "4px" }}>
            {statusSortAsc ? <ArrowDropUp fontSize="small" /> : <ArrowDropDown fontSize="small" />}
          </span>
        </StyledTableCell>
        <StyledTableCell align="center" sx={{ py: 1 }}>Display Sequence</StyledTableCell>
        <StyledTableCell align="center" sx={{ py: 1 }}>Action</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.length > 0 ? (
        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <StyledTableRow key={row.table_id}>
            <StyledTableCell component="th" scope="row" sx={{ py: 1 }}>
              {row.table_desc}
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ py: 1 }}>
              {sectionMap[row.table_section_id] || ""}
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ py: 1 }}>
              {row.is_in_use ? "Active" : "Inactive"}
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ py: 1 }}>{row.display_seq}</StyledTableCell>
            <StyledTableCell align="center" sx={{ py: 1 }}>
              <IconButton onClick={() => handleEdit(row.table_id)}>
                <EditOutlined style={{ color: "#272829" }} />
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5} align="center" sx={{ py: 1 }}>
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

export default Table_Location;
