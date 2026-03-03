// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   items: { type: Array, required: true },
//   amount: { type: Number, required: true },
//   address: { type: Object, required: true },
//   status: { type: String, default: "Food Processing" },
//   date: { type: Date, default: Date.now() },
//   payment: { type: Boolean, default: false },
// });

// const orderModel =
//   mongoose.models.order || mongoose.model("order", orderSchema);

// export default orderModel;


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: { type: Array, required: true },
    subtotal: { type: Number },
    deliveryFee: { type: Number },
    discount: { type: Number },
    couponCode: { type: String },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    payment: { type: Boolean, default: false },

    // 🔥 THIS WAS MISSING
    stripeSessionId: { type: String, required: true },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
