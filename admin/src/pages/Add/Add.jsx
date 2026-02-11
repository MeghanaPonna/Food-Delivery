// // import React, { useState } from "react";
// // import "./Add.css";
// // import { assets } from "../../assets/assets";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useContext } from "react";
// // import { StoreContext } from "../../context/StoreContext";
// // import { useEffect } from "react";
// // import {useNavigate } from "react-router-dom";

// // const Add = ({url}) => {
// //   const navigate=useNavigate();
// //   const {token,admin} = useContext(StoreContext);
// //   const [image, setImage] = useState(false);
// //   const [data, setData] = useState({
// //     name: "",
// //     description: "",
// //     price: "",
// //     category: "Salad",
// //   });

// //   const onChangeHandler = (event) => {
// //     const name = event.target.name;
// //     const value = event.target.value;
// //     setData((data) => ({ ...data, [name]: value }));
// //   };

// //   const onSubmitHandler = async (event) => {
// //     event.preventDefault();
// //     const formData = new FormData();
// //     formData.append("name", data.name);
// //     formData.append("description", data.description);
// //     formData.append("price", Number(data.price));
// //     formData.append("category", data.category);
// //     formData.append("image", image);

// //     // const response = await axios.post(`${url}/api/food/add`, formData,
// //     //   // {headers:{token}}
// //     // );
// //     const response = await axios.post(
// //       `${url}/api/food/add`,
// //       formData,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );
// //     if (response.data.success) {
// //       setData({
// //         name: "",
// //         description: "",
// //         price: "",
// //         category: "Salad",
// //       });
// //       setImage(false);
// //       toast.success(response.data.message);
// //     } else {
// //       toast.error(response.data.message);
// //     }
// //   };
// //   // useEffect(()=>{
// //   //   if(!admin && !token){
// //   //     toast.error("Please Login First");
// //   //      navigate("/");
// //   //   }
// //   // },[])
// //   return (
// //     <div className="add">
// //       <form onSubmit={onSubmitHandler} className="flex-col">
// //         <div className="add-img-upload flex-col">
// //           <p>Upload image</p>
// //           <label htmlFor="image">
// //             <img
// //               src={image ? URL.createObjectURL(image) : assets.upload_area}
// //               alt=""
// //             />
// //           </label>
// //           <input
// //             onChange={(e) => setImage(e.target.files[0])}
// //             type="file"
// //             id="image"
// //             hidden
// //             required
// //           />
// //         </div>
// //         <div className="add-product-name flex-col">
// //           <p>Product name</p>
// //           <input
// //             onChange={onChangeHandler}
// //             value={data.name}
// //             type="text"
// //             name="name"
// //             placeholder="Type here"
// //             required
// //           />
// //         </div>
// //         <div className="add-product-description flex-col">
// //           <p>Product description</p>
// //           <textarea
// //             onChange={onChangeHandler}
// //             value={data.description}
// //             name="description"
// //             rows="6"
// //             placeholder="Write content here"
// //             required
// //           ></textarea>
// //         </div>
// //         <div className="add-category-price">
// //           <div className="add-category flex-col">
// //             <p>Product category</p>
// //             <select
// //               name="category"
// //               required
// //               onChange={onChangeHandler}
// //               value={data.category}
// //             >
// //               <option value="Salad">Salad</option>
// //               <option value="Rolls">Rolls</option>
// //               <option value="Deserts">Deserts</option>
// //               <option value="Sandwich">Sandwich</option>
// //               <option value="Cake">Cake</option>
// //               <option value="Pure Veg">Pure Veg</option>
// //               <option value="Pasta">Pasta</option>
// //               <option value="Noodles">Noodles</option>
// //             </select>
// //           </div>
// //           <div className="add-price flex-col">
// //             <p>Product price</p>
// //             <input
// //               onChange={onChangeHandler}
// //               value={data.price}
// //               type="Number"
// //               name="price"
// //               placeholder="$20"
// //               required
// //             />
// //           </div>
// //         </div>
// //         <button type="submit" className="add-btn">
// //           ADD
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Add;

// import React, { useState, useContext, useEffect } from "react";
// import "./Add.css";
// import { assets } from "../../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const Add = ({ url }) => {
//   const navigate = useNavigate();
//   const { token, admin } = useContext(StoreContext);

//   const [image, setImage] = useState(null);
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Salad",
//   });

//   /* ---------------- AUTH GUARD ---------------- */
//   useEffect(() => {
//     if (!token || !admin) {
//       toast.error("Admin access required");
//       navigate("/");
//     }
//   }, [token, admin, navigate]);

//   /* ---------------- INPUT HANDLER ---------------- */
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       toast.error("Please upload a product image");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("description", data.description);
//       formData.append("price", Number(data.price));
//       formData.append("category", data.category);
//       formData.append("image", image);

//       const res = await axios.post(`${url}/api/food/add`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.data.success) {
//         toast.success("Product added successfully");
//         setData({
//           name: "",
//           description: "",
//           price: "",
//           category: "Salad",
//         });
//         setImage(null);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (err) {
//       toast.error("Server error");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="add-page">
//       {/* PAGE HEADER */}
//       <div className="page-header">
//         <h1>Add Product</h1>
//         <p>Create and publish a new food item for your store</p>
//       </div>

//       {/* CARD */}
//       <div className="add-card">
//         <form className="add-form" onSubmit={onSubmitHandler}>
//           {/* SECTION: MEDIA */}
//           <div className="form-section">
//             <h3>Product Image</h3>
//             <p className="section-desc">
//               Upload a clear image to represent the product
//             </p>

//             <div className="image-upload">
//               <label htmlFor="image">
//                 <img
//                   src={
//                     image ? URL.createObjectURL(image) : assets.upload_area
//                   }
//                   alt="upload"
//                 />
//                 <span>Click to upload image</span>
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 hidden
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//             </div>
//           </div>

//           {/* SECTION: DETAILS */}
//           <div className="form-section">
//             <h3>Product Details</h3>

//             <div className="form-group">
//               <label>Product Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Eg: Veg Pizza"
//                 value={data.name}
//                 onChange={onChangeHandler}
//                 required
//               />
//               <small>This will be shown to customers</small>
//             </div>

//             <div className="form-group">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 rows="4"
//                 placeholder="Short product description"
//                 value={data.description}
//                 onChange={onChangeHandler}
//                 required
//               />
//               <small>Briefly describe the product</small>
//             </div>
//           </div>

//           {/* SECTION: PRICING */}
//           <div className="form-section">
//             <h3>Category & Pricing</h3>

//             <div className="grid-2">
//               <div className="form-group">
//                 <label>Category</label>
//                 <select
//                   name="category"
//                   value={data.category}
//                   onChange={onChangeHandler}
//                 >
//                   <option>Salad</option>
//                   <option>Rolls</option>
//                   <option>Deserts</option>
//                   <option>Sandwich</option>
//                   <option>Cake</option>
//                   <option>Pure Veg</option>
//                   <option>Pasta</option>
//                   <option>Noodles</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label>Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="₹200"
//                   value={data.price}
//                   onChange={onChangeHandler}
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* ACTIONS */}
//           <div className="form-actions">
//             <button
//               type="button"
//               className="btn-secondary"
//               onClick={() => navigate("/list")}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="btn-primary">
//               Save Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Add;

import React, { useState, useContext, useEffect } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Add = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
    discount: "",
    prepTime: "",
    foodType: "Veg",
    available: true,
  });

  /* -------- AUTH -------- */
  useEffect(() => {
    if (!token || !admin) {
      toast.error("Admin access required");
      navigate("/");
    }
  }, [token, admin, navigate]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) =>
        formData.append(key, data[key])
      );
      formData.append("image", image);

      const res = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        toast.success("Product added successfully");
        navigate("/list");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="add-page">
      {/* HEADER */}
      <div className="add-header">
        <h1>Add Product</h1>
        <p>Manage menu items for your restaurant</p>
      </div>

      <form className="add-card" onSubmit={onSubmit}>
        {/* IMAGE */}
        <section>
          <h3>Product Image</h3>
          <p className="hint">Recommended size: 1:1 square</p>

          <label className="image-box">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
            <span>Click to upload</span>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </section>

        {/* DETAILS */}
        <section>
          <h3>Basic Details</h3>

          <div className="field">
            <label>Product Name</label>
            <input
              name="name"
              placeholder="Eg: Paneer Butter Masala"
              value={data.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Short description shown to customers"
              value={data.description}
              onChange={onChange}
              required
            />
          </div>
        </section>

        {/* CATEGORY & PRICING */}
        <section>
          <h3>Category & Pricing</h3>

          <div className="grid-3">
            <div className="field">
              <label>Category</label>
              <select name="category" value={data.category} onChange={onChange}>
                <option>Salad</option>
                <option>Rolls</option>
                <option>Sandwich</option>
                <option>Pizza</option>
                <option>Cake</option>
                <option>Noodles</option>
                <option>Pasta</option>
                <option>Pure Veg</option>
                
              </select>
            </div>

            <div className="field">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={onChange}
                required
              />
            </div>

            <div className="field">
              <label>Discount %</label>
              <input
                type="number"
                name="discount"
                value={data.discount}
                onChange={onChange}
                placeholder="Optional"
              />
            </div>
          </div>
        </section>

        {/* EXTRA INFO */}
        <section>
          <h3>Additional Info</h3>

          <div className="grid-3">
            <div className="field">
              <label>Food Type</label>
              <select name="foodType" value={data.foodType} onChange={onChange}>
                <option>Veg</option>
                <option>Non-Veg</option>
              </select>
            </div>

            <div className="field">
              <label>Prep Time (mins)</label>
              <input
                type="number"
                name="prepTime"
                value={data.prepTime}
                onChange={onChange}
                placeholder="Eg: 15"
              />
            </div>

            <div className="toggle">
              <label>Available</label>
              <input
                type="checkbox"
                name="available"
                checked={data.available}
                onChange={onChange}
              />
            </div>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="actions">
          <button type="button" className="btn ghost" onClick={() => navigate("/list")}>
            Cancel
          </button>
          <button type="submit" className="btn primary">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
