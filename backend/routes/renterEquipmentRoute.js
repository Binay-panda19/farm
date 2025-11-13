// 🔹 Get all available equipment for renters
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "renter") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const equipment = await Equipment.findAll(); // fetch all equipment

    res.json(equipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});
