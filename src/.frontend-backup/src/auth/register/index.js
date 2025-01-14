import { useContext, useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";


import AuthService from "services/auth-service";
import { AuthContext } from "context";
import { InputLabel } from "@mui/material";

function Register() {
  const authContext = useContext(AuthContext);

  const [terms, setTerms] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    usernameError: "",
    nameError: "",
    emailError: "",
    passwordError: "",
    error: false,
    errorText: "",
  });

  const openTerms = () => {
    setTerms(true);
  }

  const closeTerms = () => {
    setTerms(false);
  }

  const changeHandler = (e) => {
    if (e.target.name === "agree") {
      setInputs({
        ...inputs,
        ["agree"]: e.target.checked,
      });
      return;
    } 
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const newErrors = {};
    newErrors.usernameError = inputs.username.trim().length === 0;
    newErrors.nameError = inputs.name.trim().length === 0;
    newErrors.emailError = inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat);
    newErrors.passwordError = inputs.password.trim().length < 8;
    newErrors.agreeError = inputs.agree === false;

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    // gRPC to create new user
    const newUser = { 
      Username: inputs.username, 
      Name: inputs.name,
      Password: inputs.password,
      Email: inputs.email,
    };

    try {
      await AuthService.register(newUser);

      const loginData = {
        Username: inputs.username,
        Password: inputs.password,
      }
      const loginResponse = await AuthService.login(loginData);
    
      if (loginResponse.validated) {
        authContext.login(loginResponse.token, loginResponse.userid);
      } 

      setInputs({
        username: "",
        name: "",
        email: "",
        password: "",
        agree: false,
      });

      setErrors({
        usernameError: "",
        nameError: "",
        emailError: "",
        passwordError: "",
        error: false,
        errorText: "",
      });
    } catch (err) {
      setErrors({ ...errors, error: true, errorText: err.message });
      console.error(err);
    }
  };

  return (
    <BasicLayoutLanding >
      <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
        <Card style={{maxHeight: "65vh", minWidth:"60vh" , overflowY: "auto"}}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={2}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Join us today
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your email and password to register
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Username"
                  variant="standard"
                  fullWidth
                  name="username"
                  value={inputs.username}
                  onChange={changeHandler}
                  error={errors.usernameError}
                />
                {errors.usernameError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The username cannot be empty
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  variant="standard"
                  fullWidth
                  name="name"
                  value={inputs.name}
                  onChange={changeHandler}
                  error={errors.nameError}
                  inputProps={{
                    autoComplete: "name",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                />
                {errors.firstnameError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The name cannot be empty
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={inputs.email}
                  name="email"
                  onChange={changeHandler}
                  error={errors.emailError}
                  inputProps={{
                    autoComplete: "email",
                    form: {
                      autoComplete: "off",
                    },
                  }}
                />
                {errors.emailError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The email must be valid
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  name="password"
                  value={inputs.password}
                  onChange={changeHandler}
                  error={errors.passwordError}
                />
                {errors.passwordError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The password must be of at least 8 characters
                  </MDTypography>
                )}
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox name="agree" id="agree" onChange={changeHandler} />
                <InputLabel
                  variant="standard"
                  fontWeight="regular"
                  color="text"
                  sx={{ lineHeight: "1.5"}}
                  htmlFor="agree"
                >
                  &nbsp;&nbsp;I agree to the&nbsp;
                </InputLabel>
                <MDTypography
                  onClick={openTerms}
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                  style={{ cursor: 'pointer' }}
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
              {errors.agreeError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  You must agree to the Terms and Conditions.
                </MDTypography>
              )}
              {errors.error && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  {errors.errorText}
                </MDTypography>
              )}
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Register and sign in
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/auth/login"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
            <Dialog
              open={terms}
              onClose={closeTerms}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Terms of Service and Data Use
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  By checking the box below, you agree to the following:
                  <br/>
                  <br/>
                  1. Data Collection: We use federated learning to collect anonymized, aggregated data insights from your usage to improve our services.
                  <br/>
                  <br/>
                  2. Privacy: Your personal data remains on your device and is not directly accessed by our servers.
                  <br/>
                  <br/>
                  3. Consent: Clicking "I Accept" indicates your consent to these terms.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <MDButton variant="gradient" color="info" onClick={closeTerms}>Close</MDButton>
              </DialogActions>
            </Dialog>
          </MDBox>
        </Card>
      </div>
    </BasicLayoutLanding>
  );
}

export default Register;
