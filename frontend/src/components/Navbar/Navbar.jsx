import { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar">
      {/* LOGO */}
      <Link to="/">
        <img src={assets.logo} alt="Tomato" className="logo" />
      </Link>

      {/* NAV LINKS */}
      <ul className="navbar-menu">
        <li
          className={isActive("/") ? "active" : ""}
          onClick={() => navigate("/")}
        >
          Home
        </li>

        <li
          className={isActive("/menu") ? "active" : ""}
          onClick={() => navigate("/menu")}
        >
          Menu
        </li>

        <li
          className={isActive("/offers") ? "active" : ""}
          onClick={() => navigate("/offers")}
        >
          Offers
        </li>

        {token && (
          <li
            className={isActive("/myorders") ? "active" : ""}
            onClick={() => navigate("/myorders")}
          >
            My Orders
          </li>
        )}
      </ul>

      {/* RIGHT SIDE */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              {/* <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>My Orders</p>
              </li> */}
              {/* <hr /> */}
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
