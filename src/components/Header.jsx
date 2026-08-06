import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutAction } from "../redux/reducers/userReducer.jsx";

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.userReducer);

  const handleLogout = () => {
    dispatch(logoutAction());

    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Product Management
        </Link>

        <div>
          {username ? (
            <>
              <span className="text-white me-3">Hello, {username}</span>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
