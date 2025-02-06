# 📌 Express.js Middleware - A Complete Lesson

## **Lesson Objective**
By the end of this lesson, you will understand:
- What middleware is in Express.js.
- The different types of middleware.
- How to create and use middleware functions.
- How to structure middleware in an Express.js application.
- Best practices for using middleware effectively.

---

## **1️⃣ What is Middleware in Express.js?**
Middleware in Express.js is a **function** that has access to the **request (`req`)**, **response (`res`)**, and **next (`next`)** function in an application’s request-response cycle.

Middleware functions can:
✅ Modify the request (`req`) and response (`res`) objects.  
✅ Execute any code before passing control to the next middleware.  
✅ End the request-response cycle if needed.  
✅ Call `next()` to pass control to the next middleware in the stack.

### **Basic Syntax**
```javascript
app.use((req, res, next) => {
    console.log('Middleware executed');
    next(); // Pass control to the next handler
});
```

---

## **2️⃣ Types of Middleware**
Express.js provides several types of middleware:

1. **Application-Level Middleware** – Defined at the app level using `app.use()`.
2. **Router-Level Middleware** – Used with Express Router.
3. **Built-in Middleware** – Provided by Express (e.g., `express.json()`).
4. **Third-Party Middleware** – Middleware like `cors`, `helmet`, etc.
5. **Error-Handling Middleware** – Used for centralized error handling.

---

## **3️⃣ Setting Up Express.js**
First, install Express.js if you haven’t already:

```sh
npm init -y
npm install express
```

---

## **4️⃣ Creating a Basic Middleware**
### **Example: Logging Middleware**
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware function
const logger = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // Pass control to the next middleware or route
};

// Use middleware globally
app.use(logger);

app.get('/', (req, res) => {
    res.send('Welcome to Express.js Middleware!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## **5️⃣ Application-Level Middleware**
### **Example: Adding Timestamp to Requests**
```javascript
const requestTime = (req, res, next) => {
    req.requestTime = new Date();
    next();
};

app.use(requestTime);

app.get('/time', (req, res) => {
    res.send(`Request received at: ${req.requestTime}`);
});
```

---

## **6️⃣ Router-Level Middleware**
### **Example: Middleware for User Routes**
```javascript
const express = require('express');
const router = express.Router();

// Middleware specific to user routes
const userLogger = (req, res, next) => {
    console.log(`User Route Accessed: ${req.method} ${req.url}`);
    next();
};

router.use(userLogger);

router.get('/', (req, res) => {
    res.send('User List');
});

module.exports = router;
```

---

## **7️⃣ Built-in Middleware in Express.js**
### **1. `express.json()` - Parses JSON request bodies**
```javascript
app.use(express.json());
```

### **2. `express.urlencoded()` - Parses URL-encoded request bodies**
```javascript
app.use(express.urlencoded({ extended: true }));
```

### **3. `express.static()` - Serves static files**
```javascript
app.use(express.static('public'));
```

---

## **8️⃣ Third-Party Middleware**
### **1. CORS Middleware (`cors`)**
```sh
npm install cors
```

```javascript
const cors = require('cors');
app.use(cors());
```

### **2. Security Middleware (`helmet`)**
```sh
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## **9️⃣ Error-Handling Middleware**
### **Example: Custom Error Handler**
```javascript
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Something went wrong!');
};

app.use(errorHandler);
```

---

## **🔟 Structuring Middleware in Large Applications**
### **Folder Structure**
```
/my-express-app
│── /middleware
│   ├── logger.js
│   ├── auth.js
│── /routes
│   ├── users.js
│── server.js
```

### **Example: Middleware in Separate Files**
#### **Create `middleware/logger.js`**
```javascript
const logger = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
};

module.exports = logger;
```

#### **Use in `server.js`**
```javascript
const logger = require('./middleware/logger');
app.use(logger);
```

---

## **✅ Summary**
✅ Middleware functions execute before sending a response.  
✅ Middleware can modify `req` and `res` objects.  
✅ Use **Application-Level Middleware** (`app.use()`) for global use.  
✅ Use **Router-Level Middleware** for specific routes.  
✅ Express provides **Built-in Middleware** like `express.json()`.  
✅ **Third-party Middleware** extends functionality (e.g., `cors`, `helmet`).  
✅ **Error-Handling Middleware** improves error responses.  
✅ Store middleware in separate files for better organization.

---

## **📌 Challenge**
1️⃣ Create an authentication middleware that checks if a request contains an API key.  
2️⃣ Use it on `/api/protected` to allow only requests with `?apikey=secret`.  
3️⃣ Test with Postman or cURL.  

🚀 **Happy Coding!** 🚀
