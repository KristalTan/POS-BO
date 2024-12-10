import { Box, Button, TextField, IconButton, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { ChevronLeftOutlined } from '@mui/icons-material';


const checkoutSchema = yup.object().shape({
    user_group_desc: yup.string().required("User Group Name is required"),
    is_in_use: yup.number().required("Status is required"),


});

const action = [
    { action_id: 1, action_desc: "Add new user" },
    { action_id: 2, action_desc: "Take order" },
    { action_id: 3, action_desc: "Void Bill"},
    { action_id: 4, action_desc: "Cancel Order" },
    { action_id: 5, action_desc: "Edit store"},
    { action_id: 6, action_desc: "Add new user" },
    { action_id: 7, action_desc: "Take order" },
    { action_id: 8, action_desc: "Void Bill"},
    { action_id: 9, action_desc: "Cancel Order" },
    { action_id: 10, action_desc: "Edit store"},
  ];

const Edit_User_Group = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const response = location.state?.response;

    const initialValues = {
        user_group_desc: response?.user_group_desc || "",
        is_in_use: response?.is_in_use || 0,
        display_seq: response?.display_seq || "",
        actions: response?.actions || [],
    };

    const prevPage = () => {
        navigate("/user-group");
    };

    // const handleFormSubmit = (values, actions) => {
    //     // Make the POST request to the backend
    //     fetch('http://your-backend-url/api/data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(values), // Send the form values
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Failed to submit form');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log('Success:', data);
    //             actions.resetForm(); // Reset the form if needed
    //             navigate("/meal-period"); // Redirect after successful submission
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             // Handle error appropriately (e.g., show error message)
    //         });
    // };

    const handleFormSubmit = (values, actions) => {
        console.log('body', JSON.stringify(values, null, 2));

        /*

            body {
                "meal_period_desc": "Dinner",
                "start_time": "07:00",
                "end_time": "11:59",
                "is_in_use": 1,
                "display_seq": "a8"
            }

        */
    
        actions.resetForm();
        navigate("/user-group"); 
    };

    return (
        <Box m="20px">
            <Box display="flex" alignItems="center" mb="2px">
                <IconButton onClick={prevPage}>
                    <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
                </IconButton>
                <Box ml={1}>
                    <Header title="Edit User Group" />
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
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>User Group Name: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.user_group_desc}
                                    name="user_group_desc"
                                    error={touched.user_group_desc && Boolean(errors.user_group_desc)}
                                    helperText={touched.user_group_desc && errors.user_group_desc}
                                />

                                <FormLabel sx={{ fontWeight: "bold" }}>Actions:</FormLabel>
                                <Box display="grid" flexDirection="column" gap="10px" width="100%" gridTemplateColumns="3fr 3fr">
                                    {action.map((actionItem) => (
                                        <FormControlLabel
                                            key={actionItem.action_id}
                                            control={
                                                <Checkbox
                                                    checked={values.actions.includes(actionItem.action_id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFieldValue("actions", [...values.actions, actionItem.action_id]);
                                                        } else {
                                                            setFieldValue(
                                                                "actions",
                                                                values.actions.filter((id) => id !== actionItem.action_id)
                                                            );
                                                        }
                                                    }}
                                                    name={`action_${actionItem.action_id}`}
                                                    sx={{ color: "#7D7C7C", '&.Mui-checked': { color: "#7D7C7C" } }}
                                                />
                                            }
                                            label={actionItem.action_desc}
                                        />
                                    ))}
                                </Box>   

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
                                <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Display Sequence: </FormLabel>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
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

export default Edit_User_Group;
