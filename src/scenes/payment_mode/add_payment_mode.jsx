import { Box, Button, TextField, IconButton, FormControlLabel, FormLabel, Radio, RadioGroup, Select, MenuItem } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';

const initialValues = {
    pymt_mode_desc: "",
    pymt_type: 0,
    for_store: "",
    is_in_use: 1,  // Default to "Active"
};

const pymt_type = [
    { id: 1, pymt_type_desc: "Cash"},
    { id: 2, pymt_type_desc: "Bank Transfer"},
    { id: 3, pymt_type_desc: "Visa Card"},
    { id: 4, pymt_type_desc: "MasterCard"},
  ];

const rows = [
    { pymt_mode_id: 1, pymt_mode_desc: "Bank Transfer", pymt_type: 1, for_store:"", is_in_use:1 },
    { pymt_mode_id: 2, pymt_mode_desc: "Credit card", pymt_type: 1, for_store:"", is_in_use: 1 },
    { pymt_mode_id: 3, pymt_mode_desc: "QR Pay", pymt_type: 1, for_store:"", is_in_use: 1 },
    { pymt_mode_id: 4, pymt_mode_desc: "E-wallet", pymt_type: 1, for_store:"", is_in_use: 0 },
  ];

const checkoutSchema = yup.object().shape({
    pymt_mode_desc: yup.string().required("Payment Mode Name is required"),
    is_in_use: yup.number().required("Status is required"),
    pymt_type: yup.number().required("Payment Type is required"),
    
});

const Add_Payment_Mode = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/payment-mode");
    };

    const handleFormSubmit = (values, actions) => {
        console.log('body', JSON.stringify(values, null, 2));

        // body {
        //     "pymt_mode_desc": "f",
        //     "pymt_type": 1,
        //     "for_store": "",
        //     "is_in_use": 0
        //   }
    
        actions.resetForm();
        navigate("/payment-mode"); 
    };
    
    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="New Payment Mode" />
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
                                
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Payment Mode Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Eg: Credit Card"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.pymt_mode_desc}
                                    name="pymt_mode_desc"
                                    error={touched.pymt_mode_desc && Boolean(errors.pymt_mode_desc)}
                                    helperText={touched.pymt_mode_desc && errors.pymt_mode_desc}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Payment Type:</FormLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    value={values.pymt_type}
                                    onChange={handleChange}
                                    name="pymt_type"
                                >
                                    <MenuItem value={0}>Select Payment Type</MenuItem>
                                    {pymt_type.map((pymt) => (
                                        <MenuItem key={pymt.id} value={pymt.id}>
                                            {pymt.pymt_type_desc}
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

                            </Box>

                            <Box display="flex" justifyContent="flex-end" mt="20px">
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
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

export default Add_Payment_Mode;
