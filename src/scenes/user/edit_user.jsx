import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, Select, MenuItem, InputAdornment } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import * as React from 'react';

const user_group = [
    { user_group_id: 1, user_group_desc: "Manager", is_in_use: 1, display_seq: 12, actions: [1, 2, 3] },
    { user_group_id: 2, user_group_desc: "CEO", is_in_use: 1, display_seq: 10, actions: [2, 4, 5] },
    { user_group_id: 3, user_group_desc: "Supervisor", is_in_use: 1, display_seq: 8, actions: [1, 3, 5] },
    { user_group_id: 4, user_group_desc: "Cashier", is_in_use: 0, display_seq: 5, actions: [3, 4] },
    { user_group_id: 5, user_group_desc: "Waiter", is_in_use: 1, display_seq: 15, actions: [2, 5] },
];

const checkoutSchema = yup.object().shape({
    login_id: yup.string().required("Login ID is required"),
    user_name: yup.string().required("Username is required"),
    user_group_id: yup.number().required("User Group is required"),
    is_active: yup.number().required("Status is required"),
    email: yup.string().required("Email is required"),
    pwd: yup.string().required("Password is required"),
});

const Edit_User = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const response = location.state?.response;

    const initialValues = {
        login_id: response?.login_id || "",
        user_name: response?.user_name || "",
        user_group_id: response?.user_group_id || 0,
        email: response?.email || "",
        pwd: response?.pwd || "",
        is_active: response?.is_active || 1,
    };

    const [showPassword, setShowPassword] = React.useState(false); // State to toggle password visibility

    const prevPage = () => {
        navigate("/user");
    };

    const handleFormSubmit = (values, actions) => {
        console.log('body', JSON.stringify(values, null, 2));

        // body {
        //     "login_id": "a",
        //     "user_name": "a",
        //     "user_group_id": 1,
        //     "email": "a@abc.com",
        //     "pwd": "awdada",
        //     "is_active": 1
        // }

        actions.resetForm();
        navigate("/user");
    };

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="Edit User" />
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
                                
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Login ID: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.login_id}
                                    name="login_id"
                                    error={touched.login_id && Boolean(errors.login_id)}
                                    helperText={touched.login_id && errors.login_id}
                                />

                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Username: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.user_name}
                                    name="user_name"
                                    error={touched.user_name && Boolean(errors.user_name)}
                                    helperText={touched.user_name && errors.user_name}
                                />

                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Password: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type={showPassword ? "text" : "password"} // Toggle password visibility
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.pwd}
                                    name="pwd"
                                    error={touched.pwd && Boolean(errors.pwd)}
                                    helperText={touched.pwd && errors.pwd}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Email: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>User Group:</FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.user_group_id}
                                    onChange={handleChange}
                                    name="user_group_id"
                                    error={touched.user_group_id && Boolean(errors.user_group_id)}
                                    displayEmpty
                                    sx={{ textAlign: "left" }}
                                >
                                    <MenuItem value={0}>Select User Group</MenuItem>
                                    {user_group
                                        .filter(group => group.is_in_use)
                                        .map(group => (
                                            <MenuItem key={group.user_group_id} value={group.user_group_id}>
                                                {group.user_group_desc}
                                            </MenuItem>
                                        ))}
                                </Select>
                                {touched.user_group_id && errors.user_group_id && (
                                    <Typography variant="body2" color="error">
                                        {errors.user_group_id}
                                    </Typography>
                                )}

                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Status: </FormLabel>
                                <RadioGroup
                                    row
                                    name="is_active"
                                    value={values.is_active}
                                    onChange={(e) => setFieldValue("is_active", Number(e.target.value))}
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

export default Edit_User;
