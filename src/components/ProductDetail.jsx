import React from "react";

const ProductDetail = (props) => {
  const { show, handleClose, product } = props;

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Detail</h5>

            <button className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body">
            <p>ID: {product?.id}</p>

            <p>Name: {product?.name}</p>

            <p>Price: {product?.price}</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
