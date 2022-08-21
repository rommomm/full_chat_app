import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginValidationSchema } from "../libs/validationSchema";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/apiRouts";
import api from "../utils/api";
import { useLoginUserMutation } from "../services/appApi";

import "./styles.scss";

const Login = () => {
  const [error, setError] = useState();
  const [loginUser] = useLoginUserMutation();
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      loginUser(values);
      const { data } = await api.post("/auth/login", values);
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/chat");
    } catch (error) {
      console.log("error", error);
      setError(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    setError("");
  }, [formik.values]);

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            (formik.touched.email && Boolean(formik.errors.email)) ||
            Boolean(error)
          }
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          variant="standard"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            (formik.touched.password && Boolean(formik.errors.password)) ||
            Boolean(error)
          }
          helperText={
            (formik.touched.password && formik.errors.password) || error
          }
        />

        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <span>
        already have an account?
        <Link to="/register" className="link-style">
          Register
        </Link>
      </span>
    </div>
  );
};

export default Login;
