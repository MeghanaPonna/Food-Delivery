// // import orderModel from "../models/orderModel.js";
// // import userModel from "../models/userModel.js";
// // import foodModel from "../models/foodModel.js";
// // import Offer from "../models/offerModel.js";
// // import Stripe from "stripe";

// // const frontend_url = "http://localhost:5173";

// // /* =========================
// //    PLACE ORDER (USER)
// // ========================= */
// // const placeOrder = async (req, res) => {
// //   try {
// //     if (!process.env.STRIPE_SECRET_KEY) {
// //       return res.status(500).json({
// //         success: false,
// //         message: "Stripe key not configured",
// //       });
// //     }

// //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// //     const userId = req.user._id;
// //     const { items, address, coupon } = req.body;

// //     let subtotal = 0;
// //     const stripeItems = [];
// //     const orderItems = [];

// //     // 🔹 Products
// //     for (const item of items) {
// //       const product = await foodModel.findById(item.productId);
// //       if (!product) {
// //         return res.status(404).json({ success: false, message: "Product not found" });
// //       }

// //       subtotal += product.price * item.quantity;

// //       orderItems.push({
// //         productId: product._id,
// //         name: product.name,
// //         price: product.price,
// //         quantity: item.quantity,
// //       });

// //       stripeItems.push({
// //         price_data: {
// //           currency: "inr",
// //           product_data: { name: product.name },
// //           unit_amount: product.price * 100,
// //         },
// //         quantity: item.quantity,
// //       });
// //     }

// //     // 🔹 Delivery fee
// //     const DELIVERY_FEE = 2;
// //     stripeItems.push({
// //       price_data: {
// //         currency: "inr",
// //         product_data: { name: "Delivery Charges" },
// //         unit_amount: DELIVERY_FEE * 100,
// //       },
// //       quantity: 1,
// //     });

// //     let finalAmount = subtotal + DELIVERY_FEE;
// //     let discountAmount = 0;

// //     // 🔹 Coupon validation (backend only)
// //     if (coupon) {
// //       const offer = await Offer.findOne({
// //         code: coupon.toUpperCase(),
// //         active: true,
// //         expiryDate: { $gte: new Date() },
// //       });

// //       if (offer && finalAmount >= offer.minAmount) {
// //         discountAmount =
// //           offer.discountType === "percentage"
// //             ? Math.round((subtotal * offer.discountValue) / 100)
// //             : offer.discountValue;

// //         discountAmount = Math.min(discountAmount, subtotal);
// //         finalAmount -= discountAmount;
// //       }
// //     }

// //     // 🔒 Stripe minimum safeguard
// //     if (finalAmount < 50) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Minimum payable amount is ₹50",
// //       });
// //     }

// //     // 🔹 Stripe checkout
// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ["card"],
// //       line_items: stripeItems,
// //       mode: "payment",
// //       success_url: `${frontend_url}/verify?session_id={CHECKOUT_SESSION_ID}`,
// //       cancel_url: `${frontend_url}/cart`,
// //     });

// //     // 🔹 Save order
// //     const newOrder = new orderModel({
// //       userId,
// //       items: orderItems,
// //       subtotal,
// //       deliveryFee: DELIVERY_FEE,
// //       discount: discountAmount,
// //       couponCode: coupon || null,
// //       amount: finalAmount,
// //       address,
// //       payment: false,
// //       status: "Food Processing",
// //       stripeSessionId: session.id,
// //     });

// //     await newOrder.save();
// //     await userModel.findByIdAndUpdate(userId, { cartData: {} });

// //     res.json({ success: true, session_url: session.url });
// //   } catch (error) {
// //     console.error("Place Order Error:", error);
// //     res.status(500).json({ success: false, message: "Order failed" });
// //   }
// // };

// // /* =========================
// //    VERIFY PAYMENT (PUBLIC)
// // ========================= */
// // const verifyOrder = async (req, res) => {
// //   try {
// //     const { session_id } = req.query;

// //     if (!session_id) return res.json({ success: false });

// //     const order = await orderModel.findOne({ stripeSessionId: session_id });
// //     if (!order) return res.json({ success: false });

// //     order.payment = true;
// //     await order.save();

// //     res.json({ success: true });
// //   } catch (error) {
// //     console.error("Verify error:", error);
// //     res.json({ success: false });
// //   }
// // };

// // /* =========================
// //    USER ORDERS
// // ========================= */
// // const userOrders = async (req, res) => {
// //   const orders = await orderModel
// //     .find({ userId: req.user._id })
// //     .sort({ createdAt: -1 });

// //   res.json({ success: true, data: orders });
// // };

// // /* =========================
// //    ADMIN
// // ========================= */
// // const listOrders = async (req, res) => {
// //   if (req.user.role !== "admin") {
// //     return res.status(403).json({ success: false });
// //   }

// //   const orders = await orderModel.find().sort({ createdAt: -1 });
// //   res.json({ success: true, data: orders });
// // };

// // const updateStatus = async (req, res) => {
// //   await orderModel.findByIdAndUpdate(req.body.orderId, {
// //     status: req.body.status,
// //   });
// //   res.json({ success: true });
// // };

// // export {
// //   placeOrder,
// //   verifyOrder,
// //   userOrders,
// //   listOrders,
// //   updateStatus,
// // };



// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import foodModel from "../models/foodModel.js";
// import Offer from "../models/offerModel.js";
// import Stripe from "stripe";

// const frontend_url = "http://localhost:5173";

// /* =========================
//    PLACE ORDER (USER)
// ========================= */
// const placeOrder = async (req, res) => {
//   try {
//     if (!process.env.STRIPE_SECRET_KEY) {
//       return res.status(500).json({
//         success: false,
//         message: "Stripe key not configured",
//       });
//     }

//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const userId = req.user._id;
//     const { items, address, coupon } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No items in order",
//       });
//     }

//     let subtotal = 0;
//     let discountAmount = 0;
//     const stripeItems = [];
//     const orderItems = [];

//     /* ---------- PRODUCTS ---------- */
//     for (const item of items) {
//       const product = await foodModel.findById(item.productId);

//       if (!product) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Product not found" });
//       }

//       subtotal += product.price * item.quantity;

//       orderItems.push({
//         productId: product._id,
//         name: product.name,
//         price: product.price,
//         quantity: item.quantity,
//       });

//       stripeItems.push({
//         price_data: {
//           currency: "inr",
//           product_data: { name: product.name },
//           unit_amount: product.price * 100,
//         },
//         quantity: item.quantity,
//       });
//     }

//     /* ---------- DELIVERY ---------- */
//     const DELIVERY_FEE = 2;

//     stripeItems.push({
//       price_data: {
//         currency: "inr",
//         product_data: { name: "Delivery Charges" },
//         unit_amount: DELIVERY_FEE * 100,
//       },
//       quantity: 1,
//     });

//     let finalAmount = subtotal + DELIVERY_FEE;

//     /* ---------- COUPON (SECURE BACKEND CHECK) ---------- */
//     if (coupon) {
//       const offer = await Offer.findOne({
//         code: coupon.toUpperCase(),
//         active: true,
//         expiryDate: { $gte: new Date() },
//       });

//       if (offer && finalAmount >= offer.minAmount) {
//         discountAmount =
//           offer.discountType === "percentage"
//             ? Math.round((subtotal * offer.discountValue) / 100)
//             : offer.discountValue;

//         discountAmount = Math.min(discountAmount, subtotal);
//         finalAmount -= discountAmount;

//         // 🔥 Stripe discount line item
//         stripeItems.push({
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: `Coupon Discount (${offer.code})`,
//             },
//             unit_amount: -discountAmount * 100,
//           },
//           quantity: 1,
//         });
//       }
//     }

//     /* ---------- STRIPE MINIMUM ---------- */
//     if (finalAmount < 50) {
//       return res.status(400).json({
//         success: false,
//         message: "Minimum payable amount is ₹50",
//       });
//     }

//     /* ---------- STRIPE CHECKOUT ---------- */
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: stripeItems,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${frontend_url}/cart`,
//     });

//     /* ---------- SAVE ORDER ---------- */
//     const newOrder = new orderModel({
//       userId,
//       items: orderItems,
//       subtotal,
//       deliveryFee: DELIVERY_FEE,
//       discount: discountAmount,
//       couponCode: coupon || null,
//       amount: finalAmount,
//       address,
//       payment: false,
//       status: "Food Processing",
//       stripeSessionId: session.id,
//     });

//     await newOrder.save();
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     res.json({
//       success: true,
//       session_url: session.url,
//     });
//   } catch (error) {
//     console.error("Place Order Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Order failed",
//     });
//   }
// };

// /* =========================
//    VERIFY PAYMENT (PUBLIC)
// ========================= */
// const verifyOrder = async (req, res) => {
//   try {
//     const { session_id } = req.query;

//     if (!session_id) {
//       return res.json({ success: false });
//     }

//     const order = await orderModel.findOne({
//       stripeSessionId: session_id,
//     });

//     if (!order) {
//       return res.json({ success: false });
//     }

//     order.payment = true;
//     await order.save();

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Verify Order Error:", error);
//     res.json({ success: false });
//   }
// };

// /* =========================
//    USER ORDERS
// ========================= */
// const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel
//       .find({ userId: req.user._id })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data: orders });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// /* =========================
//    ADMIN – ALL ORDERS
// ========================= */
// const listOrders = async (req, res) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ success: false });
//   }

//   const orders = await orderModel.find().sort({ createdAt: -1 });
//   res.json({ success: true, data: orders });
// };

// /* =========================
//    ADMIN – UPDATE STATUS
// ========================= */
// const updateStatus = async (req, res) => {
//   await orderModel.findByIdAndUpdate(req.body.orderId, {
//     status: req.body.status,
//   });

//   res.json({ success: true });
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
import Offer from "../models/offerModel.js";
import Stripe from "stripe";

const frontend_url = "http://localhost:5173";

/* =========================
   PLACE ORDER (USER)
========================= */
const placeOrder = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Stripe key not configured",
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const userId = req.user._id;
    const { items, address, coupon } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    let subtotal = 0;
    let discountAmount = 0;
    const stripeItems = [];
    const orderItems = [];

    /* ---------- PRODUCTS ---------- */
    for (const item of items) {
      const product = await foodModel.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      subtotal += product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      stripeItems.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: item.quantity,
      });
    }

    /* ---------- DELIVERY ---------- */
    const DELIVERY_FEE = 2;

    stripeItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: DELIVERY_FEE * 100,
      },
      quantity: 1,
    });

    let finalAmount = subtotal + DELIVERY_FEE;
    let discounts = [];

    /* ---------- COUPON (SECURE BACKEND CHECK) ---------- */
    // if (coupon) {
    //   const offer = await Offer.findOne({
    //     code: coupon.toUpperCase(),
    //     active: true,
    //     expiryDate: { $gte: new Date() },
    //   });

    //   if (offer && finalAmount >= offer.minAmount) {
    //     discountAmount =
    //       offer.discountType === "percentage"
    //         ? Math.round((subtotal * offer.discountValue) / 100)
    //         : offer.discountValue;

    //     discountAmount = Math.min(discountAmount, subtotal);
    //     finalAmount -= discountAmount;

    //     // ✅ Stripe-approved discount (NO negative amounts)
    //     const stripeCoupon = await stripe.coupons.create({
    //       amount_off: discountAmount * 100,
    //       currency: "inr",
    //       name: `Coupon ${offer.code}`,
    //     });

    //     discounts.push({
    //       coupon: stripeCoupon.id,
    //     });
    //   }
    // }


    if (coupon) {

  const today = new Date();
  today.setHours(0,0,0,0);

  const offer = await Offer.findOne({
    code: coupon.toUpperCase(),
    active: true,
    expiryDate: { $gte: today },
  });

  if (offer && finalAmount >= offer.minAmount) {

    discountAmount =
      offer.discountType === "percentage"
        ? Math.round((subtotal * offer.discountValue) / 100)
        : offer.discountValue;

    discountAmount = Math.min(discountAmount, subtotal);
    finalAmount -= discountAmount;

    const stripeCoupon = await stripe.coupons.create({
      amount_off: discountAmount * 100,
      currency: "inr",
      name: `Coupon ${offer.code}`,
    });

    discounts.push({
      coupon: stripeCoupon.id,
    });
  }
}


    /* ---------- STRIPE MINIMUM ---------- */
    if (finalAmount < 50) {
      return res.status(400).json({
        success: false,
        message: "Minimum payable amount is ₹50",
      });
    }

    /* ---------- STRIPE CHECKOUT ---------- */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: stripeItems,
      discounts,
      mode: "payment",
      success_url: `${frontend_url}/verify?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontend_url}/cart`,
    });

    /* ---------- SAVE ORDER ---------- */
    const newOrder = new orderModel({
      userId,
      items: orderItems,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      discount: discountAmount,
      couponCode: coupon || null,
      amount: finalAmount,
      address,
      payment: false,
      status: "Food Processing",
      stripeSessionId: session.id,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

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
   VERIFY PAYMENT (PUBLIC)
========================= */
const verifyOrder = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.json({ success: false });
    }

    const order = await orderModel.findOne({
      stripeSessionId: session_id,
    });

    if (!order) {
      return res.json({ success: false });
    }

    order.payment = true;
    await order.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Verify Order Error:", error);
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

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* =========================
   ADMIN – ALL ORDERS
========================= */
const listOrders = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false });
  }

  const orders = await orderModel.find().sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
};

/* =========================
   ADMIN – UPDATE STATUS
========================= */
const updateStatus = async (req, res) => {
  await orderModel.findByIdAndUpdate(req.body.orderId, {
    status: req.body.status,
  });

  res.json({ success: true });
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
};