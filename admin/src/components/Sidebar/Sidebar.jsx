// import React from 'react'
// import './Sidebar.css'
// import { assets } from '../../assets/assets'
// import { NavLink } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//       <div className="sidebar-options">
//         <NavLink to='add' className="sidebar-option">
//           <img src={assets.add_icon} alt="" />
//           <p>Add Items</p>
//         </NavLink>
//         <NavLink to='list' className="sidebar-option">
//           <img src={assets.order_icon} alt="" />
//           <p>List Items</p>
//         </NavLink>
//         <NavLink to='orders' className="sidebar-option">
//           <img src={assets.order_icon} alt="" />
//           <p>Orders</p>
//         </NavLink>
//       </div>
//     </div>
//   )
// }

// export default Sidebar


import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">

        <NavLink to="add" className="sidebar-option">
          <img src={assets.add_icon} alt="add" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to="list" className="sidebar-option">
          <img src={assets.order_icon} alt="list" />
          <p>List Items</p>
        </NavLink>

        <NavLink to="orders" className="sidebar-option">
          <img src={assets.order_icon} alt="orders" />
          <p>Orders</p>
        </NavLink>

        {/* ✅ NEW OFFERS LINK */}
        <NavLink to="offers" className="sidebar-option">
          <img src={assets.offer_icon} alt="offers" />
          <p>Offers</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;