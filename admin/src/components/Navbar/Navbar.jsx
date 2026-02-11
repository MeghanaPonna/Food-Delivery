// // import React, { useContext } from "react";
// // import "./Navbar.css";
// // import { assets } from "../../assets/assets";
// // import { StoreContext } from "../../context/StoreContext";
// // import { toast } from "react-toastify";
// // import {useNavigate } from "react-router-dom";

// // const Navbar = () => {
// //   const navigate=useNavigate();
// //   const {token, admin, setAdmin, setToken } = useContext(StoreContext);
// //   const logout=()=>{
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("admin");
// //     setToken("");
// //     setAdmin(false);
// //     toast.success("Logout Successfully")
// //     navigate("/");
// //   }
// //   return (
// //     <div className="navbar">
// //       <img className="logo" src={assets.logo} alt="" />
// //       {token && admin ? (
// //         <p className="login-conditon" onClick={logout}>Logout</p>
// //       ) : (
// //         <p className="login-conditon" onClick={()=>navigate("/")}>Login</p>
// //       )}
// //       <img className="profile" src={assets.profile_image} alt="" />
// //     </div>
// //   );
// // };

// // export default Navbar;
// // 

// import React, { useContext } from "react";
// import "./Navbar.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { token, admin, setAdmin, setToken } = useContext(StoreContext);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin");
//     setToken("");
//     setAdmin(false);
//     toast.success("Logout Successfully");
//     navigate("/");
//   };

//   return (
//     <div className="navbar">
//       {/* Left */}
//       <div className="navbar-left">
//         <img
//           className="logo"
//           src={assets.logo}
//           alt="Logo"
//           onClick={() => navigate("/")}
//         />
//         <span className="admin-text">Admin Panel</span>
//       </div>

//       {/* Right */}
//       <div className="navbar-right">
//         {token && admin ? (
//           <>
//             <span className="admin-label">Admin</span>
//             <button className="nav-btn logout" onClick={logout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <button
//             className="nav-btn login"
//             onClick={() => navigate("/")}
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, admin, setAdmin, setToken } = useContext(StoreContext);

  // 🔥 Get admin email from localStorage
  const adminEmail = localStorage.getItem("adminEmail");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("adminEmail"); // 🔥 clear email
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <img
          className="logo"
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate("/")}
        />
        <span className="admin-text">Admin Panel</span>
      </div>

      {/* Right */}
      <div className="navbar-right">
        {token && admin ? (
          <>
            <span className="admin-label">
              {adminEmail || "Admin"}
            </span>
            <button className="nav-btn logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button
            className="nav-btn login"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;


