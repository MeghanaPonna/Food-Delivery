// // import React, { useEffect, useState } from "react";
// // import "./List.css";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useContext } from "react";
// // import { StoreContext } from "../../context/StoreContext";
// // import { useNavigate } from "react-router-dom";

// // const List = ({ url }) => {
// //   const navigate = useNavigate();
// //   const { token,admin } = useContext(StoreContext);
// //   const [list, setList] = useState([]);

// //   const fetchList = async () => {
// //     const response = await axios.get(`${url}/api/food/list`);
// //     if (response.data.success) {
// //       setList(response.data.data);
// //     } else {
// //       toast.error("Error");
// //     }
// //   };

// //   const removeFood = async (foodId) => {
// //     const response = await axios.post(
// //       `${url}/api/food/remove`,
// //       { id: foodId },
// //       { headers: { token } }
// //     );
// //     await fetchList();
// //     if (response.data.success) {
// //       toast.success(response.data.message);
// //     } else {
// //       toast.error("Error");
// //     }
// //   };
// //   useEffect(() => {
// //     if (!admin && !token) {
// //       toast.error("Please Login First");
// //       navigate("/");
// //     }
// //     fetchList();
// //   }, []);

// //   return (
// //     <div className="list add flex-col">
// //       <p>All Food List</p>
// //       <div className="list-table">
// //         <div className="list-table-format title">
// //           <b>Image</b>
// //           <b>Name</b>
// //           <b>Category</b>
// //           <b>Price</b>
// //           <b>Action</b>
// //         </div>
// //         {list.map((item, index) => {
// //           return (
// //             <div key={index} className="list-table-format">
// //               <img src={`${url}/images/` + item.image} alt="" />
// //               <p>{item.name}</p>
// //               <p>{item.category}</p>
// //               <p>${item.price}</p>
// //               <p onClick={() => removeFood(item._id)} className="cursor">
// //                 X
// //               </p>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default List;
// import React, { useEffect, useState, useContext } from "react";
// import "./List.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";

// const List = ({ url }) => {
//   const navigate = useNavigate();
//   const { token, admin } = useContext(StoreContext);
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const res = await axios.get(`${url}/api/food/list`);
//       if (res.data.success) {
//         setList(res.data.data);
//       }
//     } catch (err) {
//       toast.error("Failed to load food list");
//     }
//   };

//   // const removeFood = async (foodId) => {
//   //   try {
//   //     const res = await axios.post(
//   //       `${url}/api/food/remove`,
//   //       { id: foodId },
//   //       { headers: { token } }
//   //     );

//   //     if (res.data.success) {
//   //       toast.success(res.data.message);
//   //       fetchList();
//   //     } else {
//   //       toast.error(res.data.message);
//   //     }
//   //   } catch (err) {
//   //     toast.error("Unauthorized or server error");
//   //   }
//   // };
//   const removeFood = async (foodId) => {
//   try {
//     const res = await axios.post(
//       `${url}/api/food/remove`,
//       { id: foodId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (res.data.success) {
//       toast.success(res.data.message);
//       fetchList();
//     } else {
//       toast.error(res.data.message);
//     }
//   } catch (err) {
//     toast.error("Unauthorized or server error");
//     console.error(err);
//   }
// };


//   useEffect(() => {
//     if (!token || !admin) {
//       toast.error("Admin login required");
//       navigate("/");
//       return;
//     }
//     fetchList();
//   }, [token, admin]);

//   return (
//     <div className="list add flex-col">
//       <p>All Food List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>

//         {list.map((item) => (
//           <div key={item._id} className="list-table-format">
//             <img src={`${url}/images/${item.image}`} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>${item.price}</p>
//             <p
//               onClick={() => removeFood(item._id)}
//               className="cursor"
//               style={{ color: "red", fontWeight: "bold" }}
//             >
//               X
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default List;
import React, { useEffect, useState, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const List = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setList(res.data.data);
      }
    } catch {
      toast.error("Failed to load food list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const res = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Unauthorized or server error");
    }
  };

  useEffect(() => {
    if (!token || !admin) {
      toast.error("Admin login required");
      navigate("/");
      return;
    }
    fetchList();
  }, [token, admin]);

  return (
    <div className="list-page">
      {/* HEADER */}
      <div className="list-header">
        <h1>All Food Items</h1>
        <p>Manage your restaurant menu</p>
      </div>

      {/* TABLE */}
      <div className="list-card">
        <div className="list-row list-head">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {list.map((item) => (
          <div key={item._id} className="list-row">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <span className="name">{item.name}</span>
            <span className="category">{item.category}</span>
            <span className="price">₹{item.price}</span>
            {/* <button
              className="delete-btn"
              onClick={() => removeFood(item._id)}
            >
              ✕
            </button> */}
            <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Remove this item?")) {
                    removeFood(item._id);
                  }
                }}
                aria-label="Remove item"
              >
                🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

