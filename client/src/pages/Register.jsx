import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerValidationSchema } from "../libs/validationSchema";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import api from "../utils/api";

import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const Register = () => {
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [hiddenAvatar, setHiddenAvatar] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [hiddenAvatarButton, setHiddenAvatarButton] = useState(true);
  const [error, setError] = useState("");

  let navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const { data } = await api.post("/auth/register", values);
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/chat");
    } catch (error) {
      console.log("error :>> ", error);
      setError(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      avatar: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      values.avatar = imageUrl;
      handleSubmit(values);
    },
  });

  const validateImg = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      console.log("error");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setHiddenAvatar(true);
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "yld0fece");
    try {
      setUploadingImage(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/freee32fw/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadingImage(false);
      setHiddenAvatar(false);
      setHiddenAvatarButton(true);
      return res.data.url;
    } catch (error) {
      setUploadingImage(false);
      console.log("error", error);
    }
  };

  async function handleUploadAvatar(e) {
    e.preventDefault();
    if (!image) {
    }
    const url = await uploadImage();
    setImageUrl(url);
  }

  useEffect(() => {
    setError("");
  }, [formik.values]);

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="icon-button-file" className="upload-avarar-form">
          <input
            className="reg-upload-avatar"
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={validateImg}
          />

          <div className="reg-avatar">
            <Avatar
              alt="Remy Sharp"
              src={imagePreview || ""}
              sx={{ width: 200, height: 200 }}
            />
          </div>
          <div className="settings-profile-resume-avatar-face">
            <PhotoCameraOutlinedIcon htmlColor="#f6f6f6" />
          </div>
        </label>

        <TextField
          fullWidth
          variant="standard"
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={
            (formik.touched.username && Boolean(formik.errors.username)) ||
            Boolean(error)
          }
          helperText={formik.touched.username && formik.errors.username}
        />

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

        {imageUrl ? (
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={handleUploadAvatar}
            disabled={image === null}
            endIcon={<SendIcon />}
          >
            {uploadingImage ? "Uploading..." : "Upload"}
          </Button>
        )}
      </form>
      <span>
        already have an account?
        <Link to="/login" className="link-style">
          Login
        </Link>
      </span>
    </div>
  );
};

export default Register;
