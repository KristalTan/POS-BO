import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, MenuItem, Select } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';

const table_section = [
    { table_section_id: 1, table_section_name: "Zone A", is_in_use: 1, display_seq: 12 },
    { table_section_id: 2, table_section_name: "Zone B", is_in_use: 1, display_seq: 10 },
    { table_section_id: 3, table_section_name: "Zone C", is_in_use: 1, display_seq: 8 },
    { table_section_id: 4, table_section_name: "Zone D", is_in_use: 0, display_seq: 5 },
    { table_section_id: 5, table_section_name: "Zone E", is_in_use: 1, display_seq: 15 },
  ];

const checkoutSchema = yup.object().shape({
    table_desc: yup.string().required("Table Name is required"),
    is_in_use: yup.number().required("Status is required"),
    
});

const Edit_Table_Location = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const response = location.state?.response;

    const initialValues = {
        table_desc: response?.table_desc || "",
        table_section_id: response?.table_section_id || 0,
        qr_code: response?.qr_code || "",
        is_in_use: response?.is_in_use || 0,
        display_seq: response?.display_seq || "",
    };

    

    const prevPage = () => {
        navigate("/table");
    };

    // const handleFormSubmit = (values, actions) => {
    //     // Make the POST request to the backend
    //     fetch('http://your-backend-url/api/data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(values), // Send the form values
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to submit form');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log('Success:', data);
    //             actions.resetForm(); // Reset the form if needed
    //             navigate("/meal-period"); // Redirect after successful submission
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             // Handle error appropriately (e.g., show error message)
    //         });
    // };

    const handleFormSubmit = (values, actions) => {
        console.log('body', JSON.stringify(values, null, 2));

        /*

            body {
                "meal_period_desc": "Dinner",
                "start_time": "07:00",
                "end_time": "11:59",
                "is_in_use": 1,
                "display_seq": "a8"
            }

        */
    
        actions.resetForm();
        navigate("/table"); 
    };

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="Edit Table" />
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
                    enableReinitialize
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
                            <Box display="grid" justifyContent="flex-end" gap="20px" gridTemplateColumns="0.5fr 3fr">
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Table Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.table_desc}
                                    name="table_desc"
                                    error={touched.table_desc && Boolean(errors.table_desc)}
                                    helperText={touched.table_desc && errors.table_desc}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Table Section:</FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.table_section_id}
                                    onChange={handleChange}
                                    name="table_section_id"
                                >
                                    <MenuItem value={0}>Select Table Section</MenuItem>
                                    {table_section.filter(sec => sec.is_in_use).map(sec => (
                                        <MenuItem key={sec.table_section_id} value={sec.table_section_id}>
                                            {sec.table_section_name}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>QR Code URL: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.qr_code}
                                    name="qr_code"
                                    error={touched.qr_code && Boolean(errors.qr_code)}
                                    helperText={touched.qr_code && errors.qr_code}
                                />

                                

                                <FormLabel sx={{ alignSelf: "center", fontWeight:"bold" }}>Status: </FormLabel>
                                <RadioGroup
                                    row
                                    name="is_in_use"
                                    value={values.is_in_use}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        value={1}
                                        control={<Radio sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }} />}
                                        label="Active"
                                    />
                                    <FormControlLabel
                                        value={0}
                                        control={<Radio sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }} />}
                                        label="Inactive"
                                    />
                                </RadioGroup>
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Display Sequence: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Eg: 1"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.display_seq}
                                    name="display_seq"
                                    error={touched.display_seq && Boolean(errors.display_seq)}
                                    helperText={touched.display_seq && errors.display_seq}
                                />
                            </Box>

                            <Box display="flex" justifyContent="flex-end" mt="20px">
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#FFB000",
                                        ":hover": { color: "black", backgroundColor: "#F5F5F5" },
                                    }}
                                >
                                    UPDATE
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Edit_Table_Location;
