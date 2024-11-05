import { Box, Button, TextField, useMediaQuery, IconButton, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';

const initialValues = {
    categoryName: "",
    displaySequence: "",
    status: 1,  // Default to "active"
};

const checkoutSchema = yup.object().shape({
    categoryName: yup.string().required("Category Name is required"),
    status: yup.string().required("Status is required"),
    displaySequence: yup
        .number()
        .typeError("Display Sequence must be a number"),
});

const Edit_Prod_Category = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/product-category");
    };

    //
    const handleFormSubmit = (values, actions) => {
        navigate("/product-category");
    };

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="Edit Product Category" />
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
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box display="grid" justifyContent="flex-end" gap="20px" gridTemplateColumns="0.5fr 3fr">
                                
                                {/* Category Name */}
                                <FormLabel sx={{ alignSelf: "center",fontWeight:"bold" }}>Category Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Eg: Breakfast"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.categoryName}
                                    name="categoryName"
                                    error={touched.categoryName && Boolean(errors.categoryName)}
                                    helperText={touched.categoryName && errors.categoryName}
                                />

                                {/* Display Sequence */}
                                <FormLabel sx={{ alignSelf: "center",fontWeight:"bold"}}>Display Sequence: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Eg: 1"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.displaySequence}
                                    name="displaySequence"
                                    error={touched.displaySequence && Boolean(errors.displaySequence)}
                                    helperText={touched.displaySequence && errors.displaySequence}
                                />

                                {/* Status */}
                                <FormLabel sx={{ alignSelf: "center", fontWeight:"bold" }}>Status: </FormLabel>
                                <RadioGroup
                                    row
                                    name="status"
                                    value={values.status}
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
                            </Box>

                            <Box display="flex" justifyContent="flex-end" mt="20px">
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    fontWeight="bold"
                                    sx={{ backgroundColor: "#FFB000",
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

export default Edit_Prod_Category;
