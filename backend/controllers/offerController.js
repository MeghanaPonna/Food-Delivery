import Offer from "../models/offerModel.js";

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
      expiryDate,
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