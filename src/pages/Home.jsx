import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsApiAsync,
  searchProductApiAsync,
  getProductByIdApiAsync,
  deleteProductApiAsync,
} from "../redux/reducers/productReducer.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  // Lấy state từ redux
  const { products, productDetail } = useSelector(
    (state) => state.ProductReducer,
  );

  // Gọi API khi load trang
  useEffect(() => {
    dispatch(getProductsApiAsync());
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      dispatch(getProductsApiAsync());
    } else {
      dispatch(searchProductApiAsync(value));
    }
  };

  const handleView = (id) => {
    dispatch(getProductByIdApiAsync(id));

    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure delete this product?");

    if (confirmDelete) {
      try {
        await dispatch(deleteProductApiAsync(id));

        toast.success("Delete product successfully!");
      } catch (error) {
        toast.error("Delete product failed!");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product List</h2>

        <Link to="/create" className="btn btn-success">
          Add Product
        </Link>
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search product name..."
          onChange={handleSearch}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => handleView(item.id)}
                >
                  View
                </button>
                <Link
                  to={`/update/${item.id}`}
                  className="btn btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductDetail
        show={showDetail}
        product={productDetail}
        handleClose={handleCloseDetail}
      />
    </div>
  );
};

export default Home;
