import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import DashboardLayout from "page-components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "page-components/Navbars/DashboardNavbar";
import Footer from "page-components/Footer";
import ImageClassifierService from "services/image-checker-service";

function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isTrainingModel, setIsTrainingModel] = useState(false);

  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setClassificationResult(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setClassificationResult(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const classifyImage = async () => {
    if (selectedImage) {
      setIsClassifying(true);
      try {
        const result = await ImageClassifierService.classify_image(selectedImage, 0);
        setClassificationResult(result === 0 ? "Fake" : "Real");
      } catch (error) {
        console.error("Error classifying image:", error);
        setClassificationResult("Error occurred during classification");
      }
      setIsClassifying(false);
    }
  };

  const handleDispute = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const disputeClassification = async () => {
    setOpenDialog(false);
    setIsTrainingModel(true);

    try {
      await ImageClassifierService.train_model(selectedImage, 0);
      await ImageClassifierService.upload_model();
      setClassificationResult(`${classificationResult} (Disputed)`);
    } catch (error) {
      console.error("Error disputing classification:", error);
      setClassificationResult("Error occurred during dispute");
    } finally {
      setIsTrainingModel(false);
    }
  };

  useEffect(() => {
    async function prepareModel() {
      try {
        await ImageClassifierService.prepare_ml();
      } catch (error) {
        console.error('Error loading models', error);
      } finally {
        setIsModelLoading(false);
      }
    }

    prepareModel();

    return () => {
      ImageClassifierService.dispose_models();
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDTypography variant="h3">Image Checker</MDTypography>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDTypography variant="h6" color="white">Image Checker</MDTypography>
              </MDBox>
              <MDBox p={3}>
                {isModelLoading ? (
                  <MDBox display="flex" flexDirection="column" alignItems="center" my={2}>
                    Loading Image Checker
                    <br />
                    <CircularProgress />
                  </MDBox>
                ) : (
                  <Grid container spacing={3}>
                    {/* Left Column: Image Upload Section */}
                    <Grid item xs={6}>
                      <MDBox display="flex" flexDirection="column" alignItems="flex-start">
                        {/* Upload Image Section */}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                          ref={inputRef}
                        />
                        {!selectedImage ? (
                          <MDBox
                            onClick={() => inputRef.current && inputRef.current.click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            style={{
                              border: "2px dashed #A9A9A9",
                              backgroundColor: "white",
                              padding: "30px",
                              textAlign: "center",
                              cursor: "pointer",
                              borderRadius: "8px",
                              width: "100%",
                            }}
                          >
                            <CloudUploadIcon style={{ fontSize: 50, color: "#A9A9A9", marginBottom: "10px" }} />
                            <MDTypography variant="h6" color="text">
                              Drag & Drop to Upload Image
                            </MDTypography>
                          </MDBox>
                        ) : (
                          <MDBox mt={2}>
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt="Selected Image"
                              style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }}
                            />
                          </MDBox>
                        )}
                        <MDBox mt={2}>
                          <MDButton variant="outlined" color="info" onClick={() => inputRef.current && inputRef.current.click()}>
                            Browse Image
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Grid>

                    {/* Divider with Custom Styling */}
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        borderColor: "#A9A9A9",
                        borderWidth: "1px",
                        height: "100%",
                        alignSelf: "center",
                      }}
                    />

                    {/* Right Column: Classification Result Section with Classify Button */}
                    <Grid item xs={5}>
                      <MDBox display="flex" flexDirection="column" alignItems="flex-start">
                        {!selectedImage ? (
                          <MDTypography variant="h6" color="textSecondary">
                            Please upload an image to check.
                          </MDTypography>
                        ) : (
                          <>
                            {/* Message when image is selected but not yet classified */}
                            {!classificationResult && (
                              <MDTypography variant="h6" color="textSecondary" mt={2}>
                                Image is ready for classification. Click the button below to check the authenticity of the image.
                              </MDTypography>
                            )}
                            {/* Classify Image Button */}
                            <MDBox mt={2}>
                              <MDButton
                                variant="gradient"
                                color="info"
                                onClick={classifyImage}
                                disabled={isClassifying || isTrainingModel}
                              >
                                {isClassifying ? "Checking..." : "Check Image"}
                              </MDButton>
                            </MDBox>
                          </>
                        )}

                        {/* Display classification result if available */}
                        {classificationResult && (
                          <MDBox mt={2}>
                            <MDTypography variant="h6">
                              Classification Result: {classificationResult}
                            </MDTypography>
                            {(classificationResult === "Real" || classificationResult === "Fake") && (
                              <MDButton
                                variant="gradient"
                                color="error"
                                onClick={handleDispute}
                                disabled={isTrainingModel}
                                style={{ marginTop: "10px" }}
                              >
                                {isTrainingModel ? "Disputing..." : "Dispute Classification"}
                              </MDButton>
                            )}
                          </MDBox>
                        )}
                      </MDBox>
                    </Grid>
                  </Grid>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Dispute Classification
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Our system has detected that the image is {classificationResult === "Real" ? "real" : "fake"}. Do you want to dispute this classification?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="info" onClick={handleCloseDialog}>Close</MDButton>
          <MDButton variant="gradient" color="error" onClick={disputeClassification} autoFocus>
            Dispute as {classificationResult === "Real" ? "fake" : "real"}
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default ImageClassifier;
