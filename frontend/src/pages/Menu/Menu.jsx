import React, { useContext } from "react";
import "./Menu.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";

const Menu = () => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="menu-page">
      <h1 className="menu-title">Our Menu</h1>

      <div className="menu-grid">
        {food_list.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
