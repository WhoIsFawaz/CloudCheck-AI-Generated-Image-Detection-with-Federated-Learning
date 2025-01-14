/**
=========================================================
* CloudCheck
=========================================================
* Template used - Material Dashboard 2 React - v2.1.0
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
=========================================================
*/


// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "page-components/LayoutContainers/PageLayout";

// Authentication pages components
import Footer from "layouts/authentication/components/Footer";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";

// Import background image
import logo from "assets/images/cloudcheck-logo-light.png";

function BasicLayout({ image, children }) {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <MDBox
        sx={{ height: "auto", minHeight: "100vh" }}
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <MDBox
          position="absolute"
          width="100%"
          minHeight="100vh"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              image &&
              `${linearGradient(
                rgba(gradients.light.main, 0.1),
                rgba(gradients.light.state, 0.1)
              )}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <MDBox
            position="relative"
            height="100%"
            display="flex"
            flexDirection="column"
            width="100%"
            justifyContent="center"
            paddingTop="4em"
          >
            <MDBox paddingBottom="3rem" sx={{ textAlign: "center" }}>
              {pathname === "/auth/login" && (
                <MDBox
                  display="flex"
                  width="100%"
                  justifyContent="center"
                  sx={{
                    zIndex: "99",
                    backgroundImage: `url(${logo})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100px",
                    margin: "20px 0 60px 0",
                  }}
                />
              )}
              <MDBox px={1} width="100%" mx="auto">
                <Grid container spacing={1} justifyContent="center" alignItems="center">
                  <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                    {children}
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </MDBox>
          <Footer light />
        </MDBox>
      </MDBox>
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
