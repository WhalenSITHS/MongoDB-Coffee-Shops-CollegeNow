# 📌 Express.js Controllers - A Complete Lesson

## **Lesson Objective**
By the end of this lesson, you will understand:
- What controllers are in Express.js.
- How to separate controllers from routes for better code organization.
- How to structure and implement controllers in an Express.js application.
- Best practices for using controllers in large-scale applications.

---

## **1️⃣ What are Controllers in Express.js?**
In Express.js, **controllers** are functions that handle incoming requests and generate responses. Instead of defining all logic in route files, we separate it into **controller files** to keep our code modular, maintainable, and reusable.

**Why use controllers?**
✅ **Separation of concerns** – Keeps route files clean.  
✅ **Code reusability** – Controllers can be reused across multiple routes.  
✅ **Scalability** – Easier to manage in large applications.  

---

## **2️⃣ Folder Structure for Controllers**
To implement controllers effectively, we use the following structure:

```
/my-express-app
│── /controllers
│   ├── userController.js
│   ├── productController.js
│── /routes
│   ├── users.js
│   ├── products.js
│── server.js
│── package.json
│── node_modules
```

- `/controllers` → Contains functions that handle business logic.
- `/routes` → Defines API endpoints and calls corresponding controller functions.

---

## **3️⃣ Setting Up Express.js**
If you haven't installed Express.js, initialize a project and install it:

```sh
npm init -y
npm install express
```

---

## **4️⃣ Creating a User Controller**
### **Step 1: Create a `controllers/userController.js` file**
```javascript
// controllers/userController.js
const getUsers = (req, res) => {
    res.json([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" }
    ]);
};

const getUserById = (req, res) => {
    const userId = req.params.id;
    res.json({ id: userId, name: `User ${userId}` });
};

const createUser = (req, res) => {
    const { name } = req.body;
    res.status(201).json({ message: "User created", user: { id: 3, name } });
};

module.exports = { getUsers, getUserById, createUser };
```

---

## **5️⃣ Using the Controller in Routes**
### **Step 2: Create a `routes/users.js` file**
```javascript
const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser } = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

module.exports = router;
```

---

## **6️⃣ Connecting Routes to `server.js`**
### **Step 3: Modify `server.js`**
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## **7️⃣ Testing the API**
Run the server:

```sh
node server.js
```

Use **Postman** or **cURL** to test the API.

```sh
curl -X GET http://localhost:3000/api/users
curl -X GET http://localhost:3000/api/users/1
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d '{"name": "Alice"}'
```

---

## **8️⃣ Creating a Product Controller**
### **Step 1: Create a `controllers/productController.js` file**
```javascript
const getProducts = (req, res) => {
    res.json([
        { id: 1, name: "Laptop", price: 1200 },
        { id: 2, name: "Phone", price: 800 }
    ]);
};

const getProductById = (req, res) => {
    const productId = req.params.id;
    res.json({ id: productId, name: `Product ${productId}` });
};

const createProduct = (req, res) => {
    const { name, price } = req.body;
    res.status(201).json({ message: "Product created", product: { id: 3, name, price } });
};

module.exports = { getProducts, getProductById, createProduct };
```

---

### **Step 2: Create a `routes/products.js` file**
```javascript
const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

module.exports = router;
```

---

### **Step 3: Import in `server.js`**
Modify `server.js` to include products:

```javascript
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);
```

Now:
- `GET /api/products` → Fetch all products.
- `GET /api/products/1` → Fetch a single product.
- `POST /api/products` → Create a product.

---

## **9️⃣ Best Practices for Using Controllers**
✔ **Keep controllers lightweight** – Only handle request processing, no business logic.  
✔ **Use services for complex operations** – Move logic to a `services` folder if needed.  
✔ **Validate inputs** – Use middleware like `express-validator`.  
✔ **Handle errors gracefully** – Use `try-catch` with error handling middleware.  

### **Example: Handling Errors in Controllers**
```javascript
const getUsers = async (req, res) => {
    try {
        const users = [{ id: 1, name: "John Doe" }];
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
};
```

---

## **🔟 Summary**
✅ **Controllers** separate request handling from route files.  
✅ **Routes** import controller functions and define API endpoints.  
✅ **Modular structure** improves maintainability and reusability.  
✅ **Best practices** include input validation, error handling, and services for complex logic.  

---

## **📌 Challenge**
1️⃣ Create a `/orders` controller with `getOrders()`, `getOrderById()`, and `createOrder()`.  
2️⃣ Set up `/api/orders` routes using `orders.js`.  
3️⃣ Test the API using Postman or `cURL`.  

🚀 **Happy Coding!** 🚀
