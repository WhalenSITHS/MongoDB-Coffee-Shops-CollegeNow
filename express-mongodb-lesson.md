# 📌 Setting Up MongoDB Cloud Database with Express.js

## **Lesson Objective**
By the end of this lesson, you will know how to:
- Set up a **MongoDB Atlas (cloud database)**.
- Connect your **Express.js** application to MongoDB.
- Perform basic database operations using **Mongoose**.

---

## **1️⃣ Setting Up MongoDB Atlas (Cloud Database)**

### **Step 1: Create a MongoDB Atlas Account**
1. Go to **[MongoDB Atlas](https://www.mongodb.com/atlas)**.
2. Sign up or log in.
3. Click **"Create a New Project"**, give it a name, and click **Create**.

### **Step 2: Create a Database Cluster**
1. Click **"Build a Database"**.
2. Select **"Shared" (free tier)** and click **Create**.
3. Choose a **cloud provider & region** (close to your users).
4. Choose a **cluster name** (e.g., `myCluster`).
5. Click **"Create Cluster"**.

### **Step 3: Set Up Database Access**
1. Under **"Database Access"**, click **"Add New Database User"**.
2. Create a **username & password** (save these!).
3. Set **"Database User Privileges"** to **"Read and Write"**.
4. Click **"Add User"**.

### **Step 4: Whitelist Your IP Address**
1. Under **"Network Access"**, click **"Add IP Address"**.
2. Choose **"Allow access from anywhere"** (`0.0.0.0/0`).
3. Click **"Confirm"**.

### **Step 5: Get the Connection String**
1. Go to **"Clusters" → "Connect"**.
2. Select **"Connect your application"**.
3. Copy the **MongoDB Connection String**, it should look like:

```
mongodb+srv://yourUsername:yourPassword@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

---

## **2️⃣ Install Mongoose in Your Express Project**
Mongoose is an **ODM (Object Data Modeling)** library for MongoDB.

Run this command in your project folder:

```sh
npm install mongoose
```

---

## **3️⃣ Connect Express.js to MongoDB Atlas**
Modify `server.js`:

```javascript
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // For storing secrets in .env file

const app = express();
const PORT = 3000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.get('/', (req, res) => {
    res.send('MongoDB Connection Successful!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## **4️⃣ Store MongoDB URI in an `.env` File**
To keep credentials secure, create a `.env` file:

```plaintext
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

Then, update `server.js` to use `dotenv`:

```javascript
require('dotenv').config();
```

Run the server:

```sh
node server.js
```

---

## **5️⃣ Creating a Mongoose Model**
Create a `models/User.js` file:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

---

## **6️⃣ Adding Data to MongoDB**
Modify `server.js` to include a POST route:

```javascript
const User = require('./models/User');

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
```

Test with **Postman** or **cURL**:

```sh
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Alice", "email": "alice@example.com"}'
```

---

## **✅ Summary**
✅ **MongoDB Atlas** is a cloud-based database service.  
✅ **Mongoose** allows easy interaction with MongoDB.  
✅ Store the **connection string** securely in a `.env` file.  
✅ **Define models** using Mongoose schemas.  
✅ Use `async/await` to interact with the database.  

---

## **📌 Challenge**
1️⃣ Create a **Product** model (`name`, `price`).  
2️⃣ Add a `/products` **POST route** to store products.  
3️⃣ Add a `/products` **GET route** to retrieve all products.  
4️⃣ Test the API using Postman or cURL.  

🚀 **Happy Coding!** 🚀
