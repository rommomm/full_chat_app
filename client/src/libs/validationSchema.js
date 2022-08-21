import * as yup from "yup";

export const registerValidationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .max(15, "Username long"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password short")
    .required("Password is required"),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password short")
    .required("Password is required"),
});
