//Youtube ref link : https://www.youtube.com/watch?v=_7UQPve99r4

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/Product.model.js");

const app = express();

app.use(express.json()); //middleware to read json because node js cannot read json directly

//create
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body); //it takes some time for database queries so we use async and await so that rest of operations continue
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//select or read multiple products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//read single product
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params; //Extract 'id' from the URL parameters
  const product = await Product.findById(id);
  res.status(200).json(product);
});

//update product

app.put("/api/products/:id", async (req, res) => {
  //we use put for update
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
mongoose
  .connect(
    "mongodb+srv://chandraprathith:8S4gIgOBDDKAzuGM@cluster0.dog5l.mongodb.net/LearnMongo?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database Connected");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(() => {
    console.log("Failed to Connect database ");
  });
app.get("/", (req, res) => {
  res.send("Hello from Prathith's first Node API ");
});
