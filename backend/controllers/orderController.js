// // import orderModel from "../models/orderModel.js";
// // import userModel from "../models/userModel.js";
// // import Stripe from "stripe";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // // placing user order for frontend
// // const placeOrder = async (req, res) => {
// //   const frontend_url = "http://localhost:3000";
// //   try {
// //     const newOrder = new orderModel({
// //       userId: req.body.userId,
// //       items: req.body.items,
// //       amount: req.body.amount,
// //       address: req.body.address,
// //     });
// //     await newOrder.save();
// //     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

// //     const line_items = req.body.items.map((item) => ({
// //       price_data: {
// //         currency: "usd",
// //         product_data: {
// //           name: item.name,
// //         },
// //         unit_amount: item.price * 100,
// //       },
// //       quantity: item.quantity,
// //     }));

// //     line_items.push({
// //       price_data: {
// //         currency: "usd",
// //         product_data: {
// //           name: "Delivery Charges",
// //         },
// //         unit_amount: 2 * 100,
// //       },
// //       quantity: 1,
// //     });

// //     const session = await stripe.checkout.sessions.create({
// //       line_items: line_items,
// //       mode: "payment",
// //       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
// //       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
// //     });

// //     res.json({ success: true, session_url: session.url });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // const verifyOrder = async (req, res) => {
// //   const { orderId, success } = req.body;
// //   try {
// //     if (success == "true") {
// //       await orderModel.findByIdAndUpdate(orderId, { payment: true });
// //       res.json({ success: true, message: "Paid" });
// //     } else {
// //       await orderModel.findByIdAndDelete(orderId);
// //       res.json({ success: false, message: "Not Paid" });
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // // user orders for frontend
// // const userOrders = async (req, res) => {
// //   try {
// //     const orders = await orderModel.find({ userId: req.body.userId });
// //     res.json({ success: true, data: orders });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // // Listing orders for admin pannel
// // const listOrders = async (req, res) => {
// //   try {
// //     let userData = await userModel.findById(req.body.userId);
// //     if (userData && userData.role === "admin") {
// //       const orders = await orderModel.find({});
// //       res.json({ success: true, data: orders });
// //     } else {
// //       res.json({ success: false, message: "You are not admin" });
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // // api for updating status
// // const updateStatus = async (req, res) => {
// //   try {
// //     let userData = await userModel.findById(req.body.userId);
// //     if (userData && userData.role === "admin") {
// //       await orderModel.findByIdAndUpdate(req.body.orderId, {
// //         status: req.body.status,
// //       });
// //       res.json({ success: true, message: "Status Updated Successfully" });
// //     }else{
// //       res.json({ success: false, message: "You are not an admin" });
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import foodModel from "../models/foodModel.js";
// import Stripe from "stripe";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// // console.log("STRIPE KEY 👉", process.env.STRIPE_SECRET_KEY);


// const frontend_url = "http://localhost:5173";

// // PLACE ORDER
// // const placeOrder = async (req, res) => {

// //   console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

// //   try {
// //     const userId = req.user._id; // ✅ from authMiddleware
// //     const { items, address } = req.body;

// //     let totalAmount = 0;
// //     let stripeItems = [];

// //     for (const item of items) {
// //       const product = await foodModel.findById(item._id);

// //       if (!product) {
// //         return res.json({
// //           success: false,
// //           message: "Product not found",
// //         });
// //       }

// //       totalAmount += product.price * item.quantity;

// //       stripeItems.push({
// //         price_data: {
// //           currency: "usd",
// //           product_data: {
// //             name: product.name,
// //           },
// //           unit_amount: product.price * 100,
// //         },
// //         quantity: item.quantity,
// //       });
// //     }

// //     // delivery fee
// //     stripeItems.push({
// //       price_data: {
// //         currency: "usd",
// //         product_data: {
// //           name: "Delivery Charges",
// //         },
// //         unit_amount: 2 * 100,
// //       },
// //       quantity: 1,
// //     });

// //     const newOrder = new orderModel({
// //       userId,
// //       items,
// //       amount: totalAmount + 2,
// //       address,
// //       payment: false,
// //     });

// //     await newOrder.save();

// //     // clear cart
// //     await userModel.findByIdAndUpdate(userId, { cartData: {} });

// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ["card"],
// //       line_items: stripeItems,
// //       mode: "payment",
// //       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
// //       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
// //     });

// //     res.json({
// //       success: true,
// //       session_url: session.url,
// //     });
// //   } catch (error) {
// //     console.error("Order Error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Order failed",
// //     });
// //   }
// // };

// const placeOrder = async (req, res) => {
//   // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // 👈 MOVE HERE

//   // console.log("STRIPE KEY 👉", process.env.STRIPE_SECRET_KEY);
//   try {

//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // 👈 MOVE HERE

//     console.log("STRIPE KEY 👉", process.env.STRIPE_SECRET_KEY);
//     const userId = req.user._id;
//     const { items, address } = req.body;

//     let totalAmount = 0;
//     let stripeItems = [];
//     let orderItems = [];

//     for (const item of items) {
//       const product = await foodModel.findById(item.productId);

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }

//       totalAmount += product.price * item.quantity;

//       // Stripe item
//       stripeItems.push({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: product.name,
//           },
//           unit_amount: product.price * 100,
//         },
//         quantity: item.quantity,
//       });

//       // Order item (clean)
//       orderItems.push({
//         productId: product._id,
//         name: product.name,
//         price: product.price,
//         quantity: item.quantity,
//       });
//     }

//     // Delivery fee
//     stripeItems.push({
//       price_data: {
//         currency: "usd",
//         product_data: { name: "Delivery Charges" },
//         unit_amount: 2 * 100,
//       },
//       quantity: 1,
//     });

//     // const newOrder = new orderModel({
//     //   userId,
//     //   items: orderItems,        // ✅ CLEAN
//     //   amount: totalAmount + 2,
//     //   address,
//     //   payment: false,
//     // });
//     const DELIVERY_FEE = 2;

//     const newOrder = new orderModel({
//       userId,
//       items: orderItems,
//       subtotal: totalAmount,
//       deliveryFee: DELIVERY_FEE,
//       amount: totalAmount + DELIVERY_FEE,
//       address,
//       payment: false,
//     });


//     await newOrder.save();

//     // clear cart
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: stripeItems,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({
//       success: true,
//       session_url: session.url,
//     });

//   } catch (error) {
//     console.error("Order Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Order failed",
//     });
//   }
// };


// // VERIFY PAYMENT
// const verifyOrder = async (req, res) => {
//   const { orderId, success } = req.body;

//   try {
//     if (success === "true") {
//       await orderModel.findByIdAndUpdate(orderId, {
//         payment: true,
//       });
//       res.json({ success: true });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false });
//     }
//   } catch (error) {
//     res.json({ success: false });
//   }
// };

// // USER ORDERS
// const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({
//       userId: req.user._id,
//     });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     res.json({ success: false });
//   }
// };

// // ADMIN: LIST ORDERS
// const listOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({});
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     res.json({ success: false });
//   }
// };

// // ADMIN: UPDATE STATUS
// const updateStatus = async (req, res) => {
//   try {
//     await orderModel.findByIdAndUpdate(req.body.orderId, {
//       status: req.body.status,
//     });
//     res.json({ success: true });
//   } catch (error) {
//     res.json({ success: false });
//   }
// };

// export {
//   placeOrder,
//   verifyOrder,
//   userOrders,
//   listOrders,
//   updateStatus,
// };



import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import Stripe from "stripe";

const frontend_url = "http://localhost:5173";

/* =========================
   PLACE ORDER (USER)
========================= */
const placeOrder = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const userId = req.user._id;
    const { items, address } = req.body;

    // 🔴 PREVENT DUPLICATE UNPAID ORDERS
    const existingOrder = await orderModel.findOne({
      userId,
      payment: false,
    });

    if (existingOrder) {
      return res.json({
        success: true,
        message: "Order already exists",
      });
    }

    let subtotal = 0;
    let stripeItems = [];
    let orderItems = [];

    for (const item of items) {
      const product = await foodModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      subtotal += product.price * item.quantity;

      // Stripe line item
      stripeItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: item.quantity,
      });

      // Store clean order item
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const DELIVERY_FEE = 2;

    // Delivery charge for Stripe
    stripeItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Charges" },
        unit_amount: DELIVERY_FEE * 100,
      },
      quantity: 1,
    });

    // Create order in DB
    const newOrder = new orderModel({
      userId,
      items: orderItems,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      amount: subtotal + DELIVERY_FEE,
      address,
      payment: false,
      status: "Food Processing",
    });

    await newOrder.save();

    // Clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: stripeItems,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });

  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
};

/* =========================
   VERIFY PAYMENT
========================= */
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false });
  }
};

/* =========================
   USER ORDERS
========================= */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};

/* =========================
   ADMIN: LIST ORDERS
========================= */
// const listOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({}).sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       data: orders,
//     });
//   } catch (error) {
//     res.json({ success: false });
//   }
// };

const listOrders = async (req, res) => {
  try {
    // 🔐 Admin-only access
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("List Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};


/* =========================
   ADMIN: UPDATE STATUS
========================= */
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};
