import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, MenuItem, Select } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import * as React from 'react';

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

const General_Setting = () => {
    const navigate = useNavigate();

    const initialValues = {
        CURRENT_TRANS_DATE: "",
        ORDER_NO_LENGTH: "",
        OPERATION_MODE: "",
        smtp_server: "",
        smtp_port: "",
        smtp_mailbox_id: "",
        smtp_mailbox_pwd: "",
        smtp_use_ssl:false,
        smtp_able_service:false,
        QR_ORDER_AVAILABILITY:false,
        POS_URL:"",
        POS_ADMIN_PORTAL_URL:"",
        POS_QR_ORDER_URL:""
        
    };

    const handleFormSubmit = (values, actions) => {
        console.log("Submitted Data", JSON.stringify(values, null, 2));

        actions.resetForm();
        navigate("/general-setting");
    };

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <Box ml={1}>
                    <Header title="General Settings" />
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
                                gap="20px" 
                                gridTemplateColumns="0.5fr 4.5fr"
                                alignItems="center"
                                marginBottom={3}
                            >
                                {Object.keys(initialValues).map((fieldKey) => (
                                    <React.Fragment key={fieldKey}>
                                        <FormLabel sx={{ fontWeight: "bold" }}>{fieldKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</FormLabel>
                                        {typeof initialValues[fieldKey] === 'boolean' ? (
                                            <RadioGroup
                                                row
                                                name={fieldKey}
                                                value={values[fieldKey] ? "active" : "inactive"}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value="active"  control={<Radio sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }} />}label="Active" />
                                                <FormControlLabel value="inactive" control={<Radio sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }} />}label="Inactive" />
                                            </RadioGroup>
                                        ) : (
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values[fieldKey]}
                                                name={fieldKey}
                                                error={touched[fieldKey] && Boolean(errors[fieldKey])}
                                                helperText={touched[fieldKey] && errors[fieldKey]}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
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

export default General_Setting;
