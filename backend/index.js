const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// MongoDB connection
const mongoURL = "mongodb+srv://kalindu:kalindu@cluster0.cr4ym.mongodb.net/kalinduEcommerce?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    image: { type: String }
});

// User Model
const userModel = mongoose.model("users", userSchema);

// API routes
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Signup API
app.post("/signup", async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send({ message: "Passwords do not match", alert: false });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.send({ message: "Email id is already registered", alert: false });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userModel({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.send({ message: "Successfully signed up", alert: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "An error occurred", alert: false });
    }
});

// Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found", alert: false });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: "Invalid credentials", alert: false });
        }

        res.send({ message: "Login successful", alert: true });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send({ message: "An error occurred", alert: false });
    }
});

// Product Schema and Model
const schemaProduct = new mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

const productModel = mongoose.model("product", schemaProduct);

// Save product in database
app.post("/uploadProduct", async (req, res) => {
    console.log("uploadProduct API called");
    try {
        const data = new productModel(req.body);
        await data.save();
        res.send({ message: "Upload successfully" });
    } catch (err) {
        console.error("Error uploading product:", err);
        res.status(500).send({ message: "An error occurred" });
    }
});

// Fetch products
app.get("/product", async (req, res) => {
    try {
        const data = await productModel.find({});
        res.send(data);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send({ message: "An error occurred" });
    }
});

// Contact Schema and Model
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

// Save contact information
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact information saved successfully' });
    } catch (error) {
        console.error('Error saving contact information:', error);
        res.status(500).json({ error: 'An error occurred while saving the data' });
    }
});

// Server running
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
