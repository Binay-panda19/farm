require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/equipment", require("./routes/equipment"));
app.use("/api/booking", require("./routes/booking"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/admin", require("./routes/admin"));

// Sync
sequelize.sync({ alter: true })
  .then(() => console.log("✅ DB synced"))
  .catch(err => console.error("❌ Sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
