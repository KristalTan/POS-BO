import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, MenuItem, Select } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';
import * as React from "react";

const initialValues = {
    table_desc: "",
    table_section_id: 0,
    qr_code: "",
    is_in_use: 1,  // Default to "Active"
    display_seq: "",
};

// const table_section = [
//     { table_section_id: 1, table_section_name: "Zone A", is_in_use: 1, display_seq: 12 },
//     { table_section_id: 2, table_section_name: "Zone B", is_in_use: 1, display_seq: 10 },
//     { table_section_id: 3, table_section_name: "Zone C", is_in_use: 1, display_seq: 8 },
//     { table_section_id: 4, table_section_name: "Zone D", is_in_use: 0, display_seq: 5 },
//     { table_section_id: 5, table_section_name: "Zone E", is_in_use: 1, display_seq: 15 },
//   ];

const checkoutSchema = yup.object().shape({
    table_desc: yup.string().required("Table Name is required"),
    is_in_use: yup.number().required("Status is required"),
    
});

const Add_Table_Location = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/table");
    };
    const [tableSecOptions, setTableSecOptions] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:38998/ts/l", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
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
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const result = await response.json();
                if (result && result.data && Array.isArray(result.data.data)) {
                    setTableSecOptions(result.data.data);
                } else {
                    console.error("Unexpected response structure:", result);
                    setTableSecOptions([]);
                }
            } catch (error) {
                console.error("Failed to fetch payment modes:", error);
                setTableSecOptions([]);
            }
        };
    
        fetchData();
    }, []);

    const handleFormSubmit = (values, actions) => {
        const formData = {
            code: "setting-table",
            axn: "s",
            data: [
                {
                    current_uid: "tester",
                    table_id: "",
                    table_desc: values.table_desc,
                    table_section_id: values.table_section_id,
                    is_in_use: String(values.is_in_use),
                    display_seq: values.display_seq, 

                },
            ],
        };
    
        fetch('http://localhost:38998/t/s', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Use the constructed payload
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to submit form');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Add Data:', data);
                actions.resetForm(); // Reset the form on successful submission
                navigate("/table");
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to create data. Please try again.'); // Inform the user of the error
            });
    };
    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="New Table" />
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
                            <Box display="grid" justifyContent="flex-end" gap="20px" gridTemplateColumns="0.5fr 3fr">
                                
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Table Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Eg: A1"
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
                                    {tableSecOptions.filter(sec => sec.is_in_use).map(sec => (
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

                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Status: </FormLabel>
                                <RadioGroup
                                    row
                                    name="is_in_use"
                                    value={values.is_in_use}
                                    onChange={(e) => setFieldValue("is_in_use", Number(e.target.value))}
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
                                    fontWeight="bold"
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

export default Add_Table_Location;
