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
{
    product_id: 1,
    product_desc: "Egg Sandwich",
    product_code: "B001",
    category_id: 1,
    product_tag: "morning",
    product_img_path: "/images/breakfast.png",
    supplier_id: 201,
    pricing_type_id: 301,
    cost: 5.00,
    sell_price: 10.00,
    tax_code1: 1,
    amt_include_tax1: 11.00,
    tax_code2: 2,
    amt_include_tax2: 12.00,
    calc_tax2_after_tax1: 1,
    is_in_use: 1,
    display_seq: 12,
    is_enable_kitchen_printer: 1,
    is_allow_modifier: 1,
    is_enable_track_stock: 1,
    is_popular_item: 1,
    meal_period:5,
},
{
    product_id: 2,
    product_desc: "Nasi Goreng Ayam",
    product_code: "L002",
    category_id: 2,
    product_tag: "afternoon",
    product_img_path: "/images/lunch.png",
    supplier_id: 202,
    pricing_type_id: 302,
    cost: 7.00,
    sell_price: 15.00,
    tax_code1: 1,
    amt_include_tax1: 11.00,
    tax_code2: 2,
    amt_include_tax2: 12.00,
    calc_tax2_after_tax1: 1,
    is_in_use: 1,
    display_seq: 10,
    is_enable_kitchen_printer: 1,
    is_allow_modifier: 1,
    is_enable_track_stock: 1,
    is_popular_item: 1,
    meal_period: 4,
},
{
    product_id: 3,
    product_desc: "Chicken Chop with sides",
    product_code: "D003",
    category_id: 3,
    product_tag: "evening",
    product_img_path: "/images/dinner.png",
    supplier_id: 203,
    pricing_type_id: 303,
    cost: 10.00,
    sell_price: 20.00,
    tax_code1: 1,
    amt_include_tax1: 11.00,
    tax_code2: 2,
    amt_include_tax2: 12.00,
    calc_tax2_after_tax1: 1,
    is_in_use: 1,
    display_seq: 8,
    is_enable_kitchen_printer: 1,
    is_allow_modifier: 1,
    is_enable_track_stock: 1,
    is_popular_item: 1,
    meal_period: 3,
},
{
    product_id: 4,
    product_desc: "French Fries",
    product_code: "S004",
    category_id: 4,
    product_tag: "snack",
    product_img_path: "/images/snack.png",
    supplier_id: 204,
    pricing_type_id: 304,
    cost: 3.00,
    sell_price: 6.00,
    tax_code1: 1,
    amt_include_tax1: 11.00,
    tax_code2: 2,
    amt_include_tax2: 12.00,
    calc_tax2_after_tax1: 1,
    is_in_use: 0,
    display_seq: 5,
    is_enable_kitchen_printer: 0,
    is_allow_modifier: 0,
    is_enable_track_stock: 1,
    is_popular_item: 0,
    meal_period: 2,
},
{
    product_id: 5,
    product_desc: "Chocolate Ice Cream",
    product_code: "DS005",
    category_id: 5,
    product_tag: "dessert",
    product_img_path: "/images/dessert.png",
    supplier_id: 205,
    pricing_type_id: 305,
    cost: 4.00,
    sell_price: 8.00,
    tax_code1: 1,
    amt_include_tax1: 11.00,
    tax_code2: 2,
    amt_include_tax2: 12.00,
    calc_tax2_after_tax1: 1,
    is_in_use: 1,
    display_seq: 15,
    is_enable_kitchen_printer: 1,
    is_allow_modifier: 1,
    is_enable_track_stock: 1,
    is_popular_item: 1,
    meal_period: 1,
},
];
  

const Prod_Item = () => {
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

    const handleEdit = (product_id) => {
      const selectedRow = rows.find(row => row.product_id === product_id);
      navigate("/product-item/edit",{ state: { response: selectedRow } }); 
    };

    const handleAdd = () => {
      navigate("/product-item/add"); 
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
        <Header title="Product Item" subtitle="List of product" />

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
                  <StyledTableCell sx={{ py: 1 }} >Product Name</StyledTableCell>
                  <StyledTableCell sx={{ py: 1 }}  align="center">Sell Price (RM)</StyledTableCell>


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
                    <StyledTableRow key={row.product_id}>
                      <StyledTableCell sx={{ py: 1 }}  component="th" scope="row">
                        {row.product_code} - {row.product_desc}
                      </StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">{row.sell_price.toFixed(2)}</StyledTableCell>

                      <StyledTableCell sx={{ py: 1 }}  align="center">
                        {row.is_in_use ? "Active" : "Inactive"}
                      </StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">{row.display_seq}</StyledTableCell>
                      <StyledTableCell sx={{ py: 1 }}  align="center">
                      <IconButton onClick={() => handleEdit(row.product_id)}>
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

export default Prod_Item;
