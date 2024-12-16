import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';

const initialValues = {
    tax_code: "",
    tax_desc: "",
    tax_pct: "",
    is_in_use: 1,  // Default to "Active"
    display_seq: "",
};

const checkoutSchema = yup.object().shape({
    tax_code: yup.string().required("Tax Code is required"),
    tax_desc: yup.string().required("Tax Name is required"),
    tax_pct: yup.number().required("Tax Percentage is required"),
    is_in_use: yup.number().required("Status is required"),    
});

const Add_Tax = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/tax");
    };
    const handleFormSubmit = (values, actions) => {
        const formData = {
            code: 'setting-tax',
            axn: "s",
            data: [
                {
                    current_uid: "tester",
                    tax_id: "",
                    tax_code: values.tax_code,
                    tax_desc: values.tax_desc,
                    tax_pct: values.tax_pct,
                    is_in_use: String(values.is_in_use),
                    display_seq: values.display_seq, 
                },
            ],
        };
    
        fetch('http://localhost:38998/tax/s', {
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
                navigate("/tax");
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
                    <Header title="New Tax" />
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
                                
                                <FormLabel sx={{ fontWeight: "bold" }}>Tax Name:</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.tax_desc}
                                    name="tax_desc"
                                    label="Eg: Service Charge"
                                    error={touched.tax_desc && Boolean(errors.tax_desc)}
                                    helperText={touched.tax_desc && errors.tax_desc}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Tax Code:</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.tax_code}
                                    name="tax_code"
                                    label="Eg: SC 6%"
                                    error={touched.tax_code && Boolean(errors.tax_code)}
                                    helperText={touched.tax_code && errors.tax_code}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Tax Percentage (%):</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.tax_pct}
                                    name="tax_pct"
                                    error={touched.tax_pct && Boolean(errors.tax_pct)}
                                    helperText={touched.tax_pct && errors.tax_pct}
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

export default Add_Tax;
