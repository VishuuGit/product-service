require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);

const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Product Service connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Product Service running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
