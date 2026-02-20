// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Offers.css";

// const Offers = () => {
//   const url = "http://localhost:4000";

//   /* ================= STATE ================= */
//   const [offers, setOffers] = useState([]); // ALWAYS ARRAY

//   const [form, setForm] = useState({
//     code: "",
//     discountType: "percentage",
//     discountValue: "",
//     minAmount: "",
//     expiryDate: "",
//   });

//   /* ================= FETCH OFFERS ================= */
//   const fetchOffers = async () => {
//     try {
//       const res = await axios.get(`${url}/api/offers`);

//       // backend returns { success, offers }
//       if (res.data?.success && Array.isArray(res.data.offers)) {
//         setOffers(res.data.offers);
//       } else {
//         setOffers([]);
//       }
//     } catch (error) {
//       console.error("Fetch offers error:", error);
//       setOffers([]);
//     }
//   };

//   /* ================= ADD OFFER ================= */
// //   const addOffer = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post(
// //         `${url}/api/offers/add`,
// //         {
// //           code: form.code.toUpperCase(),
// //           discountType: form.discountType,
// //           discountValue: Number(form.discountValue),
// //           minAmount: Number(form.minAmount),
// //           expiryDate: form.expiryDate,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );

// //       if (res.data.success) {
// //         setForm({
// //           code: "",
// //           discountType: "percentage",
// //           discountValue: "",
// //           minAmount: "",
// //           expiryDate: "",
// //         });

// //         fetchOffers();
// //       }
// //     } catch (error) {
// //       console.error("Add offer error:", error);
// //     }
// //   };


// export const addOffer = async (req, res) => {
//   try {
//     const {
//       code,
//       discountType,
//       discountValue,
//       minAmount,
//       expiryDate,
//     } = req.body;

//     if (
//       !code ||
//       !discountType ||
//       discountValue === undefined ||
//       minAmount === undefined ||
//       !expiryDate
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Normalize code
//     const normalizedCode = code.trim().toUpperCase();

//     // Check duplicate
//     const exists = await Offer.findOne({ code: normalizedCode });
//     if (exists) {
//       return res.status(409).json({
//         success: false,
//         message: "Offer code already exists",
//       });
//     }

//     const offer = await Offer.create({
//       code: normalizedCode,
//       discountType,
//       discountValue,
//       minAmount,
//       expiryDate,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Offer added successfully",
//       offer,
//     });
//   } catch (error) {
//     console.error("Add Offer Error:", error);

//     // 🔥 HANDLE DUPLICATE KEY ERROR SAFELY
//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Offer code already exists",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
//   /* ================= INIT ================= */
//   useEffect(() => {
//     fetchOffers();
//   }, []);

//   return (
//     <div className="admin-offers">
//       <h2>Manage Offers</h2>

//       {/* ========= ADD OFFER FORM ========= */}
//       <form className="offer-form" onSubmit={addOffer}>
//         <input
//           type="text"
//           placeholder="Offer Code (e.g. SAVE20)"
//           value={form.code || ""}
//           required
//           onChange={(e) => setForm({ ...form, code: e.target.value })}
//         />

//         <select
//           value={form.discountType || "percentage"}
//           onChange={(e) =>
//             setForm({ ...form, discountType: e.target.value })
//           }
//         >
//           <option value="percentage">Percentage (%)</option>
//           <option value="flat">Flat (₹)</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Discount Value"
//           value={form.discountValue || ""}
//           required
//           onChange={(e) =>
//             setForm({ ...form, discountValue: e.target.value })
//           }
//         />

//         <input
//           type="number"
//           placeholder="Minimum Order Amount"
//           value={form.minAmount || ""}
//           required
//           onChange={(e) =>
//             setForm({ ...form, minAmount: e.target.value })
//           }
//         />

//         <input
//           type="date"
//           value={form.expiryDate || ""}
//           required
//           onChange={(e) =>
//             setForm({ ...form, expiryDate: e.target.value })
//           }
//         />

//         <button type="submit">Add Offer</button>
//       </form>

//       {/* ========= OFFER LIST ========= */}
//       <div className="offer-list">
//         {offers.length === 0 ? (
//           <p>No offers available</p>
//         ) : (
//           offers.map((offer) => (
//             <div className="offer-card" key={offer._id}>
//               <h3>{offer.code}</h3>
//               <p>
//                 {offer.discountType === "percentage"
//                   ? `${offer.discountValue}% OFF`
//                   : `₹${offer.discountValue} OFF`}
//               </p>
//               <p>Min Order: ₹{offer.minAmount}</p>
//               <p>
//                 Expires:{" "}
//                 {new Date(offer.expiryDate).toLocaleDateString()}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Offers;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Offers.css";
import { toast } from "react-toastify";


const Offers = () => {
  const url = "http://localhost:4000";

  /* ================= STATE ================= */
  const [offers, setOffers] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minAmount: "",
    expiryDate: "",
  });

  /* ================= FETCH OFFERS ================= */
  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${url}/api/offers`);

      if (res.data?.success && Array.isArray(res.data.offers)) {
        setOffers(res.data.offers);
      } else {
        setOffers([]);
      }
    } catch (error) {
      console.error("Fetch offers error:", error);
      setOffers([]);
    }
  };

  /* ================= ADD OFFER ================= */
//   const addOffer = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         `${url}/api/offers/add`,
//         {
//           code: form.code.toUpperCase(),
//           discountType: form.discountType,
//           discountValue: Number(form.discountValue),
//           minAmount: Number(form.minAmount),
//           expiryDate: form.expiryDate,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         setForm({
//           code: "",
//           discountType: "percentage",
//           discountValue: "",
//           minAmount: "",
//           expiryDate: "",
//         });

//         fetchOffers();
//       }
//     } catch (error) {
//       console.error(
//         "Add offer error:",
//         error.response?.data?.message || error.message
//       );
//       alert(error.response?.data?.message || "Failed to add offer");
//     }
//   };


const addOffer = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${url}/api/offers/add`,
      {
        code: form.code.toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minAmount: Number(form.minAmount),
        expiryDate: form.expiryDate,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.data.success) {
      toast.success("🎉 Offer added successfully!");

      setForm({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minAmount: "",
        expiryDate: "",
      });

      fetchOffers();
    }
  } catch (error) {
    const msg =
      error.response?.data?.message || "Failed to add offer";
    toast.error(msg);
  }
};
  /* ================= INIT ================= */
  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="admin-offers">
      <h2>Manage Offers</h2>

      {/* ADD OFFER FORM */}
      <form className="offer-form" onSubmit={addOffer}>
        <input
          type="text"
          placeholder="Offer Code (e.g. SAVE20)"
          value={form.code}
          required
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        <select
          value={form.discountType}
          onChange={(e) =>
            setForm({ ...form, discountType: e.target.value })
          }
        >
          <option value="percentage">Percentage (%)</option>
          <option value="flat">Flat (₹)</option>
        </select>

        <input
          type="number"
          placeholder="Discount Value"
          value={form.discountValue}
          required
          onChange={(e) =>
            setForm({ ...form, discountValue: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Minimum Order Amount"
          value={form.minAmount}
          required
          onChange={(e) =>
            setForm({ ...form, minAmount: e.target.value })
          }
        />

        <input
          type="date"
          value={form.expiryDate}
          required
          onChange={(e) =>
            setForm({ ...form, expiryDate: e.target.value })
          }
        />

        <button type="submit">Add Offer</button>
      </form>

      {/* OFFER LIST */}
      <div className="offer-list">
        {offers.length === 0 ? (
          <p>No offers available</p>
        ) : (
          offers.map((offer) => (
            <div className="offer-card" key={offer._id}>
              <h3>{offer.code}</h3>
              <p>
                {offer.discountType === "percentage"
                  ? `${offer.discountValue}% OFF`
                  : `₹${offer.discountValue} OFF`}
              </p>
              <p>Min Order: ₹{offer.minAmount}</p>
              <p>
                Expires:{" "}
                {new Date(offer.expiryDate).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Offers;