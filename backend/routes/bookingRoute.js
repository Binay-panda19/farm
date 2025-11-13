/**import express from "express";
import db from "../config/db.js"; // your MySQL connection file
import verifyToken from "../middleware/auth.js"; // JWT auth middleware

const router = express.Router();

// ✅ Create booking
router.post("/create", verifyToken, async (req, res) => {
  const { equipmentId, startDate, endDate, duration } = req.body;
  const renterId = req.user.id; // from JWT payload

  if (!equipmentId || !startDate || !endDate || !duration) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const [equipment] = await db.query(
      "SELECT * FROM equipment WHERE id = ?",
      [equipmentId]
    );

    if (!equipment.length) {
      return res.status(404).json({ msg: "Equipment not found" });
    }

    await db.query(
      "INSERT INTO bookings (equipment_id, renter_id, start_date, end_date, duration, status) VALUES (?, ?, ?, ?, ?, ?)",
      [equipmentId, renterId, startDate, endDate, duration, "Pending"]
    );

    res.json({ msg: "Booking created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Database error while creating booking" });
  }
});

export default router;**/

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// Create a new booking
router.post("/create", auth, async (req, res) => {
  try {
    const { equipmentId, startDate, endDate, duration } = req.body;

    if (!equipmentId || !startDate || !endDate || !duration) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const booking = await Booking.create({
      equipmentId,
      userId: req.user.id,
      startDate,
      endDate,
      duration,
    });

    res.json({ msg: "Booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
