/* eslint-disable react/prop-types */
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../../components";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
});

const Add_Prod_Category = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values, actions) => {
        console.log(values);
        actions.resetForm({
        values: initialValues,
        });
    };
    return (
        <Box m="20px">
        <Header title=" New Product Category" />
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
            }) => (
            <form onSubmit={handleSubmit}>
                <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                    },
                }}
                >
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Category Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={touched.firstName && errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                    sx={{
                    gridColumn: "span 2",
                    }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Display Sequence"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={touched.lastName && errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Contact Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contact}
                    name="contact"
                    error={touched.contact && errors.contact}
                    helperText={touched.contact && errors.contact}
                    sx={{ gridColumn: "span 4" }}
                />
                
                </Box>
                <Box
                display="flex"
                alignItems="center"
                justifyContent="end"
                mt="20px"
                
                >
                <Button type="submit" color="secondary" variant="contained" sx={{backgroundColor:"#FFB000"}}>
                    Create New Category
                </Button>
                </Box>
            </form>
            )}
        </Formik>
        </Box>
        </Box>
    );
};

export default Add_Prod_Category;
