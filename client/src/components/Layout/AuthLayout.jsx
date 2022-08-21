import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

import "../../pages/styles.scss";

function AuthLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      setTimeout(() => {
        navigate("/chat");
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/chat" &&
      !localStorage.getItem("chat-app-user")
    ) {
      setTimeout(() => {
        navigate("/register");
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <MoonLoader />
      </div>
    );
  }
  return <div>{children}</div>;
}

export default AuthLayout;
