// import React, { useContext, useEffect } from "react";
// import "./Login.css";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { StoreContext } from "../../context/StoreContext";
// import {useNavigate } from "react-router-dom";

// const Login = ({ url }) => {
//   const navigate=useNavigate();
//   const {admin,setAdmin,token, setToken } = useContext(StoreContext);
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };
//   const onLogin = async (event) => {
//     event.preventDefault();
//     const response = await axios.post(url + "/api/user/login", data);
//     if (response.data.success) {
//       if (response.data.role === "admin") {
//         setToken(response.data.token);
//         setAdmin(true);
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("admin", true);
//         toast.success("Login Successfully");
//         navigate("/add")
//       }else{
//         toast.error("You are not an admin");
//       }
//     } else {
//       toast.error(response.data.message);
//     }
//   };
//   useEffect(()=>{
//     if(admin && token){
//        navigate("/add");
//     }
//   },[])
//   return (
//     <div className="login-popup">
//       <form onSubmit={onLogin} className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>Login</h2>
//         </div>
//         <div className="login-popup-inputs">
//           <input
//             name="email"
//             onChange={onChangeHandler}
//             value={data.email}
//             type="email"
//             placeholder="Your email"
//             required
//           />
//           <input
//             name="password"
//             onChange={onChangeHandler}
//             value={data.password}
//             type="password"
//             placeholder="Your password"
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(StoreContext);

  const url = import.meta.env.VITE_BACKEND_URL;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const onLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `${url}/api/user/login`,
  //       data
  //     );

  //     if (response.data.success) {
  //       if (response.data.role === "admin") {
  //         setToken(response.data.token);
  //         setAdmin(true);
  //         localStorage.setItem("token", response.data.token);
  //         localStorage.setItem("admin", "true");
  //         toast.success("Login Successfully");
  //         navigate("/add");
  //       } else {
  //         toast.error("You are not an admin");
  //       }
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (err) {
  //     toast.error("Server not reachable");
  //   }
  // };


  const onLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `${url}/api/user/login`,
      data
    );

    if (response.data.success) {
      if (response.data.role === "admin") {
        setToken(response.data.token);
        setAdmin(true);

        // 🔥 STORE ADMIN DETAILS
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", "true");
        localStorage.setItem("adminEmail", data.email);

        toast.success("Login Successfully");
        navigate("/add");
      } else {
        toast.error("You are not an admin");
      }
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    toast.error("Server not reachable");
  }
};

  useEffect(() => {
    if (admin && token) {
      navigate("/add");
    }
  }, [admin, token, navigate]);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>

        <div className="login-popup-inputs">
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Your password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

