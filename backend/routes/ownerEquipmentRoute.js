/**const express = require("express");
const auth = require("middleware/authMiddleware");
const Equipment = require("../models/Equipment");

const router = express.Router();

// ✅ Add equipment (only logged-in owners)
router.post("/add", auth, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ msg: "Access denied. Only owners can add equipment." });
    }

    const { name, type, description, price, location } = req.body;

    const equipment = await Equipment.create({
      name,
      type,
      description,
      price,
      location,
      ownerId: req.user.id
    });

    res.json({ msg: "Equipment added successfully", equipment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;**/


const express = require("express");
const auth = require("middleware/authMiddleware");
const Equipment = require("../models/Equipment");

const router = express.Router();

// 🔹 Add new equipment (already discussed)
router.post("/add", auth, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ msg: "Only owners can add equipment." });
    }

    const { name, type, description, price, location } = req.body;

    const equipment = await Equipment.create({
      name,
      type,
      description,
      price,
      location,
      ownerId: req.user.id
    });

    res.json({ msg: "Equipment added successfully", equipment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 🔹 Get all equipment of logged-in owner
router.get("/owner", auth, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const equipment = await Equipment.findAll({
      where: { ownerId: req.user.id }
    });

    res.json(equipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

