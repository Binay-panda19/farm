const sequelize = require("./backend/config/db");
const User = require("models/User");
const Equipment = require("./backend/models/Equipment");
const Booking = require("./backend/models/Booking");

sequelize.sync({ alter: true }) // create tables if not exist
  .then(() => console.log("✅ Database & tables synced"))
  .catch(err => console.error(err));




const express = require("express");
const cors = require("cors");
const sequelize = require("./backend/config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/equipment", require("./routes/equipment"));
app.use("/api/booking", require("./routes/booking"));
 app.use("/api/payment", require("./routes/payment"));
 app.use("/api/admin", require("./routes/admin"));

// Sync DB
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


/**const equipmentRoutes = require("./routes/equipment");

app.use("/api/equipment", equipmentRoutes);

const bookingRoutes = require("./routes/booking");
app.use("/api/bookings", bookingRoutes);**/


