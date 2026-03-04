import Offer from "../models/offerModel.js";
import foodModel from "../models/foodModel.js";

/* ======================
   ADD OFFER (ADMIN)
====================== */
export const addOffer = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minAmount,
      expiryDate,
    } = req.body;

    // 🔴 BASIC VALIDATION
    if (
      !code ||
      !discountType ||
      discountValue === undefined ||
      minAmount === undefined ||
      !expiryDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🔴 CHECK DUPLICATE OFFER CODE
    const existingOffer = await Offer.findOne({
      code: code.toUpperCase(),
    });

    if (existingOffer) {
      return res.status(400).json({
        success: false,
        message: "Offer code already exists",
      });
    }

    // ✅ CREATE OFFER
    const offer = await Offer.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minAmount,
      // expiryDate,
      expiryDate: new Date(expiryDate),
    });

    res.status(201).json({
      success: true,
      message: "Offer added successfully",
      offer,
    });
  } catch (error) {
    console.error("Add Offer Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while adding offer",
    });
  }
};

/* ======================
   GET ACTIVE OFFERS (USER)
====================== */
// export const getOffers = async (req, res) => {

//   try {
//     const offers = await Offer.find({
//       active: true,
//       expiryDate: { $gte: new Date() },
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       offers,
//     });
//   } catch (error) {
//     console.error("Get Offers Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching offers",
//     });
//   }
// };

export const getOffers = async (req, res) => {
  try {
    // ✅ Normalize today's date (remove time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const offers = await Offer.find({
      active: true,
      expiryDate: { $gte: today },
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      offers,
    });
  } catch (error) {
    console.error("Get Offers Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching offers",
    });
  }
};




// /* ======================
//    APPLY OFFER (USER)
// ====================== */
// export const applyOffer = async (req, res) => {
//   try {
//     const { code, cartTotal } = req.body;

//     if (!code || cartTotal === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "Coupon code and cart total are required",
//       });
//     }

//     // normalize code
//     const couponCode = code.toUpperCase();

//     // normalize today date
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // find valid offer
//     const offer = await Offer.findOne({
//       code: couponCode,
//       active: true,
//       expiryDate: { $gte: today },
//     });

//     if (!offer) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired coupon",
//       });
//     }

//     if (cartTotal < offer.minAmount) {
//       return res.status(400).json({
//         success: false,
//         message: `Minimum cart value ₹${offer.minAmount} required`,
//       });
//     }

//     // calculate discount
//     let discount = 0;

//     if (offer.discountType === "percentage") {
//       discount = Math.round((cartTotal * offer.discountValue) / 100);
//     } else {
//       discount = offer.discountValue;
//     }

//     // prevent over-discount
//     discount = Math.min(discount, cartTotal);

//     const finalAmount = cartTotal - discount;

//     res.json({
//       success: true,
//       coupon: couponCode,
//       discount,
//       finalAmount,
//     });
//   } catch (error) {
//     console.error("Apply Offer Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while applying offer",
//     });
//   }
// };



/* ======================
   APPLY OFFER (USER)
====================== */
// export const applyOffer = async (req, res) => {
//   try {
//     const { code, items } = req.body;

//     if (!code || !items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid coupon request",
//       });
//     }

//     // 🔹 Find offer
//     const offer = await Offer.findOne({
//       code: code.toUpperCase(),
//       active: true,
//       expiryDate: { $gte: new Date() },
//     });

//     if (!offer) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired coupon",
//       });
//     }

//     // 🔹 Calculate subtotal
//     let subtotal = 0;

//     for (const item of items) {
//       const product = await foodModel.findById(item.productId);
//       if (!product) continue;

//       subtotal += product.price * item.quantity;
//     }

//     if (subtotal < offer.minAmount) {
//       return res.status(400).json({
//         success: false,
//         message: `Minimum order ₹${offer.minAmount} required`,
//       });
//     }

//     // 🔹 Calculate discount
//     let discount =
//       offer.discountType === "percentage"
//         ? Math.round((subtotal * offer.discountValue) / 100)
//         : offer.discountValue;

//     discount = Math.min(discount, subtotal);

//     const DELIVERY_FEE = 2;
//     const total = subtotal + DELIVERY_FEE - discount;

//     res.json({
//       success: true,
//       discount,
//       total,
//       // coupon: offer.code,
//     });
//   } catch (error) {
//     console.error("Apply Offer Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to apply coupon",
//     });
//   }
// };


// export const applyOffer = async (req, res) => {
//   try {
//     const { code, items } = req.body;

//     if (!code || !items?.length) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid coupon request",
//       });
//     }

//     console.log("Checking coupon:", code);

//     const offer = await Offer.findOne({
//       code: code.toUpperCase(),
//       expiryDate: { $gte: new Date() },
//     });

//     if (!offer) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or expired coupon",
//       });
//     }

//     let subtotal = 0;

//     for (const item of items) {
//       const product = await foodModel.findById(item.productId || item._id);
//       if (!product) continue;

//       subtotal += product.price * item.quantity;
//     }

//     if (subtotal < offer.minAmount) {
//       return res.status(400).json({
//         success: false,
//         message: `Minimum order ₹${offer.minAmount} required`,
//       });
//     }

//     let discount =
//       offer.discountType === "percentage"
//         ? (subtotal * offer.discountValue) / 100
//         : offer.discountValue;

//     discount = Math.min(discount, subtotal);

//     const DELIVERY_FEE = 2;
//     const total = subtotal + DELIVERY_FEE - discount;

//     res.json({
//       success: true,
//       discount,
//       total,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to apply coupon",
//     });
//   }
// };



export const applyOffer = async (req, res) => {
  try {
    const { code, items } = req.body;

    if (!code || !items?.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon request",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const offer = await Offer.findOne({
      code: code.toUpperCase(),
      active: true,
      expiryDate: { $gte: today },
    });

    if (!offer) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired coupon",
      });
    }

    let subtotal = 0;

    for (const item of items) {
      const product = await foodModel.findById(item.productId || item._id);
      if (!product) continue;

      subtotal += product.price * item.quantity;
    }

    if (subtotal < offer.minAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order ₹${offer.minAmount} required`,
      });
    }

    let discount =
      offer.discountType === "percentage"
        ? Math.round((subtotal * offer.discountValue) / 100)
        : offer.discountValue;

    discount = Math.min(discount, subtotal);

    const DELIVERY_FEE = 2;
    const total = subtotal + DELIVERY_FEE - discount;

    res.json({
      success: true,
      discount,
      total,
      coupon: offer.code,
    });
  } catch (error) {
    console.error("Apply Offer Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to apply coupon",
    });
  }
};


