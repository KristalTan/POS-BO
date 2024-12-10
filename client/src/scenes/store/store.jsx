import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, MenuItem, Select } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const checkoutSchema = yup.object().shape({
    store_name: yup.string().required("Store Name is required"),
    addr_line_1: yup.string().required("Address Line 1 is required"),
    city: yup.string().required("City is required"),
    state: yup.number().required("State is required"),
    post_code: yup.string().required("Post Code is required"),
    country: yup.number().required("Country is required"),
    phone_number: yup.string().matches(/^[0-9]{3}-[0-9]{7,8}$/).required("Phone Number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    website: yup.string().url("Invalid URL").required("Website is required"),
    gst_id: yup.string().required("GST ID is required"),
    sst_id: yup.string().required("SST ID is required"),
    business_registration_num: yup.string().required("Business Registration Number is required"),
    receipt_temp_id: yup.number().required("Receipt Template ID is required"),
});

const Store = () => {
    const navigate = useNavigate();

    const initialValues = {
        store_id: 1,
        store_name: "ABC Sdn Bhd",
        addr_line_1: "123 Road ABC",
        addr_line_2: "",
        city: "Petaling Jaya",
        state: 0,
        post_code: "46000",
        country: 1,
        phone_number: "888-888888",
        email: "abc@abc.com",
        website: "www.abc.com",
        gst_id: "123456ABC",
        sst_id: "12345ABC",
        business_registration_num: "123456ABC",
        receipt_temp_id: 1,
    };

    const handleFormSubmit = (values, actions) => {
        console.log("Submitted Data", JSON.stringify(values, null, 2));

        actions.resetForm();
        navigate("/store");
    };

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <Box ml={1}>
                    <Header title="Store" />
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
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box 
                            display="grid" 
                            alignItems="center"
                            gap="20px" 
                            gridTemplateColumns="0.5fr 4.5fr"
                            marginBottom={3}
                            >
                                <FormLabel sx={{ fontWeight: "bold" }}>Store Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.store_name}
                                    name="store_name"
                                    error={touched.store_name && Boolean(errors.store_name)}
                                    helperText={touched.store_name && errors.store_name}
                                />
                            </Box>
                            <Box 
                                display="grid" 
                                gap="20px" 
                                gridTemplateColumns="0.5fr 2fr 0.5fr 2fr" 
                                alignItems="center"
                            >
                                
                                <FormLabel sx={{ fontWeight: "bold" }}>Address Line 1: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.addr_line_1}
                                    name="addr_line_1"
                                    error={touched.addr_line_1 && Boolean(errors.addr_line_1)}
                                    helperText={touched.addr_line_1 && errors.addr_line_1}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>Address Line 2: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.addr_line_2}
                                    name="addr_line_2"
                                    error={touched.addr_line_1 && Boolean(errors.addr_line_1)}
                                    helperText={touched.addr_line_1 && errors.addr_line_1}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>City: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="City"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.city}
                                    name="city"
                                    error={touched.city && Boolean(errors.city)}
                                    helperText={touched.city && errors.city}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>State: </FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.state}
                                    onChange={handleChange}
                                    name="state"
                                >
                                    <MenuItem value={0}>Select State</MenuItem>
                                    {/* {state.map(state => (
                                        <MenuItem key={state.state_id} value={state.state_id}>
                                            {state.state_name}
                                        </MenuItem>
                                    ))} */}
                                </Select>
                                <FormLabel sx={{ fontWeight: "bold" }}>Postcode: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.post_code}
                                    name="post_code"
                                    error={touched.post_code && Boolean(errors.post_code)}
                                    helperText={touched.post_code && errors.post_code}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>Country: </FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.country}
                                    onChange={handleChange}
                                    name="country"
                                >
                                    <MenuItem value={0}>Select Country</MenuItem>
                                    {/* {country.map(country => (
                                        <MenuItem key={country.country_id} value={country.country_id}>
                                            {country.country_name}
                                        </MenuItem>
                                    ))} */}
                                </Select>
                                <FormLabel sx={{ fontWeight: "bold" }}>Phone Number: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phone_number}
                                    name="phone_number"
                                    error={touched.phone_number && Boolean(errors.phone_number)}
                                    helperText={touched.phone_number && errors.phone_number}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>Email: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>Website: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.website}
                                    name="website"
                                    error={touched.website && Boolean(errors.website)}
                                    helperText={touched.website && errors.website}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>GST ID: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.gst_id}
                                    name="gst_id"
                                    error={touched.gst_id && Boolean(errors.gst_id)}
                                    helperText={touched.gst_id && errors.gst_id}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>SST ID: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sst_id}
                                    name="sst_id"
                                    error={touched.sst_id && Boolean(errors.sst_id)}
                                    helperText={touched.sst_id && errors.sst_id}
                                />
                                <FormLabel sx={{ fontWeight: "bold" }}>Business Registration Number: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.business_registration_num}
                                    name="business_registration_num"
                                    error={touched.business_registration_num && Boolean(errors.business_registration_num)}
                                    helperText={touched.business_registration_num && errors.business_registration_num}
                                />
                                {/* <FormLabel sx={{ fontWeight: "bold" }}>SST ID: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.receipt_temp_id}
                                    name="receipt_temp_id"
                                    error={touched.receipt_temp_id && Boolean(errors.receipt_temp_id)}
                                    helperText={touched.receipt_temp_id && errors.receipt_temp_id}
                                /> */}
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

export default Store;
