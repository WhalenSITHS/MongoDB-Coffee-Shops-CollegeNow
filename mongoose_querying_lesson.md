# 📚 Lesson: Querying & Filtering Data in Mongoose

## 🎯 Objective
By the end of this lesson, students will be able to:
- Perform **sorting, filtering, pagination, and search** using Mongoose.
- Optimize queries for better performance.
- Build an **Express API** that supports these features.

---

## 🏗 1. Setting Up the Project
Before we start, ensure you have:
- **Node.js** and **MongoDB** installed.
- A **basic Express.js API** setup with Mongoose.

If you don’t have a setup, create a simple Express server:
```bash
mkdir mongoose-querying && cd mongoose-querying
npm init -y
npm install express mongoose dotenv
```

Create an `index.js` file and set up Express:
```js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"));

app.listen(5000, () => console.log("Server running on port 5000"));
```

Add your **MongoDB URI** to `.env`:
```
MONGO_URI=mongodb://localhost:27017/mystore
```

---

## 📌 2. Creating a Sample Model
Let’s create a `Product` model with some properties:

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  inStock: Boolean,
  rating: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
```

---

## 🔎 3. Querying Data: Filtering
Mongoose lets you **filter data** based on request parameters.

### 🛠 Example Route: Filtering by Category and Stock
```js
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    let query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.inStock) {
      query.inStock = req.query.inStock === "true";
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

### 🔗 Test with Postman
GET `/products?category=electronics&inStock=true`

---

## 🔢 4. Sorting Data
Sorting helps organize data in ascending (`1`) or descending (`-1`) order.

### 🛠 Example Route: Sorting by Price or Rating
```js
router.get("/products", async (req, res) => {
  try {
    let query = {};
    
    if (req.query.category) {
      query.category = req.query.category;
    }

    let sortOption = {};
    if (req.query.sortBy) {
      const sortField = req.query.sortBy;
      const sortOrder = req.query.order === "desc" ? -1 : 1;
      sortOption[sortField] = sortOrder;
    }

    const products = await Product.find(query).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

### 🔗 Test Sorting
GET `/products?sortBy=price&order=asc`

---

## 🔍 5. Searching Products
Users might want to search for products by **name**.

### 🛠 Example Route: Search by Name
```js
router.get("/products", async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

### 🔗 Test Searching
GET `/products?search=iphone`

---

## 📌 6. Pagination (Handling Large Data Sets)
Pagination helps limit responses when handling large datasets.

### 🛠 Example Route: Paginate Results
```js
router.get("/products", async (req, res) => {
  try {
    let query = {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

### 🔗 Test Pagination
GET `/products?page=2&limit=3`

---

## 🚀 Final Optimized Route: Combining Everything
```js
router.get("/products", async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.inStock) {
      query.inStock = req.query.inStock === "true";
    }

    const sortField = req.query.sortBy || "price";
    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const sortOption = { [sortField]: sortOrder };

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const products = await Product.find(query).sort(sortOption).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

---

## 🎯 Lesson Recap
✅ **Filtering**: `/products?category=electronics&inStock=true`  
✅ **Sorting**: `/products?sortBy=price&order=desc`  
✅ **Searching**: `/products?search=phone`  
✅ **Pagination**: `/products?page=2&limit=5`

---

## 🏆 Homework
1. Add a **rating** filter (`minRating` query parameter).
2. Implement an **"OR"** filter for multiple categories.
3. Add a **price range filter** (`minPrice` and `maxPrice`).

Let me know if you need solutions! 🚀🔥
