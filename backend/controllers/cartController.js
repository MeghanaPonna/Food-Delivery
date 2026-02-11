// // import userModel from "../models/userModel.js";

// // // add items to user cart
// // const addToCart = async (req, res) => {
// //   try {
// //     let userData = await userModel.findById(req.body.userId);
// //     let cartData = await userData.cartData;
// //     if (!cartData[req.body.itemId]) {
// //       cartData[req.body.itemId] = 1;
// //     } else {
// //       cartData[req.body.itemId] += 1;
// //     }
// //     await userModel.findByIdAndUpdate(req.body.userId, { cartData });
// //     res.json({ success: true, message: "Added to Cart" });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // // remove from cart
// // const removeFromCart = async (req, res) => {
// //   try {
// //     let userData = await userModel.findById(req.body.userId);
// //     let cartData = await userData.cartData;
// //     if (cartData[req.body.itemId] > 1) {
// //       cartData[req.body.itemId] -= 1;
// //     } else {
// //       delete cartData[req.body.itemId];
// //     }
// //     await userModel.findByIdAndUpdate(req.body.userId, { cartData });
// //     res.json({ success: true, message: "Removed from Cart" });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // // fetch user cart data
// // const getCart = async (req, res) => {
// //   try {
// //     let userData = await userModel.findById(req.body.userId);
// //     let cartData = await userData.cartData;
// //     res.json({ success: true, cartData: cartData });
// //   } catch (error) {
// //     console.log(error);
// //     res.json({ success: false, message: "Error" });
// //   }
// // };

// // export { addToCart, removeFromCart, getCart };
// import userModel from "../models/userModel.js";

// // ADD TO CART
// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user._id; // ✅ from authMiddleware
//     const { itemId } = req.body;

//     const user = await userModel.findById(userId);

//     if (!user.cartData[itemId]) {
//       user.cartData[itemId] = 1;
//     } else {
//       user.cartData[itemId] += 1;
//     }

//     await user.save();

//     res.json({
//       success: true,
//       cartData: user.cartData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error adding to cart",
//     });
//   }
// };

// // REMOVE FROM CART
// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { itemId } = req.body;

//     const user = await userModel.findById(userId);

//     if (user.cartData[itemId] > 1) {
//       user.cartData[itemId] -= 1;
//     } else {
//       delete user.cartData[itemId];
//     }

//     await user.save();

//     res.json({
//       success: true,
//       cartData: user.cartData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error removing from cart",
//     });
//   }
// };

// // GET CART
// const getCart = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const user = await userModel.findById(userId);

//     res.json({
//       success: true,
//       cartData: user.cartData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching cart",
//     });
//   }
// };

// export { addToCart, removeFromCart, getCart };
import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);

    // ✅ safety init
    if (!user.cartData) {
      user.cartData = {};
    }

    user.cartData[itemId] = (user.cartData[itemId] || 0) + 1;

    await user.save();

    res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);

    if (!user.cartData) {
      user.cartData = {};
    }

    if (user.cartData[itemId] > 1) {
      user.cartData[itemId] -= 1;
    } else {
      delete user.cartData[itemId];
    }

    await user.save();

    res.json({
      success: true,
      cartData: user.cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error removing from cart",
    });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
    });
  }
};

export { addToCart, removeFromCart, getCart };
