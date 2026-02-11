// // import React, { useContext, useEffect, useState } from "react";
// // import "./MyOrders.css";
// // import { StoreContext } from "../../context/StoreContext";
// // import axios from "axios";
// // import { assets } from "../../assets/frontend_assets/assets";

// // const MyOrders = () => {
// //   const { url, token } = useContext(StoreContext);
// //   const [data, setData] = useState([]);

// //   // const fetchOrders = async () => {
// //   //   const response = await axios.post(
// //   //     url + "/api/order/userorders",
// //   //     {},
// //   //     { headers: { token } }
// //   //   );
// //   //   if (response.data.success) {
// //   //     setData(response.data.data);
// //   //   }
// //   // };


// //   const fetchOrders = async () => {
// //   try {
// //     const response = await axios.get(
// //       url + "/api/order/userorders",
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     if (response.data.success) {
// //       setData(response.data.data);
// //     }
// //   } catch (error) {
// //     console.error("Fetch orders error:", error);
// //   }
// // };

// //   useEffect(() => {
// //     if (token) {
// //       fetchOrders();
// //     }
// //   }, [token]);
// //   return (
// //     <div className="my-orders">
// //       <h2>Orders</h2>
// //       <div className="container">
// //         {data.map((order, index) => {
// //           return (
// //             <div key={index} className="my-orders-order">
// //               <img src={assets.parcel_icon} alt="" />
// //               <p>
// //                 {order.items.map((item, index) => {
// //                   if (index === order.items.length - 1) {
// //                     return item.name + " X " + item.quantity;
// //                   } else {
// //                     return item.name + " X " + item.quantity + ",";
// //                   }
// //                 })}
// //               </p>
// //               <p>${order.amount}.00</p>
// //               <p>items: {order.items.length}</p>
// //               <p>
// //                 <span>&#x25cf;</span>
// //                 <b> {order.status}</b>
// //               </p>
// //               <button onClick={fetchOrders}>Track Order</button>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyOrders;

// import React, { useContext, useEffect, useState } from "react";
// import "./MyOrders.css";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { assets } from "../../assets/frontend_assets/assets";
// import { formatCurrency } from "../../utils/FormatCurrency";

// const MyOrders = () => {
//   const { url, token } = useContext(StoreContext);
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(
//         `${url}/api/order/userorders`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setOrders(response.data.data);
//       }
//     } catch (error) {
//       console.error("Fetch Orders Error:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchOrders();
//     }
//   }, [token]);

//   return (
//     <div className="my-orders">
//       <h2>My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="empty">No orders placed yet.</p>
//       ) : (
//         <div className="orders-container">
//           {orders.map((order) => (
//             <div className="order-card" key={order._id}>
//               <div className="order-left">
//                 <img src={assets.parcel_icon} alt="order" />

//                 <div className="order-info">
//                   <p className="order-items">
//                     {order.items.map((item, index) => (
//                       <span key={index}>
//                         {item.name} × {item.quantity}
//                       </span>
//                     ))}
//                   </p>

//                   <p className="order-status">
//                     <span className="dot"></span>
//                     {order.status}
//                   </p>
//                 </div>
//               </div>

//               {/* <div className="order-right">
//                 {/* <p className="order-price">₹{order.amount}</p> */}
//                 <p className="order-price">{formatCurrency(order.amount)}</p>
//                 <button onClick={fetchOrders}>Track Order</button>
//               </div> */}

//               <div className="order-right">
//   <p>Items: {formatCurrency(order.subtotal)}</p>
//   <p>Delivery: {formatCurrency(order.deliveryFee)}</p>
//   <p className="order-price">
//     Total: {formatCurrency(order.amount)}
//   </p>
//   <button>Track Order</button>
// </div>



//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;

import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import { formatCurrency } from "../../utils/FormatCurrency";

const DELIVERY_FEE = 2;

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/userorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty">No orders placed yet.</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => {
            const itemsTotal = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div className="order-card" key={order._id}>
                <div className="order-left">
                  <img src={assets.parcel_icon} alt="order" />

                  <div className="order-info">
                    <p className="order-items">
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </p>

                    <p className="order-status">
                      <span className="dot"></span>
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="order-right">
                  <p>Items: {formatCurrency(itemsTotal)}</p>
                  <p>Delivery: {formatCurrency(DELIVERY_FEE)}</p>
                  <p className="order-price">
                    Total: {formatCurrency(order.amount)}
                  </p>
                  <button>Track Order</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;


