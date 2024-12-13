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

const ModifierGroup = [
  {
    p_current_uid: "tester",
    p_modifier_group_id: 1,
    p_modifier_group_name: "Pizza Toppings",
    p_is_single_modifier_choice: 1,
    p_is_multiple_modifier_choice: 0,
    p_is_debug: 0
  },
  {
    p_current_uid: "tester",
    p_modifier_group_id: 2,
    p_modifier_group_name: "Burger Add-ons",
    p_is_single_modifier_choice: 0,
    p_is_multiple_modifier_choice: 1,
    p_is_debug: 1
  },
  {
    p_current_uid: "tester",
    p_modifier_group_id: 3,
    p_modifier_group_name: "Drinks Options",
    p_is_single_modifier_choice: 1,
    p_is_multiple_modifier_choice: 0,
    p_is_debug: 0
  }
];

const ModifierOption = 
[
  {
    p_current_uid: "tester",
    p_modifier_option_id: 1,
    p_modifier_group_id: 1,
    p_modifier_option_name: "Extra Cheese",
    p_addon_amt: 1.50,
    p_is_default: 0
  },
  {
    p_current_uid: "tester",
    p_modifier_option_id: 2,
    p_modifier_group_id: 1,
    p_modifier_option_name: "Spicy Sauce",
    p_addon_amt: 0.75,
    p_is_default: 1
  },
  {
    p_current_uid: "tester",
    p_modifier_option_id: 3,
    p_modifier_group_id: 1,
    p_modifier_option_name: "Mushrooms",
    p_addon_amt: 1.25,
    p_is_default: 0
  }
];

const ModifierItem = [
  {
    p_current_uid: "tester",
    p_link_item: "https://example.com/toppings-info",
    p_modifier_group_id: "1"
  },
  {
    p_current_uid: "tester",
    p_link_item: "https://example.com/drinks-options",
    p_modifier_group_id: "2"
  },
  {
    p_current_uid: "user-12345",
    p_link_item: "https://example.com/drinks-options",
    p_modifier_group_id: "3"
  }
];




  


const Prod_Modifier = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState(ModifierGroup);
    const [statusSortAsc, setStatusSortAsc] = React.useState(true);
    const navigate = useNavigate(); 

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleEdit = (id, name, status, seq) => {
      // navigate("/product-category/edit"); 
    };

    const handleAdd = () => {
      navigate("/product-modifier/add"); 
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
        <Header title="Product Modifier" />

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
        <StyledTableCell  sx={{ py: 1 }} >Table Name</StyledTableCell>
        <StyledTableCell  align="center" sx={{ py: 1 }}>Table Section</StyledTableCell>
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
        <StyledTableCell  align="center" sx={{ py: 1 }}>Display Sequence</StyledTableCell>
        <StyledTableCell  align="center" sx={{ py: 1 }}>Action</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.length > 0 ? (
        rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <StyledTableRow key={row.table_section_id}>
            <StyledTableCell  component="th" scope="row" sx={{ py: 1 }}>
              {row.table_desc}
            </StyledTableCell>
            <StyledTableCell  align="center" sx={{ py: 1 }}>{row.table_section_id}</StyledTableCell>
            <StyledTableCell  align="center" sx={{ py: 1 }}>
              {row.is_in_use ? "Active" : "Inactive"}
            </StyledTableCell>
            <StyledTableCell  align="center" sx={{ py: 1 }}>{row.display_seq}</StyledTableCell>
            <StyledTableCell  align="center" sx={{ py: 1 }}>
              <IconButton onClick={() => handleEdit(row.id, row.category_desc, row.is_in_use, row.display_seq)}>
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

export default Prod_Modifier;
