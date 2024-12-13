import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, MenuItem, Select } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';

const initialValues = {
    product_desc: "",
    product_code: "",
    category_id: 0,
    product_tag: "",
    product_img_path: "",
    supplier_id: 0,
    pricing_type_id: 0,
    cost: 0.0,
    sell_price: 0.0,
    tax_code1: 0,
    amt_include_tax1: "0.00",
    tax_code2: 0,
    amt_include_tax2: "0.00",
    calc_tax2_after_tax1: 0,
    is_in_use: 1,
    display_seq: "",
    is_enable_kitchen_printer: 1,
    is_allow_modifier: 1,
    is_enable_track_stock: 1,
    is_popular_item: 1,
    meal_period: 0,
};

const tax = [
    { tax_id: 1, tax_code: "SST", tax_desc: "Sales and Service Tax", tax_pct: 12.00, is_in_use: 1, display_seq: 12 },
    { tax_id: 2, tax_code: "GST", tax_desc: "Goods and Service Tax", tax_pct: 2.00, is_in_use: 1, display_seq: 10 },
    { tax_id: 3, tax_code: "Service charge", tax_desc: "Sales and Service Tax", tax_pct: 32.00, is_in_use: 1, display_seq: 8 },
  
];

const meal_period = [
    { meal_period_id: 1, meal_period_desc: "Breakfast", start_time:"07:00", end_time:"11:59", is_in_use: 1, display_seq: 12 },
    { meal_period_id: 2, meal_period_desc: "Lunch", start_time:"12:00", end_time:"15:00", is_in_use: 1, display_seq: 10 },
    { meal_period_id: 3, meal_period_desc: "Dinner", start_time:"18:00", end_time:"21:00", is_in_use: 1, display_seq: 8 },
    { meal_period_id: 4, meal_period_desc: "Snack", start_time:"15:00", end_time:"17:59", is_in_use: 0, display_seq: 5 },
    { meal_period_id: 5, meal_period_desc: "Dessert", start_time:"21:00", end_time:"23:00", is_in_use: 1, display_seq: 15 },
  ];

const prod_category = [
    { category_id: 1, category_desc: "Breakfast", is_in_use: 1, display_seq: 12 },
    { category_id: 2, category_desc: "Lunch", is_in_use: 1, display_seq: 10 },
    { category_id: 3, category_desc: "Dinner", is_in_use: 1, display_seq: 8 },
    { category_id: 4, category_desc: "Snack", is_in_use: 0, display_seq: 5 },
    { category_id: 5, category_desc: "Dessert", is_in_use: 1, display_seq: 15 },
  ];

const checkoutSchema = yup.object().shape({
    product_desc: yup.string().required("Product Name is required"),
    product_code: yup.string().required("Product Code is required"),
    category_id: yup.number().required("Category is required"),
    meal_period: yup.number().required("Meal Period is required"),
    pricing_type_id: yup.number().required("Pricing Type is required"),
    cost: yup.number().typeError("Cost must be a number").required("Cost is required"),
    sell_price: yup.number().typeError("Sell Price must be a number").required("Sell Price is required"),
    tax_code1: yup.string().required("Tax Code 1 is required"),
    tax_code2: yup.string().required("Tax Code 2 is required"),
    is_in_use: yup.number().required("Status is required"),
    amt_include_tax1: yup.number().nullable(),
    amt_include_tax2: yup.number().nullable(),
});

const Add_Prod_Item = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/product-item"); 
    };

    const handleFormSubmit = (values, actions) => {
        const updatedValues = {
            ...values,
            product_img_path: values.product_img_path?.name || ""
        };
        console.log('body', JSON.stringify(updatedValues, null, 2));

        /*
        body: {
            "product_desc": "Egg Sand",
            "product_code": "B001",
            "category_id": 1,
            "product_tag": "",
            "product_img_path": "backend.png",
            "supplier_id": 0,
            "pricing_type_id": 0,
            "cost": 0,
            "sell_price": -2,
            "tax_code1": 1,
            "amt_include_tax1": "0.00",
            "tax_code2": 2,
            "amt_include_tax2": "0.00",
            "calc_tax2_after_tax1": 0,
            "is_in_use": 1,
            "display_seq": "1",
            "is_enable_kitchen_printer": 1,
            "is_allow_modifier": 1,
            "is_enable_track_stock": 1,
            "is_popular_item": 1,
            "meal_period": 1
        }

        */
        actions.resetForm();
        navigate("/product-item"); 
    };

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="New Product Item" />
                </Box>
            </Box>
            <Box
                border="0.1px solid"
                borderColor="#272829"
                p="15px"
                borderRadius="12px"
                mt="20px"
            >
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box 
                                display="grid" 
                                gap="20px" 
                                gridTemplateColumns="0.5fr 2fr 0.5fr 2fr" 
                                alignItems="center"
                            >
                                <FormLabel sx={{ fontWeight: "bold" }}>Product Name:</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.product_desc}
                                    name="product_desc"
                                    label="Eg: Egg Sandwich"
                                    error={touched.product_desc && Boolean(errors.product_desc)}
                                    helperText={touched.product_desc && errors.product_desc}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Product Code:</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.product_code}
                                    name="product_code"
                                    label="Eg: B001"
                                    error={touched.product_code && Boolean(errors.product_code)}
                                    helperText={touched.product_code && errors.product_code}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Category:</FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    name="category_id"
                                >
                                    <MenuItem value={0}>Select Category</MenuItem>
                                    {prod_category.filter(cat => cat.is_in_use).map(category => (
                                        <MenuItem key={category.category_id} value={category.category_id}>
                                            {category.category_desc}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <FormLabel sx={{ fontWeight: "bold" }}>Meal Period:</FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.meal_period}
                                    onChange={handleChange}
                                    name="meal_period"
                                >
                                    <MenuItem value={0}>Select Meal Period</MenuItem>
                                    {meal_period.filter(mp => mp.is_in_use).map(period => (
                                        <MenuItem key={period.meal_period_id} value={period.meal_period_id}>
                                            {period.meal_period_desc}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <FormLabel sx={{ fontWeight: "bold" }}>Cost (RM):</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.cost}
                                    name="cost"
                                    error={touched.cost && Boolean(errors.cost)}
                                    helperText={touched.cost && errors.cost}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Sell Price (RM):</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sell_price}
                                    name="sell_price"
                                    error={touched.sell_price && Boolean(errors.sell_price)}
                                    helperText={touched.sell_price && errors.sell_price}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Tax Code 1:</FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.tax_code1}
                                    onChange={handleChange}
                                    name="tax_code1"
                                >
                                    <MenuItem value={0}>Select Tax Code 1</MenuItem>
                                    {tax.filter(taxActive => taxActive.is_in_use).map(taxDb => (
                                        <MenuItem key={taxDb.tax_id} value={taxDb.tax_id}>
                                            {taxDb.tax_code} - {taxDb.tax_desc}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <FormLabel sx={{ fontWeight: "bold" }}>Amount Included Tax 1:</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    value={values.amt_include_tax1}
                                    onChange={handleChange}
                                    name="amt_include_tax1"
                                    disabled
                                />
                                
                                <FormLabel sx={{ fontWeight: "bold" }}>Tax Code 2:</FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.tax_code2}
                                    onChange={handleChange}
                                    name="tax_code2"
                                >
                                    <MenuItem value={0}>Select Tax Code 2</MenuItem>
                                    {tax.filter(taxActive => taxActive.is_in_use).map(taxDb => (
                                        <MenuItem key={taxDb.tax_id} value={taxDb.tax_id}>
                                            {taxDb.tax_code} - {taxDb.tax_desc}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <FormLabel sx={{ fontWeight: "bold" }}>Amount Included Tax 2:</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    value={values.amt_include_tax2}
                                    onChange={handleChange}
                                    name="amt_include_tax2"
                                    disabled
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Display Sequence:</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.display_seq}
                                    name="display_seq"
                                    error={touched.display_seq && Boolean(errors.display_seq)}
                                    helperText={touched.display_seq && errors.display_seq}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Options:</FormLabel>
                                <Box display="flex" flexDirection="column" gap="10px" width="100%">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.is_enable_kitchen_printer === 1}
                                                onChange={(e) => setFieldValue("is_enable_kitchen_printer", e.target.checked ? 1 : 0)}
                                                name="is_enable_kitchen_printer"
                                                sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }}
                                            />
                                        }
                                        label="Kitchen Printer"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.is_enable_track_stock === 1}
                                                onChange={(e) => setFieldValue("is_enable_track_stock", e.target.checked ? 1 : 0)}
                                                name="is_enable_track_stock"
                                                sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }}
                                            />
                                        }
                                        label="Enable Track Stock"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.is_popular_item === 1}
                                                onChange={(e) => setFieldValue("is_popular_item", e.target.checked ? 1 : 0)}
                                                name="is_popular_item"
                                                sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }}
                                            />
                                        }
                                        label="Popular Item"
                                    />
                                </Box>

                                <FormLabel sx={{ fontWeight: "bold" }}>Product Image:</FormLabel>
                                <Box>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{ width: "100%", mb: "10px" }}
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => {
                                                const file = e.currentTarget.files[0];
                                                if (file) {
                                                    setFieldValue("product_img_path", file); 
                                                } else {
                                                    console.error("File not selected");
                                                }
                                            }}
                                        />
                                    </Button>

                                    {values.product_img_path && (
                                        <Box mt={2}>
                                            <img
                                                src={URL.createObjectURL(values.product_img_path)} 
                                                alt="Uploaded Preview"
                                                style={{ width: "200px", height: "auto", borderRadius: "8px", border: "1px solid #ccc" }}
                                            />
                                        </Box>
                                    )}
                                </Box>

                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Status: </FormLabel>
                                <RadioGroup
                                    row
                                    name="is_in_use"
                                    value={values.is_in_use}
                                    onChange={(e) => setFieldValue("is_in_use", Number(e.target.value))}
                                >
                                    <FormControlLabel
                                        value={1}
                                        control={<Radio sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }}/>} 
                                        label="Active"
                                    />
                                    <FormControlLabel
                                        value={0}
                                        control={<Radio sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }}/>} 
                                        label="Inactive"
                                    />
                                </RadioGroup>
                            </Box>

                            <Box display="flex" justifyContent="flex-end" mt="20px">
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#FFB000",
                                        ":hover": {
                                            color: "black",
                                            backgroundColor: "#F5F5F5",
                                        },
                                    }}
                                >
                                    CREATE
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Add_Prod_Item;
