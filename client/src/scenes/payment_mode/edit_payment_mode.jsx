import {
    Box,
    Button,
    TextField,
    IconButton,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Select,
    MenuItem,
  } from "@mui/material";
  import { Header } from "../../components";
  import { Formik } from "formik";
  import { useNavigate, useLocation } from "react-router-dom";
  import * as yup from "yup";
  import { ChevronLeftOutlined } from "@mui/icons-material";
  import * as React from "react";
  
  const checkoutSchema = yup.object().shape({
    pymt_mode_desc: yup.string().required("Payment Mode Name is required"),
    is_in_use: yup.number().required("Status is required"),
    pymt_type: yup.number().required("Payment Type is required"),
    // Uncomment this if `for_store` is required
    // for_store: yup.string().required("Store field is required"),
  });
  
  const Edit_Payment_Mode = () => {
    const [pymtTypeOptions, setPymtTypeOptions] = React.useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const response = location.state?.response;
  
    const prevPage = () => {
      navigate("/payment-mode");
    };
  
    const initialValues = {
      pymt_mode_desc: response?.pymt_mode_desc || "",
      pymt_type: response?.pymt_type || 0,
      for_store: response?.for_store || "",
      is_in_use: response?.is_in_use || 0, // Default to "Inactive"
    };
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:38998/pm/ptl", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: "setting-pymt-mode",
              axn: "tl",
              data: [
                {
                  current_uid: "tester",
                  is_in_use: -1,
                },
              ],
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const result = await response.json();
          if (result?.data?.data && Array.isArray(result.data.data)) {
            setPymtTypeOptions(result.data.data);
          } else {
            console.error("Unexpected response structure:", result);
            setPymtTypeOptions([]);
          }
        } catch (error) {
          console.error("Failed to fetch payment modes:", error);
          setPymtTypeOptions([]);
        }
      };
  
      fetchData();
    }, []);
  
    const handleFormSubmit = (values, actions) => {
      const formData = {
        code: "setting-pymt-mode",
        axn: "s",
        data: [
          {
            current_uid: "tester", // Replace with the current user's UID if dynamic
            pymt_mode_id: response?.pymt_mode_id, // Leave empty for a new record
            pymt_mode_desc: values.pymt_mode_desc,
            pymt_type: values.pymt_type,
            is_in_use: String(values.is_in_use), // Convert to string as required
          },
        ],
      };
  
      fetch("http://localhost:38998/pm/s", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Use the constructed payload
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to submit form");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Form submitted successfully:", data);
          actions.resetForm(); // Reset the form on successful submission
          navigate("/payment-mode");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Failed to create data. Please try again."); // Inform the user of the error
        });
    };
  
    return (
      <Box m="20px">
        <Box display="flex" alignItems="center" mb="2px">
          <IconButton onClick={prevPage}>
            <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
          </IconButton>
          <Box ml={1}>
            <Header title="Edit Payment Mode" />
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
                <Box
                  display="grid"
                  justifyContent="flex-end"
                  gap="20px"
                  gridTemplateColumns="0.5fr 3fr"
                >
                  <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>
                    Payment Mode Name:
                  </FormLabel>
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
                    {pymtTypeOptions.map((pymt) => (
                      <MenuItem key={pymt.pymt_type_id} value={pymt.pymt_type_id}>
                        {pymt.pymt_type_desc}
                      </MenuItem>
                    ))}
                  </Select>
  
                  <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>
                    Status:
                  </FormLabel>
                  <RadioGroup
                    row
                    name="is_in_use"
                    value={values.is_in_use}
                    onChange={(e) => setFieldValue("is_in_use", Number(e.target.value))}
                  >
                    <FormControlLabel
                      value={1}
                      control={
                        <Radio
                          sx={{
                            color: "#7D7C7C",
                            "&.Mui-checked": { color: "#7D7C7C" },
                          }}
                        />
                      }
                      label="Active"
                    />
                    <FormControlLabel
                      value={0}
                      control={
                        <Radio
                          sx={{
                            color: "#7D7C7C",
                            "&.Mui-checked": { color: "#7D7C7C" },
                          }}
                        />
                      }
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
  
  export default Edit_Payment_Mode;
  