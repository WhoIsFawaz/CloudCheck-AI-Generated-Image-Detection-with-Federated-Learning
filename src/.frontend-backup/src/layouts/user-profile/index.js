import { useState, useEffect, useContext } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "page-components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "page-components/Navbars/DashboardNavbar";
import Footer from "page-components/Footer";

// Overview page components
import Header from "layouts/user-profile/Header";

import { AuthContext } from "context";
import AuthService from "../../services/auth-service";

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const [notification, setNotification] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    newPassError: false,
    confirmPassError: false,
  });

  const getUserData = async (UserID) => {
    try {
      const response = await AuthService.getProfile({ UserID: UserID });

      if (response) {
        const name = response.firstName; // Assuming name is equivalent to firstName in the backend response
        const email = response.email;
        
        setUser((prevUser) => ({
          ...prevUser,
          name,
          email,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        console.error("User data not found.");
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData(authContext.userID);
  }, []);

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // validation
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (user.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      return;
    }

    if (user.email.trim().length === 0 || !user.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (user.confirmPassword || user.newPassword) {
      // in the api the confirmed password should be the same with the current password, not the new one
      if (user.confirmPassword.trim() !== user.newPassword.trim()) {
        setErrors({ ...errors, confirmPassError: true });
        return;
      }
      if (user.newPassword.trim().length < 8) {
        setErrors({ ...errors, newPassError: true });
        return;
      }
    }

    let userData = {
      data: {
        type: "profile",
        attributes: {
          userid: authContext.userID,
          name: user.name,
          email: user.email,
        },
      },
    };

    // Set new user data for call
    if (user.name.trim().length > 0) {
      userData.data.attributes.name = user.name;
    }
    if (user.email.trim().length > 0) {
      userData.data.attributes.email = user.email;
    }
    if (user.newPassword.length > 0) {
      userData.data.attributes.password = user.newPassword;
      userData.data.attributes.password_new = user.newPassword;
      userData.data.attributes.password_confirmation = user.confirmPassword;
    }

    // call api for update
    console.log(userData.data.attributes);
    const response = await AuthService.updateProfile(userData.data.attributes);
    console.log("RESPONSE: ", response);  

    // reset errors
    setErrors({
      nameError: false,
      emailError: false,
      newPassError: false,
      confirmPassError: false,
    });

    setNotification(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={user.name}>
        {notification && (
          <MDAlert color="info" mt="20px">
            <MDTypography variant="body2" color="white">
              Your profile has been updated
            </MDTypography>
          </MDAlert>
        )}
        <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >
          <MDBox display="flex" flexDirection="column" mt={5}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
            >
              <MDTypography variant="body2" color="text" fontWeight="regular">
                Name
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="name"
                  value={user.name}
                  onChange={changeHandler}
                  error={errors.nameError}
                />
                {errors.nameError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The name cannot be empty
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>

          <MDBox display="flex" flexDirection="column">
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
            >
              <MDTypography variant="body2" color="text" fontWeight="regular">
                Email
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="email"
                  fullWidth
                  name="email"
                  value={user.email}
                  onChange={changeHandler}
                  error={errors.emailError}
                />
                {errors.emailError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The email cannot be empty
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>

          <MDBox display="flex" flexDirection="column" mb={3}>
            <MDBox display="flex" flexDirection="row">
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                mr={2}
              >
                <MDTypography variant="body2" color="text" fontWeight="regular">
                  New Password
                </MDTypography>
                <MDBox width="100%">
                  <MDInput
                    type="password"
                    fullWidth
                    name="newPassword"
                    placeholder="New Password"
                    value={user.newPassword}
                    onChange={changeHandler}
                    error={errors.newPassError}
                    inputProps={{
                      autoComplete: "new-password",
                      form: {
                        autoComplete: "off",
                      },
                    }}
                  />
                  {errors.newPassError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The password must be of at least 8 characters
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
              >
                <MDTypography variant="body2" color="text" fontWeight="regular">
                  Password Confirmation
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="password"
                    fullWidth
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    onChange={changeHandler}
                    error={errors.confirmPassError}
                    inputProps={{
                      autoComplete: "confirmPassword",
                      form: {
                        autoComplete: "off",
                      },
                    }}
                  />
                  {errors.confirmPassError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The password confirmation must match the current password
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox mt={4} display="flex" justifyContent="end">
              <MDButton variant="gradient" color="info" type="submit">
                Save changes
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default UserProfile;
