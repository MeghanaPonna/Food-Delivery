# 🍔 Food Delivery System

A **full-stack MERN Food Delivery application** that allows users to browse food items, add them to cart, apply coupons, place orders, and complete payments securely using **Stripe**.

The system also includes an **Admin Panel** for managing food items, orders, and offers.

---

# 🚀 Features

### 👤 User Side

* Browse food menu
* Filter by categories
* Add / remove items from cart
* Apply **coupon codes**
* Secure **Stripe payment integration**
* Checkout with delivery information
* View order history

### 🛒 Cart System

* Dynamic cart updates
* Automatic total calculation
* Delivery fee calculation
* Coupon discount support

### 💳 Payment

* Integrated **Stripe Payment Gateway**
* Secure checkout
* Payment session handling

### 🎟 Coupon System

* Apply promo codes
* Discount calculation
* Validations for invalid coupons

### 🧑‍💼 Admin Panel

Admin dashboard for managing the platform.

Admin can:

* Add new food items
* View food list
* Manage orders
* Update order status
* Manage coupons/offers

---

# 🏗️ Tech Stack

### Frontend

* React.js
* React Router
* Context API
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Payment

* Stripe API

### Authentication

* JWT Authentication
* Protected APIs

---

# 📂 Project Structure

```
Food-Delivery
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   └── App.jsx
│
├── admin
│   ├── components
│   ├── pages
│   └── App.jsx
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/MeghanaPonna/Food-Delivery.git
```

---

# ▶️ Running the Project

### 1️⃣ Start Backend

```bash
cd backend
npm install
npm run server
```

---

### 2️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 3️⃣ Start Admin Panel

```bash
cd admin
npm install
npm run dev
```

---

# 🔐 Environment Variables

Create `.env` file inside **backend**

Example:

```
JWT_SECRET=your_jwt_secret_key
SALT=10
MONGO_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

# 🎯 Key Functionalities

✔ Authentication with JWT
✔ Stripe payment integration
✔ Coupon discount system
✔ Cart synchronization
✔ Admin order management
✔ Secure backend APIs

---

# 📈 Future Improvements

* Real-time order tracking
* Email notifications
* Rating & reviews
* Delivery partner module
* Mobile responsive improvements

---

# 👩‍💻 Author

**Meghana Ponna**

GitHub
[https://github.com/MeghanaPonna](https://github.com/MeghanaPonna)

---

# ⭐ If you like this project

Give the repository a ⭐ on GitHub!