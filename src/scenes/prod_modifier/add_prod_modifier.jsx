import {
    Box,
    Button,
    Typography,
    TextField,
    useMediaQuery,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Checkbox,
    Select,
    MenuItem,
    InputLabel
  } from "@mui/material";
  import { Header } from "../../components";
  import { Formik, Form, Field, FieldArray } from "formik";
  import { useNavigate } from "react-router-dom";
  import * as Yup from "yup"; // Import Yup for validation
  import { ChevronLeftOutlined } from '@mui/icons-material';
  import Stepper from '@mui/material/Stepper';
  import Step from '@mui/material/Step';
  import StepLabel from '@mui/material/StepLabel';
  import * as React from 'react';
  import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

  
  const steps = ['Create modifier group', 'Create modifier option', 'Select modifier product'];
  
  const Add_Prod_Modifier = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  
    const prevPage = () => {
      navigate("/product-modifier");
    };
  
    const handleFormSubmit = (values) => {
      console.log("Final Submission Values:", values);
    };
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    return (
      <Box m="20px">
        <Box display="flex" alignItems="center" mb="20px">
          <IconButton onClick={prevPage}>
            <ChevronLeftOutlined style={{ color: "#272829", fontSize: "38px" }} />
          </IconButton>
          <Box ml={1}>
            <Header title="New Product Modifier" />
          </Box>
        </Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                sx={{
                    color: activeStep === index ? '#FFB000' : '#7D7C7C',
                    '& .MuiStepIcon-root.Mui-active': {
                      color: '#FFB000',
                    },
                    '& .MuiStepIcon-root': {
                      color: activeStep === index ? '#FFB000' : '#7D7C7C',
                    },
                    '& .MuiStepIcon-root .MuiStepIcon-text': {
                        fill: activeStep === index ? 'black' : 'white', // Conditionally set text color within icon
                    },
                    
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
  
        <Box
          border="0.1px solid"
          borderColor="#272829"
          p="15px"
          borderRadius="12px"
          mt="20px"
        >
          {activeStep === 0 && (
            <StepForm1 onNext={handleNext} />
          )}
          {activeStep === 1 && (
            <StepForm2 onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 2 && (
            <StepForm3 onSubmit={handleFormSubmit} onBack={handleBack} />
          )}
        </Box>
      </Box>
    );
  };
  
  // Step 1 Form Component
  const StepForm1 = ({ onNext }) => {
    const initialValues = { modifierGroupName: '', optionType: '' };
    const validationSchema = Yup.object().shape({
      modifierGroupName: Yup.string().required('Required'),
      optionType: Yup.string().required('Required'),
    });
  
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Step 1 Values:", values); // Optional: Log values for debugging
          onNext();
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Box display="grid" justifyContent="flex-end" gap="20px" gridTemplateColumns="0.5fr 3fr">
              <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Modifier Group Name:</FormLabel>
              <Field
                name="modifierGroupName"
                variant="filled"
                label="Eg: Pizza Toppings"
                as={TextField}
                fullWidth
                margin="normal"
              />
          
              <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Choice Type:</FormLabel>
              <RadioGroup
                row
                name="optionType"
                value={values.optionType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      sx={{
                        color: "#7D7C7C",
                        '&.Mui-checked': { color: "#7D7C7C" },
                      }}
                    />
                  }
                  label="Single Option"
                />
                <FormControlLabel
                  value="0"
                  control={
                    <Radio
                      sx={{
                        color: "#7D7C7C",
                        '&.Mui-checked': { color: "#7D7C7C" },
                      }}
                    />
                  }
                  label="Multiple Option"
                />
              </RadioGroup>
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2}>
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
                Next
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    );
  };
    
  
  const StepForm2 = ({ onNext, onBack }) => {
  const initialValues = {
    modifierOptions: [{ modifierOptionName: '', addon_amt: '', isDefault: false }],
  };

  const validationSchema = Yup.object().shape({
    modifierOptions: Yup.array().of(
      Yup.object().shape({
        modifierOptionName: Yup.string().required('Required'),
        addon_amt: Yup.number().typeError('Must be a number').required('Required'),
        isDefault: Yup.boolean(),
      })
    ).test(
      'unique-isDefault',
      'Only one modifier option can be set as default',
      (modifierOptions) => {
        const defaultCount = modifierOptions.filter(option => option.isDefault).length;
        return defaultCount <= 1;
      }
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Step 2 Values:", values); // Optional: Log values for debugging
        onNext();
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <FieldArray
            name="modifierOptions"
            render={(arrayHelpers) => (
              <Box display="flex" flexDirection="column" gap="20px">
                {values.modifierOptions.map((option, index) => (
                  <Box
                    key={index}
                    p={2}
                    borderRadius="8px"
                    border="1px solid #ccc"
                    bgcolor="#F5F5F7"
                    // boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                  >
                    <Box display="grid" gridTemplateColumns="0.5fr 3fr" gap="20px" mb={2}>
                      <FormLabel sx={{ alignSelf: "center", fontWeight: "bold" }}>Option Name:</FormLabel>
                      <Field
                        name={`modifierOptions[${index}].modifierOptionName`}
                        variant="filled"
                        label="E.g., Extra Cheese"
                        as={TextField}
                        fullWidth
                        margin="normal"
                      />

                      <FormLabel sx={{ fontWeight: "bold" }}>Add-On Amount:</FormLabel>
                      <Field
                        name={`modifierOptions[${index}].addon_amt`}
                        type="number"
                        variant="filled"
                        label="E.g., 1.50"
                        as={TextField}
                        fullWidth
                        margin="normal"
                      />
                      <FormLabel sx={{fontWeight: "bold" }}>Is Default:</FormLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={option.isDefault}
                        onChange={() => {
                          values.modifierOptions.forEach((_, idx) => {
                            setFieldValue(`modifierOptions[${idx}].isDefault`, false);
                          });
                          setFieldValue(`modifierOptions[${index}].isDefault`, true);
                        }}
                        sx={{
                          color: "#7D7C7C",
                          '&.Mui-checked': { color: "#7D7C7C" },
                        }}
                      />
                      </Box>

                    </Box>

                    <Box display="flex" justifyContent="flex-end">
                      <IconButton
                        onClick={() => arrayHelpers.remove(index)}
                        disabled={values.modifierOptions.length === 1}
                        color="error"
                        aria-label="Remove Modifier Option"
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    </Box>
                  </Box>
                ))}

                <Box display="flex" justifyContent="center">
                  <IconButton
                    onClick={() => arrayHelpers.push({ modifierOptionName: '', addon_amt: '', isDefault: false })}
                    // color="#004225"
                    aria-label="Add Modifier Option"
                  >
                    <AddCircleOutline />
                    <Typography ml={1}>Add Another Modifier Option</Typography>
                  </IconButton>
                </Box>
              </Box>
            )}
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button color="primary" onClick={onBack} variant="contained">
              Back
            </Button>
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
              Next
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};


const StepForm3 = ({ onSubmit, onBack }) => {
  const initialValues = { modifierProducts: [''] };

  const validationSchema = Yup.object().shape({
    modifierProducts: Yup.array()
      .of(Yup.string().required('Required'))
      .test(
        "no-duplicates",
        "Duplicate products are not allowed",
        (value) => value && new Set(value).size === value.length
      ),
  });

  // Sample product options
  const sampleProducts = [
    { label: "Extra Cheese", value: "extra_cheese" },
    { label: "Bacon", value: "bacon" },
    { label: "Olives", value: "olives" },
    { label: "Mushrooms", value: "mushrooms" },
    { label: "Pepperoni", value: "pepperoni" },
  ];

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <FieldArray
              name="modifierProducts"
              render={(arrayHelpers) => (
                <Box display="grid" gap="20px">
                  {values.modifierProducts.map((_, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <InputLabel sx={{ display: "none" }}>Modifier Product</InputLabel>
                      <Field
                        name={`modifierProducts[${index}]`}
                        as={Select}
                        fullWidth
                        variant="filled"
                        displayEmpty
                        margin="normal"
                        error={Boolean(errors.modifierProducts && errors.modifierProducts[index])}
                        helperText={errors.modifierProducts && errors.modifierProducts[index]}
                      >
                        <MenuItem value="" disabled>
                          Select a Modifier Product
                        </MenuItem>
                        {sampleProducts.map((product) => (
                          <MenuItem key={product.value} value={product.value}>
                            {product.label}
                          </MenuItem>
                        ))}
                      </Field>
                      <IconButton
                        onClick={() => arrayHelpers.remove(index)}
                        disabled={values.modifierProducts.length === 1}
                        sx={{ ml: 2 }}
                        color="error"
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                    </Box>
                  ))}
                  <IconButton
                    onClick={() => arrayHelpers.push('')}
                    // color="secondary"
                    aria-label="Add another product"
                  >
                    <AddCircleOutline />
                    <Typography ml={1}>Add Another Product</Typography>

                  </IconButton>
                  {errors.modifierProducts && typeof errors.modifierProducts === 'string' && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {errors.modifierProducts}
                    </Typography>
                  )}
                </Box>
              )}
            />
    
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button color="primary" onClick={onBack} variant="contained">
                Back
              </Button>
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
                Finish
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    );
  };
  
export default Add_Prod_Modifier;
  