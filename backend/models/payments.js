const express = require("express");
const auth = require("./middleware/authMiddleware");
const Razorpay = require("razorpay");
const Booking = require("../models/Booking");

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET"
});

// 🔹 Create an order
router.post("/create-order", auth, async (req, res) => {
  try {
    if (req.user.role !== "renter") {
      return res.status(403).json({ msg: "Only renters can make payments" });
    }

    const { bookingId, amount } = req.body;

    // Verify booking exists
    const booking = await Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${bookingId}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// 🔹 Verify payment
router.post("/verify", auth, async (req, res) => {
  try {
    const { bookingId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    // Here you can verify signature for security (optional)
    // Save payment info in Booking
    const booking = await Booking.findByPk(bookingId);
    booking.status = "Confirmed";
    booking.paymentId = razorpayPaymentId;
    await booking.save();

    res.json({ msg: "Payment successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Payment verification failed" });
  }
});

module.exports = router;
