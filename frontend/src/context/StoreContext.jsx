// // // import axios from "axios";
// // // import { createContext, useEffect, useState } from "react";
// // // import { toast } from "react-toastify";

// // // export const StoreContext = createContext(null);

// // // const StoreContextProvider = (props) => {
// // //   const [cartItems, setCartItems] = useState({});
// // //   const url = "http://localhost:4000";
// // //   const [token, setToken] = useState("");
// // //   const [food_list, setFoodList] = useState([]);

// // //   const addToCart = async (itemId) => {
// // //     if (!cartItems[itemId]) {
// // //       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
// // //     } else {
// // //       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
// // //     }
// // //     if (token) {
// // //       const response=await axios.post(
// // //         url + "/api/cart/add",
// // //         { itemId },
// // //         { headers: { token } }
// // //       );
// // //       if(response.data.success){
// // //         toast.success("item Added to Cart")
// // //       }else{
// // //         toast.error("Something went wrong")
// // //       }
// // //     }
// // //   };

// // //   const removeFromCart = async (itemId) => {
// // //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
// // //     if (token) {
// // //       const response= await axios.post(
// // //         url + "/api/cart/remove",
// // //         { itemId },
// // //         { headers: { token } }
// // //       );
// // //       if(response.data.success){
// // //         toast.success("item Removed from Cart")
// // //       }else{
// // //         toast.error("Something went wrong")
// // //       }
// // //     }
// // //   };

// // //   const getTotalCartAmount = () => {
// // //     let totalAmount = 0;
// // //     for (const item in cartItems) {
// // //       if (cartItems[item] > 0) {
// // //         let itemInfo = food_list.find((product) => product._id === item);
// // //         totalAmount += itemInfo.price * cartItems[item];
// // //       }
// // //     }
// // //     return totalAmount;
// // //   };

// // //   const fetchFoodList = async () => {
// // //     const response = await axios.get(url + "/api/food/list");
// // //     if (response.data.success) {
// // //       setFoodList(response.data.data);
// // //     } else {
// // //       alert("Error! Products are not fetching..");
// // //     }
// // //   };

// // //   const loadCardData = async (token) => {
// // //     const response = await axios.post(
// // //       url + "/api/cart/get",
// // //       {},
// // //       { headers: { token } }
// // //     );
// // //     setCartItems(response.data.cartData);
// // //   };

// // //   useEffect(() => {
// // //     async function loadData() {
// // //       await fetchFoodList();
// // //       if (localStorage.getItem("token")) {
// // //         setToken(localStorage.getItem("token"));
// // //         await loadCardData(localStorage.getItem("token"));
// // //       }
// // //     }
// // //     loadData();
// // //   }, []);

// // //   const contextValue = {
// // //     food_list,
// // //     cartItems,
// // //     setCartItems,
// // //     addToCart,
// // //     removeFromCart,
// // //     getTotalCartAmount,
// // //     url,
// // //     token,
// // //     setToken,
// // //   };
// // //   return (
// // //     <StoreContext.Provider value={contextValue}>
// // //       {props.children}
// // //     </StoreContext.Provider>
// // //   );
// // // };
// // // export default StoreContextProvider;

// // import axios from "axios";
// // import { createContext, useEffect, useState } from "react";
// // import { toast } from "react-toastify";

// // export const StoreContext = createContext(null);

// // const StoreContextProvider = (props) => {
// //   const url = "http://localhost:4000";

// //   const [food_list, setFoodList] = useState([]);
// //   const [cartItems, setCartItems] = useState({});
// //   const [token, setToken] = useState("");

// //   /* ---------------- ADD TO CART ---------------- */
// //   const addToCart = async (itemId) => {
// //     setCartItems((prev) => ({
// //       ...prev,
// //       [itemId]: (prev[itemId] || 0) + 1,
// //     }));

// //     if (token) {
// //       try {
// //         const res = await axios.post(
// //           `${url}/api/cart/add`,
// //           { itemId },
// //           { headers: { token } }
// //         );

// //         if (!res.data.success) {
// //           toast.error("Failed to add item");
// //         }
// //       } catch (err) {
// //         toast.error("Server error");
// //       }
// //     }
// //   };

// //   /* ---------------- REMOVE FROM CART ---------------- */
// //   const removeFromCart = async (itemId) => {
// //     setCartItems((prev) => {
// //       if (!prev[itemId]) return prev;

// //       const updated = { ...prev };
// //       updated[itemId] -= 1;

// //       if (updated[itemId] <= 0) {
// //         delete updated[itemId];
// //       }
// //       return updated;
// //     });

// //     if (token) {
// //       try {
// //         await axios.post(
// //           `${url}/api/cart/remove`,
// //           { itemId },
// //           { headers: { token } }
// //         );
// //       } catch (err) {
// //         toast.error("Server error");
// //       }
// //     }
// //   };

// //   /* ---------------- TOTAL AMOUNT ---------------- */
// //   const getTotalCartAmount = () => {
// //     let total = 0;

// //     for (const itemId in cartItems) {
// //       const itemInfo = food_list.find(
// //         (product) => product._id === itemId
// //       );

// //       if (itemInfo) {
// //         total += itemInfo.price * cartItems[itemId];
// //       }
// //     }
// //     return total;
// //   };

// //   /* ---------------- FETCH FOOD ---------------- */
// //   const fetchFoodList = async () => {
// //     try {
// //       const res = await axios.get(`${url}/api/food/list`);
// //       if (res.data.success) {
// //         setFoodList(res.data.data);
// //       }
// //     } catch (err) {
// //       toast.error("Failed to load products");
// //     }
// //   };

// //   /* ---------------- LOAD CART ---------------- */
// //   const loadCartData = async (token) => {
// //     try {
// //       const res = await axios.post(
// //         `${url}/api/cart/get`,
// //         {},
// //         { headers: { token } }
// //       );

// //       if (res.data.success) {
// //         setCartItems(res.data.cartData || {});
// //       }
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   /* ---------------- INIT ---------------- */
// //   useEffect(() => {
// //     fetchFoodList();

// //     const storedToken = localStorage.getItem("token");
// //     if (storedToken) {
// //       setToken(storedToken);
// //       loadCartData(storedToken);
// //     }
// //   }, []);

// //   const contextValue = {
// //     food_list,
// //     cartItems,
// //     addToCart,
// //     removeFromCart,
// //     getTotalCartAmount,
// //     url,
// //     token,
// //     setToken,
// //   };

// //   return (
// //     <StoreContext.Provider value={contextValue}>
// //       {props.children}
// //     </StoreContext.Provider>
// //   );
// // };

// // export default StoreContextProvider;
// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {
//   const url = "http://localhost:4000";

//   const [food_list, setFoodList] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState("");

//   /* =========================
//      ADD TO CART
//   ========================= */
//   // const addToCart = async (itemId) => {
//   //   setCartItems((prev) => ({
//   //     ...prev,
//   //     [itemId]: (prev[itemId] || 0) + 1,
//   //   }));

//   //   if (!token) return;

//   //   try {
//   //     const res = await axios.post(
//   //       `${url}/api/cart/add`,
//   //       { itemId },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     if (!res.data.success) {
//   //       toast.error("Failed to add item to cart");
//   //     }
//   //   } catch (error) {
//   //     toast.error("Server error while adding item");
//   //     console.error(error);
//   //   }
//   // };

//   const addToCart = async (itemId) => {
//   setCartItems((prev) => ({
//     ...prev,
//     [itemId]: (prev[itemId] || 0) + 1,
//   }));

//   if (!token) {
//     toast.info("Please login to add items to cart");
//     return;
//   }

//   try {
//     const res = await axios.post(
//       `${url}/api/cart/add`,
//       { itemId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (res.data.success) {
//       toast.success("Item added to cart 🛒");
//     } else {
//       toast.error("Failed to add item to cart");
//     }
//   } catch (error) {
//     toast.error("Server error while adding item");
//     console.error(error);
//   }
// };

//   /* =========================
//      REMOVE FROM CART
//   ========================= */
//   // const removeFromCart = async (itemId) => {
//   //   setCartItems((prev) => {
//   //     const updated = { ...prev };
//   //     if (!updated[itemId]) return updated;

//   //     updated[itemId] -= 1;
//   //     if (updated[itemId] <= 0) delete updated[itemId];
//   //     return updated;
//   //   });

//   //   if (!token) return;

//   //   try {
//   //     await axios.post(
//   //       `${url}/api/cart/remove`,
//   //       { itemId },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );
//   //   } catch (error) {
//   //     toast.error("Server error while removing item");
//   //     console.error(error);
//   //   }
//   // };

//   const removeFromCart = async (itemId) => {
//   setCartItems((prev) => {
//     const updated = { ...prev };
//     if (!updated[itemId]) return updated;

//     updated[itemId] -= 1;
//     if (updated[itemId] <= 0) delete updated[itemId];
//     return updated;
//   });

//   if (!token) {
//     toast.info("Please login to modify cart");
//     return;
//   }

//   try {
//     const res = await axios.post(
//       `${url}/api/cart/remove`,
//       { itemId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (res.data.success) {
//       toast.success("Item removed from cart 🗑️");
//     } else {
//       toast.error("Failed to remove item");
//     }
//   } catch (error) {
//     toast.error("Server error while removing item");
//     console.error(error);
//   }
// };

//   /* =========================
//      TOTAL CART AMOUNT
//   ========================= */
//   const getTotalCartAmount = () => {
//     let total = 0;

//     for (const itemId in cartItems) {
//       const itemInfo = food_list.find(
//         (product) => product._id === itemId
//       );

//       if (itemInfo) {
//         total += itemInfo.price * cartItems[itemId];
//       }
//     }

//     return total;
//   };

//   /* =========================
//      FETCH FOOD LIST
//   ========================= */
//   const fetchFoodList = async () => {
//     try {
//       const res = await axios.get(`${url}/api/food/list`);
//       if (res.data.success) {
//         setFoodList(res.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to load food list");
//       console.error(error);
//     }
//   };

//   /* =========================
//      LOAD CART DATA
//   ========================= */
//   const loadCartData = async (jwtToken) => {
//     try {
//       const res = await axios.post(
//         `${url}/api/cart/get`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         setCartItems(res.data.cartData || {});
//       }
//     } catch (error) {
//       console.error("Failed to load cart data", error);
//     }
//   };

//   /* =========================
//      INIT APP DATA
//   ========================= */
//   useEffect(() => {
//     fetchFoodList();

//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//       loadCartData(storedToken);
//     }
//   }, []);

//   /* =========================
//      CONTEXT VALUE
//   ========================= */
//   const contextValue = {
//     food_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;


import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:4000";

  /* =========================
     STATE
  ========================= */
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  /* =========================
     PERSIST CART (IMPORTANT)
  ========================= */
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /* =========================
     ADD TO CART
  ========================= */
  // const addToCart = async (itemId) => {
  //   setCartItems((prev) => ({
  //     ...prev,
  //     [itemId]: (prev[itemId] || 0) + 1,
  //   }));

  //   if (!token) return;

  //   try {
  //     const res = await axios.post(
  //       `${url}/api/cart/add`,
  //       { itemId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!res.data.success) {
  //       toast.error("Failed to add item to cart");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Server error while adding item");
  //   }
  // };

  const addToCart = async (itemId) => {
  setCartItems((prev) => ({
    ...prev,
    [itemId]: (prev[itemId] || 0) + 1,
  }));

  // ✅ ALWAYS show success toast
  toast.success("Item added to cart 🛒");

  if (!token) return;

  try {
    const res = await axios.post(
      `${url}/api/cart/add`,
      { itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.data.success) {
      toast.error("Backend sync failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error while syncing cart");
  }
};
  /* =========================
     REMOVE FROM CART
  ========================= */
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) return updated;

      updated[itemId] -= 1;
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });

    if (!token) return;

    try {
      const res = await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.success) {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while removing item");
    }
  };

  /* =========================
     TOTAL CART AMOUNT
  ========================= */
  const getTotalCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const itemInfo = food_list.find(
        (product) => product._id === itemId
      );
      if (itemInfo) {
        total += itemInfo.price * cartItems[itemId];
      }
    }

    return total;
  };

  /* =========================
     FETCH FOOD LIST
  ========================= */
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setFoodList(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load food list");
    }
  };

  /* =========================
     LOAD CART FROM BACKEND
     (OVERRIDES LOCAL CART)
  ========================= */
  // const loadCartData = async (jwtToken) => {
  //   try {
  //     const res = await axios.post(
  //       `${url}/api/cart/get`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       }
  //     );

  //     if (res.data.success) {
  //       setCartItems(res.data.cartData || {});
  //     }
  //   } catch (error) {
  //     console.error("Failed to load cart data", error);
  //   }
  // };


  const loadCartData = async (jwtToken) => {
  try {
    const res = await axios.post(
      `${url}/api/cart/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    // ✅ ONLY override local cart if backend cart has items
    if (
      res.data.success &&
      res.data.cartData &&
      Object.keys(res.data.cartData).length > 0
    ) {
      setCartItems(res.data.cartData);
    }
  } catch (error) {
    console.error("Failed to load cart data", error);
  }
};
  /* =========================
     INIT APP
  ========================= */
  useEffect(() => {
    fetchFoodList();

    if (token) {
      loadCartData(token);
    }
  }, [token]);

  /* =========================
     CONTEXT VALUE
  ========================= */
  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

