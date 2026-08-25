"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  MenuItem,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createStudent, getStudents } from "@/src/services/studentService";
import { StudentInput } from "@/src/types/student";

const steps = ["Personal Information", "Course Information", "Confirmation"];

const step1Schema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
});

const step2Schema = Yup.object({
  course: Yup.string().required("Course is required"),
  batch: Yup.string().required("Batch is required"),
  startDate: Yup.string().required("Start Date is required"),
  trainer: Yup.string().required("Trainer is required"),
  experience: Yup.string().required("Experience is required"),
});

const initialValues: StudentInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  course: "",
  batch: "",
  startDate: "",
  trainer: "",
  experience: "",
  status: "Active",
  score: 0,
  pendingAssignments: 0,
};

export default function StudentForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: activeStep === 0 ? step1Schema : activeStep === 1 ? step2Schema : undefined,
    onSubmit: async (values: StudentInput) => {
      setIsSubmitting(true);
      try {
        const existing = await getStudents();
        const emailExists = existing.some(
          (s) => s.email.toLowerCase() === values.email.toLowerCase()
        );

        if (emailExists) {
          toast.error("Email already exists");
          setIsSubmitting(false);
          return;
        }

        await createStudent(values);
        toast.success("Student added successfully!");
        router.push("/students");
      } catch {
        toast.error("Failed to add student");
        setIsSubmitting(false);
      }
    },
  });

  const handleNext = async () => {
    if (activeStep === 0) {
      const errors = await formik.validateForm();
      const fields = ["firstName", "lastName", "email", "phone", "dateOfBirth"];
      const hasError = fields.some((field) => !!(errors as never)[field]);

      if (hasError) {
        fields.forEach((field) => formik.setFieldTouched(field, true));
        return;
      }
      setActiveStep(1);
      return;
    }

    if (activeStep === 1) {
      const errors = await formik.validateForm();
      const fields = ["course", "batch", "startDate", "trainer", "experience"];
      const hasError = fields.some((field) => !!(errors as never)[field]);

      if (hasError) {
        fields.forEach((field) => formik.setFieldTouched(field, true));
        return;
      }
      setActiveStep(2);
      return;
    }

    // Last step → Submit
    formik.handleSubmit();
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ fontWeight: 600, mb: 4, letterSpacing: -0.4 }}
      >
        Add Student
      </Typography>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #eaeaea",
          borderRadius: 2,
          p: 4,
          maxWidth: 800,
        }}
      >
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={formik.handleSubmit}>
          {/* STEP 1 */}
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                  helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                />
              </Grid>
            </Grid>
          )}

          {/* STEP 2 */}
          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Course"
                  name="course"
                  value={formik.values.course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.course && Boolean(formik.errors.course)}
                  helperText={formik.touched.course && formik.errors.course}
                >
                  <MenuItem value="React">React</MenuItem>
                  <MenuItem value="Node.js">Node.js</MenuItem>
                  <MenuItem value="Full Stack">Full Stack</MenuItem>
                  <MenuItem value="Python">Python</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Batch"
                  name="batch"
                  value={formik.values.batch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.batch && Boolean(formik.errors.batch)}
                  helperText={formik.touched.batch && formik.errors.batch}
                >
                  <MenuItem value="Batch 1">Batch 1</MenuItem>
                  <MenuItem value="Batch 2">Batch 2</MenuItem>
                  <MenuItem value="Batch 3">Batch 3</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Start Date"
                  name="startDate"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                  helperText={formik.touched.startDate && formik.errors.startDate}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Trainer"
                  name="trainer"
                  value={formik.values.trainer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.trainer && Boolean(formik.errors.trainer)}
                  helperText={formik.touched.trainer && formik.errors.trainer}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.experience && Boolean(formik.errors.experience)}
                  helperText={formik.touched.experience && formik.errors.experience}
                  placeholder="e.g. 2 years / Fresher"
                />
              </Grid>
            </Grid>
          )}

          {/* STEP 3 */}
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" component="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Please confirm the details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Name</Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    {formik.values.firstName} {formik.values.lastName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Email</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{formik.values.email}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Phone</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{formik.values.phone}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Date of Birth</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{formik.values.dateOfBirth}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Course</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{formik.values.course}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Batch</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{formik.values.batch}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Start Date</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{formik.values.startDate}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Trainer</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{formik.values.trainer}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography color="text.secondary">Experience</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{formik.values.experience}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
            <Button
              disabled={activeStep === 0 || isSubmitting}
              onClick={handleBack}
              sx={{ color: "#111", borderColor: "#ddd" }}
              variant="outlined"
            >
              Back
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#111111",
                px: 4,
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              {isSubmitting
                ? "Saving..."
                : activeStep === steps.length - 1
                ? "Submit"
                : "Next"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}