/**
=========================================================
* CloudCheck
=========================================================
* Template used - Material Dashboard 2 React - v2.1.0
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
=========================================================
*/

// Material Dashboard 2 React base styles
import colors from "assets/theme-dark/base/colors";
import typography from "assets/theme-dark/base/typography";

const { grey } = colors;
const { size } = typography;

const breadcrumbs = {
  styleOverrides: {
    li: {
      lineHeight: 0,
    },

    separator: {
      fontSize: size.sm,
      color: grey[600],
    },
  },
};

export default breadcrumbs;
