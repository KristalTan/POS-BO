import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, MenuItem, Select } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';

const initialValues = {
    pos_station_desc: "",
    ip: "",
    default_printer_id: 0,
    is_in_use: 1,  // Default to "Active"
    display_seq: "",
};

const printer = [
    { pos_printer_id: 1, pos_printer_code: "Cashier Receipt", pos_printer_name:"",is_in_use: 1, display_seq: 12, is_default:1, printer_type_id:1 },
    { pos_printer_id: 2, pos_printer_code: "Kitchen", pos_printer_name:"",is_in_use: 1, display_seq: 10, is_default:0, printer_type_id:1},
    { pos_printer_id: 3, pos_printer_code: "Office Printer",pos_printer_name:"",is_in_use: 1, display_seq: 8,is_default:0, printer_type_id:1 },
    ];

const checkoutSchema = yup.object().shape({
    pos_station_desc: yup.string().required("POS Station Name is required"),
    is_in_use: yup.number().required("Status is required"),
    ip: yup.string().required("IP is required"),
    default_printer_id: yup.number().required("Default Printer is required"),
    
});

const Add_Station = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/station");
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

            body: {
                "meal_period_desc": "Lunch",
                "start_time": "15:24",
                "end_time": "20:24",
                "is_in_use": 1,
                "display_seq": "q122"
            }

        */
    
        actions.resetForm();
        navigate("/station"); 
    };
    
    

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="New POS Station" />
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
                                
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>POS Station Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Eg: Kitchen"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.pos_station_desc}
                                    name="pos_station_desc"
                                    error={touched.pos_station_desc && Boolean(errors.pos_station_desc)}
                                    helperText={touched.pos_station_desc && errors.pos_station_desc}
                                />

                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>IP Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.ip}
                                    name="ip"
                                    error={touched.ip && Boolean(errors.ip)}
                                    helperText={touched.ip && errors.ip}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Default Printer:</FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.default_printer_id}
                                    onChange={handleChange}
                                    name="default_printer_id"
                                >
                                    <MenuItem value={0}>Select Printer</MenuItem>
                                    {printer.filter(printer => printer.is_in_use).map(printer => (
                                        <MenuItem key={printer.pos_printer_id} value={printer.pos_printer_id}>
                                            {printer.pos_printer_code}
                                        </MenuItem>
                                    ))}
                                </Select>

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

export default Add_Station;
