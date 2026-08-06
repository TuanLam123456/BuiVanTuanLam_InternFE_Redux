import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { loginApiAsync } from "../redux/reducers/userReducer.jsx";

import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Email required"),

      password: Yup.string().required("Password required"),
    }),

    onSubmit: async (values) => {
      try {
        const result = await dispatch(loginApiAsync(values));

        if (result) {
          toast.success("Login successfully!");

          navigate("/");
        } else {
          toast.error("Wrong email or password");
        }
      } catch (error) {
        toast.error("Login failed");
      }
    },
  });

  return (
    <div className="container mt-4">
      <h2>Login</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>Email</label>

          <input
            className="form-control"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>

          <input
            type="password"
            className="form-control"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
