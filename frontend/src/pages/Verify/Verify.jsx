// // // // import React, { useContext, useEffect } from 'react'
// // // // import './Verify.css'
// // // // import { useNavigate, useSearchParams } from 'react-router-dom'
// // // // import { StoreContext } from '../../context/StoreContext';
// // // // import axios from 'axios';
// // // // import { toast } from "react-toastify";

// // // // const Verify = () => {
// // // //     const [searchParams,setSearchParams]=useSearchParams();
// // // //     const success=searchParams.get("success");
// // // //     const orderId=searchParams.get("orderId");
// // // //     const {url} =useContext(StoreContext);
// // // //     const navigate= useNavigate();

// // // //     const verifyPayment=async()=>{
// // // //         const response= await axios.post(url+"/api/order/verify",{success,orderId});
// // // //         if(response.data.success){
// // // //             navigate("/myorders");
// // // //             toast.success("Order Placed Successfully");
// // // //         }else{
// // // //             toast.error("Something went wrong");
// // // //             navigate("/");
// // // //         }
// // // //     }
// // // //     useEffect(()=>{
// // // //         verifyPayment();
// // // //     },[])
// // // //   return (
// // // //     <div className='verify'>
// // // //         <div className="spinner"></div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default Verify


// // // import React, { useContext, useEffect } from "react";
// // // import "./Verify.css";
// // // import { useNavigate, useSearchParams } from "react-router-dom";
// // // import { StoreContext } from "../../context/StoreContext";
// // // import axios from "axios";
// // // import { toast } from "react-toastify";

// // // const Verify = () => {
// // //   const [searchParams] = useSearchParams();
// // //   const session_id = searchParams.get("session_id");

// // //   const { url } = useContext(StoreContext);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const verifyPayment = async () => {
// // //       if (!session_id) {
// // //         toast.error("Invalid payment session");
// // //         navigate("/");
// // //         return;
// // //       }

// // //       try {
// // //         const res = await axios.get(
// // //           `${url}/api/order/verify?session_id=${session_id}`
// // //         );

// // //         if (res.data.success) {
// // //           toast.success("Order placed successfully");
// // //           navigate("/myorders");
// // //         } else {
// // //           toast.error("Payment verification failed");
// // //           navigate("/");
// // //         }
// // //       } catch (error) {
// // //         toast.error("Server error while verifying payment");
// // //         navigate("/");
// // //       }
// // //     };

// // //     verifyPayment();
// // //   }, []);

// // //   return (
// // //     <div className="verify">
// // //       <div className="spinner"></div>
// // //     </div>
// // //   );
// // // };

// // // export default Verify;




// // import React, { useEffect, useContext } from "react";
// // import "./Verify.css";
// // import { useNavigate, useSearchParams } from "react-router-dom";
// // import { StoreContext } from "../../context/StoreContext";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const Verify = () => {
// //   const [searchParams] = useSearchParams();
// //   const session_id = searchParams.get("session_id");
// //   const { url } = useContext(StoreContext);
// //   const navigate = useNavigate();

// //   const verifyPayment = async () => {
// //     if (!session_id) {
// //       toast.error("Invalid payment session");
// //       navigate("/");
// //       return;
// //     }

// //     try {
// //       const res = await axios.post(`${url}/api/order/verify`, {
// //         session_id,
// //       });

// //       if (res.data.success) {
// //         toast.success("Order placed successfully");
// //         navigate("/myorders");
// //       } else {
// //         toast.error("Payment verification failed");
// //         navigate("/");
// //       }
// //     } catch (err) {
// //       console.error("Verify error:", err);
// //       toast.error("Payment verification failed");
// //       navigate("/");
// //     }
// //   };

// //   useEffect(() => {
// //     verifyPayment();
// //   }, []);

// //   return (
// //     <div className="verify">
// //       <div className="spinner"></div>
// //     </div>
// //   );
// // };

// // export default Verify;



// import React, { useEffect, useContext } from "react";
// import "./Verify.css";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Verify = () => {
//   const [searchParams] = useSearchParams();
//   const session_id = searchParams.get("session_id");
//   const { url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       if (!session_id) {
//         toast.error("Invalid payment session");
//         navigate("/");
//         return;
//       }

//       try {
//         const res = await axios.get(
//           `${url}/api/order/verify?session_id=${session_id}`
//         );

//         if (res.data.success) {
//           toast.success("Order placed successfully 🎉");
//           navigate("/myorders");
//         } else {
//           toast.error("Payment verification failed");
//           navigate("/cart");
//         }
//       } catch (err) {
//         console.error("Verify error:", err);
//         toast.error("Payment verification failed");
//         navigate("/cart");
//       }
//     };

//     verifyPayment();
//   }, [navigate, session_id, url]);

//   return (
//     <div className="verify">
//       <div className="spinner"></div>
//     </div>
//   );
// };

// export default Verify;



import React, { useEffect, useContext } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!session_id) {
        toast.error("Invalid payment session");
        navigate("/cart");
        return;
      }

      try {
        const res = await axios.get(
          `${url}/api/order/verify?session_id=${session_id}`
        );

        if (res.data.success) {
          toast.success("Order placed successfully 🎉");
          navigate("/myorders");
        } else {
          toast.error("Payment verification failed");
          navigate("/cart");
        }
      } catch (error) {
        toast.error("Payment verification failed");
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [navigate, session_id, url]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;