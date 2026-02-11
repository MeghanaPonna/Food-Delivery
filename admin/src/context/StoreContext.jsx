// // import axios from "axios";
// // import { createContext, useEffect, useState } from "react";

// // export const StoreContext = createContext(null);

// // const StoreContextProvider = (props) => {
// //   const [token, setToken] = useState("");
// //   const [admin, setAdmin] = useState(false);


// //   useEffect(() => {
// //     async function loadData() {
// //       if (localStorage.getItem("token")) {
// //         setToken(localStorage.getItem("token"));
// //       }
// //       if (localStorage.getItem("admin")) {
// //         setAdmin(localStorage.getItem("admin"));
// //       }
// //     }
// //     loadData();
// //   }, []);

// //   const contextValue = {
// //     token,
// //     setToken,
// //     admin,
// //     setAdmin,
// //   };
// //   return (
// //     <StoreContext.Provider value={contextValue}>
// //       {props.children}
// //     </StoreContext.Provider>
// //   );
// // };
// // export default StoreContextProvider;

// import { createContext, useEffect, useState } from "react";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [token, setToken] = useState("");
//   const [admin, setAdmin] = useState(false);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedAdmin = localStorage.getItem("admin");

//     if (storedToken) {
//       setToken(storedToken);
//     }

//     if (storedAdmin === "true") {
//       setAdmin(true);
//     }
//   }, []);

//   const contextValue = {
//     token,
//     setToken,
//     admin,
//     setAdmin,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);

  const url = "http://localhost:4000";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      fetchAdminStatus(storedToken);
    }
  }, []);

  const fetchAdminStatus = async (jwtToken) => {
    try {
      const res = await axios.get(`${url}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (res.data.success && res.data.user.role === "admin") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch (error) {
      console.error("Admin check failed");
      setAdmin(false);
    }
  };

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;


