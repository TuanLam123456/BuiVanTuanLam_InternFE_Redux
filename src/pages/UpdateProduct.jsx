import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProductByIdApiAsync,
  updateProductApiAsync,
} from "../redux/reducers/productReducer.jsx";

import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { productDetail } = useSelector((state) => state.ProductReducer);

  const formik = useFormik({
    initialValues: {
      name: "",

      price: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),

      price: Yup.number()
        .required("Price is required")
        .positive("Price must be greater than 0"),
    }),

    onSubmit: async (values) => {
      try {
        await dispatch(updateProductApiAsync(id, values));

        toast.success("Update product successfully!");

        navigate("/");
      } catch (error) {
        toast.error("Update product failed!");
      }
    },
  });

  useEffect(() => {
    dispatch(getProductByIdApiAsync(id));
  }, [id]);

  useEffect(() => {
    if (productDetail) {
      formik.setValues({
        name: productDetail.name,

        price: productDetail.price,
      });
    }
  }, [productDetail]);

  return (
    <div className="container mt-4">
      <h2>Update Product</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>Product Name</label>

          <input
            className="form-control"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>

          <input
            type="number"
            className="form-control"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>

        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
