// // import React, { useContext, useEffect, useState } from "react";
// // import "./PlaceOrder.css";
// // import { StoreContext } from "../../context/StoreContext";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useNavigate } from 'react-router-dom'



// // const PlaceOrder = () => {
// //   const navigate= useNavigate();
// //   console.log("Stripe key loaded:", !!process.env.STRIPE_SECRET_KEY);

// //   const { getTotalCartAmount, token, food_list, cartItems, url } =
// //     useContext(StoreContext);
// //   const [data, setData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     street: "",
// //     city: "",
// //     state: "",
// //     zipcode: "",
// //     country: "",
// //     phone: "",
// //   });

// //   const onChangeHandler = (event) => {
// //     const name = event.target.name;
// //     const value = event.target.value;
// //     setData((data) => ({ ...data, [name]: value }));
// //   };

// //   // const placeOrder = async (event) => {
// //   //   event.preventDefault();
// //   //   let orderItems = [];
// //   //   food_list.map((item) => {
// //   //     if (cartItems[item._id] > 0) {
// //   //       let itemInfo = item;
// //   //       itemInfo["quantity"] = cartItems[item._id];
// //   //       orderItems.push(itemInfo);
// //   //     }
// //   //   });
// //   //   let orderData = {
// //   //     address: data,
// //   //     items: orderItems,
// //   //     amount: getTotalCartAmount() + 2,
// //   //   };
    
// //   //   let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}});
// //   //   if(response.data.success){
// //   //     const {session_url}=response.data;
// //   //     window.location.replace(session_url);
// //   //   }else{
// //   //     toast.error("Errors!")
// //   //   }
// //   // };

// //   const placeOrder = async (event) => {
// //   event.preventDefault();

// //   let orderItems = [];
// //   food_list.forEach((item) => {
// //     if (cartItems[item._id] > 0) {
// //       orderItems.push({
// //         ...item,
// //         quantity: cartItems[item._id],
// //       });
// //     }
// //   });

// //   const orderData = {
// //     address: data,
// //     items: orderItems,
// //     amount: getTotalCartAmount() + 2,
// //   };

// //   try {
// //     const response = await axios.post(
// //       url + "/api/order/place",
// //       orderData,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     if (response.data.success) {
// //       const { session_url } = response.data;
// //       window.location.replace(session_url);
// //     } else {
// //       toast.error("Order failed");
// //     }
// //   } catch (error) {
// //     toast.error("Unauthorized or server error");
// //     console.error(error);
// //   }
// // };

// //   useEffect(()=>{
// //     if(!token){
// //       toast.error("Please Login first")
// //       navigate("/cart")
// //     }
// //     else if(getTotalCartAmount()===0){
// //       toast.error("Please Add Items to Cart");
// //       navigate("/cart")
// //     }
// //   },[token])
// //   return (
// //     <form className="place-order" onSubmit={placeOrder}>
// //       <div className="place-order-left">
// //         <p className="title">Delivery Information</p>
// //         <div className="multi-fields">
// //           <input
// //             required
// //             name="firstName"
// //             value={data.firstName}
// //             onChange={onChangeHandler}
// //             type="text"
// //             placeholder="First name"
// //           />
// //           <input
// //             required
// //             name="lastName"
// //             value={data.lastName}
// //             onChange={onChangeHandler}
// //             type="text"
// //             placeholder="Last name"
// //           />
// //         </div>
// //         <input
// //           required
// //           name="email"
// //           value={data.email}
// //           onChange={onChangeHandler}
// //           type="text"
// //           placeholder="Email Address"
// //         />
// //         <input
// //           required
// //           name="street"
// //           value={data.street}
// //           onChange={onChangeHandler}
// //           type="text"
// //           placeholder="Street"
// //         />
// //         <div className="multi-fields">
// //           <input
// //             required
// //             name="city"
// //             value={data.city}
// //             onChange={onChangeHandler}
// //             type="text"
// //             placeholder="City"
// //           />
// //           <input
// //             required
// //             name="state"
// //             value={data.state}
// //             onChange={onChangeHandler}
// //             type="text"
// //             placeholder="State"
// //           />
// //         </div>
// //         <div className="multi-fields">
// //           <input
// //             required
// //             name="zipcode"
// //             value={data.zipcode}
// //             onChange={onChangeHandler}
// //             type="text"
// //             placeholder="Zip Code"
// //           />
// //           <input
// //             required
// //             name="country"
// //             value={data.country}
// //             onChange={onChangeHandler}
// //             type="text"
// //             placeholder="Country"
// //           />
// //         </div>
// //         <input
// //           required
// //           name="phone"
// //           value={data.phone}
// //           onChange={onChangeHandler}
// //           type="text"
// //           placeholder="Phone"
// //         />
// //       </div>
// //       <div className="place-order-right">
// //         <div className="cart-total">
// //           <h2>Cart Totals</h2>
// //           <div>
// //             <div className="cart-total-details">
// //               <p>Subtotals</p>
// //               <p>${getTotalCartAmount()}</p>
// //             </div>
// //             <hr />
// //             <div className="cart-total-details">
// //               <p>Delivery Fee</p>
// //               <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
// //             </div>
// //             <hr />
// //             <div className="cart-total-details">
// //               <b>Total</b>
// //               <b>
// //                 ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
// //               </b>
// //             </div>
// //           </div>
// //           <button type="submit">PROCEED TO PAYMENT</button>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // };

// // export default PlaceOrder;
// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// // const PlaceOrder = () => {
// //   const navigate = useNavigate();

// //   const { getTotalCartAmount, token, food_list, cartItems, url } =
// //     useContext(StoreContext);

// //   const [data, setData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     street: "",
// //     city: "",
// //     state: "",
// //     zipcode: "",
// //     country: "",
// //     phone: "",
// //   });

// //   const onChangeHandler = (event) => {
// //     const { name, value } = event.target;
// //     setData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const placeOrder = async (event) => {
// //     event.preventDefault();

// //     let orderItems = [];
// //     food_list.forEach((item) => {
// //       if (cartItems[item._id] > 0) {
// //         orderItems.push({
// //           _id: item._id,
// //           quantity: cartItems[item._id],
// //         });
// //       }
// //     });

// //     try {
// //       const response = await axios.post(
// //         `${url}/api/order/place`,
// //         {
// //           address: data,
// //           items: orderItems,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         window.location.replace(response.data.session_url);
// //       } else {
// //         toast.error("Order failed");
// //       }
// //     } catch (error) {
// //       toast.error("Unauthorized or server error");
// //       console.error(error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!token) {
// //       toast.error("Please login first");
// //       navigate("/cart");
// //     } else if (getTotalCartAmount() === 0) {
// //       toast.error("Please add items to cart");
// //       navigate("/cart");
// //     }
// //   }, [token]);

// //   return (
// //     <form className="place-order" onSubmit={placeOrder}>
// //       {/* UI unchanged */}
// //       <button type="submit">PROCEED TO PAYMENT</button>
// //     </form>
// //   );
// // };

// const placeOrder = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { items, address } = req.body;

//     let totalAmount = 0;
//     let stripeItems = [];

//     for (const item of items) {
//       const product = await foodModel.findById(item.productId);

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }

//       totalAmount += product.price * item.quantity;

//       stripeItems.push({
//         price_data: {
//           currency: "usd",
//           product_data: { name: product.name },
//           unit_amount: product.price * 100,
//         },
//         quantity: item.quantity,
//       });
//     }

//     // delivery fee
//     stripeItems.push({
//       price_data: {
//         currency: "usd",
//         product_data: { name: "Delivery Charges" },
//         unit_amount: 2 * 100,
//       },
//       quantity: 1,
//     });

//     const newOrder = new orderModel({
//       userId,
//       items,
//       amount: totalAmount + 2,
//       address,
//       payment: false,
//     });

//     await newOrder.save();
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: stripeItems,
//       mode: "payment",
//       success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error("Order Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Order failed",
//     });
//   }
// };


// export default PlaceOrder;



import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);


const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // ✅ send only _id + quantity
    const orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          productId: item._id,
          quantity: cartItems[item._id],
        });
      }
    });

    try {
      const res = await axios.post(
        `${url}/api/order/place`,
        {
          address: data,
          items: orderItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        window.location.href = res.data.session_url;
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      toast.error("Unauthorized or server error");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Cart is empty");
      navigate("/cart");
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <input name="firstName" placeholder="First name" required onChange={onChangeHandler} />
        <input name="lastName" placeholder="Last name" required onChange={onChangeHandler} />
        <input name="email" placeholder="Email" required onChange={onChangeHandler} />
        <input name="street" placeholder="Street" required onChange={onChangeHandler} />
        <input name="city" placeholder="City" required onChange={onChangeHandler} />
        <input name="state" placeholder="State" required onChange={onChangeHandler} />
        <input name="zipcode" placeholder="Zip Code" required onChange={onChangeHandler} />
        <input name="country" placeholder="Country" required onChange={onChangeHandler} />
        <input name="phone" placeholder="Phone" required onChange={onChangeHandler} />
      </div>

      <div className="place-order-right">
        <h2>Total: ₹{getTotalCartAmount() + 2}</h2>
        <button type="submit">PROCEED TO PAYMENT</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
