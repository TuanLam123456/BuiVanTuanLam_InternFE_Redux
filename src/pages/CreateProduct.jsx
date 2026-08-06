import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProductApiAsync } from "../redux/reducers/productReducer.jsx";

const CreateProduct = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productValidation = Yup.object({
    name: Yup.string()
      .required("Product name is required")
      .min(3, "Name must be at least 3 characters"),

    price: Yup.number()
      .required("Price is required")
      .positive("Price must be greater than 0"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },

    validationSchema: productValidation,

    onSubmit: async (values) => {
      try {
        await dispatch(createProductApiAsync(values));

        toast.success("Create product successfully!");

        navigate("/");
      } catch (error) {
        toast.error("Create product failed!");
      }
    },
  });

  return (
    <div className="container mt-4">
      <h2>Create Product</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>

          <input
            className="form-control"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          {formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>

          <input
            type="number"
            className="form-control"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />

          {formik.errors.price && (
            <div className="text-danger">{formik.errors.price}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
