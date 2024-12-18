import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';


const checkoutSchema = yup.object().shape({
    meal_period_desc: yup.string().required("Meal Period Name is required"),
    is_in_use: yup.number().required("Status is required"),
    start_time: yup.string().required("Start Time is required"),
    end_time: yup.string().required("End Time is required"),

});

const Edit_Printer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const response = location.state?.response;

    const initialValues = {
        meal_period_desc: response?.meal_period_desc || "",
        start_time: response?.start_time || "",
        end_time: response?.end_time || "",
        is_in_use: response?.is_in_use || 0,
        display_seq: response?.display_seq || "",
    };

    const prevPage = () => {
        navigate("/meal-period");
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
        navigate("/meal-period"); 
    };

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="Edit Meal Period" />
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
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Meal Period Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Eg: Breakfast"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.meal_period_desc}
                                    name="meal_period_desc"
                                    error={touched.meal_period_desc && Boolean(errors.meal_period_desc)}
                                    helperText={touched.meal_period_desc && errors.meal_period_desc}
                                />

                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Time Range: </FormLabel>
                                <Box display="flex" alignItems="center" gap="10px" width="100%">
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="time"
                                        // label="Start Time"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.start_time}
                                        name="start_time"
                                        error={touched.start_time && Boolean(errors.start_time)}
                                        helperText={touched.start_time && errors.start_time}
                                    />
                                    
                                    {/* Add "to" between the time fields */}
                                    <Typography variant="body1" > - </Typography>
                                    
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="time"
                                        // label="End Time"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.end_time}
                                        name="end_time"
                                        error={touched.end_time && Boolean(errors.end_time)}
                                        helperText={touched.end_time && errors.end_time}
                                    />
                                </Box>      

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

export default Edit_Printer;
