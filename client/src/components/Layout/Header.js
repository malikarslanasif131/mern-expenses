import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav
        className="navbar bg-primary navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid m-2 p-2">
          <Link className=" navbar-brand mx-5 " to="/">
            Expeness App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
              {!loginUser && (
                <div className="d-flex nav-item mx-3">
                  <li className="nav-item">
                    <Link className="nav-link mx-3 active" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link mx-3" to="/login">
                      Login
                    </Link>
                  </li>
                </div>
              )}
              {loginUser && (
                <div className="d-flex mx-3 nav-item">
                  <li className="nav-item">
                    <Link className="nav-link mx-3 active">
                      {loginUser.name}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={logoutHandler}
                      className="btn btn-primary mx-3"
                    >
                      Logout
                    </button>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
