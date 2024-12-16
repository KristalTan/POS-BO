import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';

const initialValues = {
    table_section_name: "",
    is_in_use: 1,  // Default to "Active"
    display_seq: "",
};


const checkoutSchema = yup.object().shape({
    table_section_name: yup.string().required("Table Section Name is required"),
    is_in_use: yup.number().required("Status is required"),
});

const Add_Table_Section = () => {
    const navigate = useNavigate();
    const prevPage = () => {
        navigate("/table-sec");
    };

    const handleFormSubmit = (values, actions) => {
        const formData = {
            code: "setting-table-sec",
            axn: "s",
            data: [
                {
                    current_uid: "tester",
                    table_section_id: "",
                    table_section_name: values.table_section_name,
                    is_in_use: String(values.is_in_use),
                    display_seq: values.display_seq, 
                },
            ],
        };
    
        fetch('http://localhost:38998/ts/s', {
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
                navigate("/table-sec");
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
                    <Header title="New Table Section" />
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
                                
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Table Section Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Eg: Zone X"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.table_section_name}
                                    name="table_section_name"
                                    error={touched.table_section_name && Boolean(errors.table_section_name)}
                                    helperText={touched.table_section_name && errors.table_section_name}
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

export default Add_Table_Section;
