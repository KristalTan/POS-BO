import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';

const initialValues = {
    meal_period_desc: "",
    start_time: "",
    end_time: "",
    is_in_use: 1,  // Default to "Active"
    display_seq: "",
};


const checkoutSchema = yup.object().shape({
    meal_period_desc: yup.string().required("Meal Period Name is required"),
    is_in_use: yup.number().required("Status is required"),
    start_time: yup.string().required("Start Time is required"),
    end_time: yup.string().required("End Time is required"),
    
});

const Add_Meal_Period = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/meal-period");
    };

    const handleFormSubmit = (values, actions) => {
        const formData = {
            code: "setting-meal-period",
            axn: "s",
            data: [
                {
                    current_uid: "tester", // Replace with the current user's UID if dynamic
                    meal_period_id: "",   // Leave empty for a new record
                    meal_period_desc: values.meal_period_desc,
                    start_time: values.start_time,
                    end_time: values.end_time,
                    is_in_use: String(values.is_in_use), // Convert to string as required
                    display_seq: values.display_seq, // Ensure 6-digit sequence
                },
            ],
        };
    
        fetch('http://localhost:38998/mp/s', {
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
                navigate("/meal-period"); // Redirect to the meal period list
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
                    <Header title="New Meal Period" />
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

export default Add_Meal_Period;
