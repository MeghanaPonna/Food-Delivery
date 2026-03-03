// // import React, { useContext } from "react";
// // import "./Cart.css";
// // import { StoreContext } from "../../context/StoreContext";
// // import { useNavigate } from "react-router-dom";

// // const Cart = () => {
// //   const {
// //     food_list,
// //     cartItems,
// //     setCartItems,
// //     addToCart,
// //     removeFromCart,
// //     getTotalCartAmount,
// //     url
// //   } = useContext(StoreContext);

// //   const navigate=useNavigate();

// //   return (
// //     <div className="cart">
// //       <div className="cart-items">
// //         <div className="cart-items-title">
// //           <p>Items</p>
// //           <p>Title</p>
// //           <p>Price</p>
// //           <p>Quantity</p>
// //           <p>Total</p>
// //           <p>Remove</p>
// //         </div>
// //         <br />
// //         <hr />
// //         {food_list.map((item, index) => {
// //           if (cartItems[item._id] > 0) {
// //             return (
// //               <div>
// //                 <div className="cart-items-title cart-items-item">
// //                   <img src={url+"/images/"+item.image} alt="" />
// //                   <p>{item.name}</p>
// //                   <p>${item.price}</p>
// //                   <p>{cartItems[item._id]}</p>
// //                   <p>${item.price * cartItems[item._id]}</p>
// //                   <p onClick={() => removeFromCart(item._id)} className="cross">
// //                     x
// //                   </p>
// //                 </div>
// //                 <hr />
// //               </div>
// //             );
// //           }
// //         })}
// //       </div>
// //       <div className="cart-bottom">
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
// //               <p>${getTotalCartAmount()===0?0:2}</p>
// //             </div>
// //             <hr />
// //             <div className="cart-total-details">
// //               <b>Total</b>
// //               <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
// //             </div>
// //           </div>
// //           <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
// //         </div>
// //         <div className="cart-promocode">
// //           <div>
// //             <p>If you have a promocode, Enter it here</p>
// //             <div className="cart-promocode-input">
// //               <input type="text" placeholder="promo code" />
// //               <button>Submit</button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Cart;

// import React, { useContext } from "react";
// import "./Cart.css";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const {
//     food_list,
//     cartItems,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//   } = useContext(StoreContext);

//   const navigate = useNavigate();

//   return (
//     <div className="cart">
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>

//         <hr />

//         {food_list.map((item) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div key={item._id}>
//                 <div className="cart-items-title cart-items-item">
//                   <img
//                     src={`${url}/images/${item.image}`}
//                     alt={item.name}
//                   />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>${item.price * cartItems[item._id]}</p>
//                   <p
//                     onClick={() => removeFromCart(item._id)}
//                     className="cross"
//                   >
//                     ×
//                   </p>
//                 </div>
//                 <hr />
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>

//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>

//           <div className="cart-total-details">
//             <p>Subtotal</p>
//             <p>${getTotalCartAmount()}</p>
//           </div>

//           <hr />

//           <div className="cart-total-details">
//             <p>Delivery Fee</p>
//             <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//           </div>

//           <hr />

//           <div className="cart-total-details">
//             <b>Total</b>
//             <b>
//               $
//               {getTotalCartAmount() === 0
//                 ? 0
//                 : getTotalCartAmount() + 2}
//             </b>
//           </div>

//           <button onClick={() => navigate("/order")}>
//             PROCEED TO CHECKOUT
//           </button>
//         </div>

//         <div className="cart-promocode">
//           <p>If you have a promo code, enter it here</p>
//           <div className="cart-promocode-input">
//             <input type="text" placeholder="Promo code" />
//             <button>Apply</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const {
    food_list,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // 🔥 Coupon states
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(getTotalCartAmount());
  const [message, setMessage] = useState("");

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2;

  // ✅ Apply Coupon
  // const applyCoupon = async () => {
  //   try {
  //     const res = await axios.post(`${url}/api/offers/apply`, {
  //       code: coupon,
  //       cartTotal: getTotalCartAmount() + deliveryFee,
  //     });

  //     setDiscount(res.data.discount);
  //     setFinalAmount(res.data.finalAmount);
  //     setMessage("Coupon applied successfully ✅");
  //   } catch (err) {
  //     setDiscount(0);
  //     setFinalAmount(getTotalCartAmount() + deliveryFee);
  //     setMessage(err.response?.data?.message || "Invalid coupon");
  //   }
  // };


//   const applyCoupon = async () => {
//   try {
//     // build items array
//     const items = Object.keys(cartItems)
//       .filter((id) => cartItems[id] > 0)
//       .map((id) => ({
//         productId: id,
//         quantity: cartItems[id],
//       }));

//     const res = await axios.post(`${url}/api/offers/apply`, {
//       code: coupon,
//       items,
//     });

//     setDiscount(res.data.discount);
//     setFinalAmount(res.data.total);
//     setMessage("Coupon applied successfully ✅");
//   } catch (err) {
//     setDiscount(0);
//     setFinalAmount(getTotalCartAmount() + deliveryFee);
//     setMessage(err.response?.data?.message || "Invalid coupon");
//   }
// };



const applyCoupon = async () => {
  try {
    const items = Object.keys(cartItems)
      .filter((id) => cartItems[id] > 0)
      .map((id) => ({
        productId: id,
        quantity: cartItems[id],
      }));

    if (items.length === 0) {
      setMessage("Cart is empty");
      return;
    }

    const res = await axios.post(`${url}/api/offers/apply`, {
      code: coupon,
      items,
    });

    setDiscount(res.data.discount);
    setFinalAmount(res.data.total);
    setMessage("Coupon applied successfully ✅");
  } catch (err) {
    setDiscount(0);
    setFinalAmount(getTotalCartAmount() + deliveryFee);
    setMessage(err.response?.data?.message || "Invalid coupon");
  }
};



  return (
    <div className="cart">
      {/* 🛒 CART ITEMS */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cross"
                  >
                    {/* × */}
                    ✕
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* 💳 CART TOTAL */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>

          {discount > 0 && (
            <>
              <hr />
              <div className="cart-total-details">
                <p>Discount</p>
                <p>-₹{discount}</p>
              </div>
            </>
          )}

          <hr />

          <div className="cart-total-details">
            <b>Total Payable</b>
            <b>
              ₹
              {discount > 0
                ? finalAmount
                : getTotalCartAmount() + deliveryFee}
            </b>
          </div>

          <button
            onClick={() =>
              navigate("/order", {
                state: {
                  total:
                    discount > 0
                      ? finalAmount
                      : getTotalCartAmount() + deliveryFee,
                  discount,
                  coupon,
                },
              })
            }
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* 🎟 PROMO CODE */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="Promo code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>
          {message && <p className="coupon-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Cart;

