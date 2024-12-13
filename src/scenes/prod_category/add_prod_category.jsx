import { Box, Button, TextField, useMediaQuery, IconButton, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';


const initialValues = {
    category_desc: "",
    display_seq: "",
    is_in_use: 1,  // Default to "active"
};

const checkoutSchema = yup.object().shape({
    category_desc: yup.string().required("Category Name is required"),
    is_in_use: yup.string().required("Status is required"),
});

const Add_Prod_Category = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/product-category");
    };

    //
    const handleFormSubmit = (values, actions) => {
        const formData = {
            code: "prod-category",
            axn: "s",
            data: [
                {
                    current_uid: "tester",
                    category_id: "",
                    category_desc: values.category_desc,
                    is_in_use: String(values.is_in_use),
                    display_seq: values.display_seq, 
                },
            ],
        };
    
        fetch('http://localhost:38998/prodCat/s', {
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
                navigate("/product-category");
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
                    <Header title="New Product Category" />
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
                                    value={values.category_desc}
                                    name="category_desc"
                                    error={touched.category_desc && Boolean(errors.category_desc)}
                                    helperText={touched.category_desc && errors.category_desc}
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
                                    value={values.display_seq}
                                    name="display_seq"
                                    error={touched.display_seq && Boolean(errors.display_seq)}
                                    helperText={touched.display_seq && errors.display_seq}
                                />

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

export default Add_Prod_Category;
