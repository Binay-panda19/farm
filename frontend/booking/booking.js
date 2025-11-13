/**document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Only renters can book
  if (!token || role !== "renter") {
    alert("Access denied. Please login as a renter.");
    window.location.href = "login.html";
    return;
  }

  // Get equipmentId from URL, e.g., booking.html?equipmentId=3
  const urlParams = new URLSearchParams(window.location.search);
  const equipmentId = urlParams.get("equipmentId");

  if (!equipmentId) {
    alert("No equipment selected.");
    window.location.href = "dashboard_renter.html";
    return;
  }

  const bookingForm = document.getElementById("bookingForm");

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const startDate = bookingForm.querySelector("input[name='start_date']").value;
    const endDate = bookingForm.querySelector("input[name='end_date']").value;
    const duration = bookingForm.querySelector("select[name='duration']").value;

    if (!startDate || !endDate || !duration) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          equipmentId,
          startDate,
          endDate,
          duration
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Booking successful!");
        window.location.href = "payment.html?equipmentId=" + equipmentId;
      } else {
        alert(data.msg || "Booking failed!");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error while creating booking.");
    }
  });
});**/

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Equipment = require("./Equipment");

const Booking = sequelize.define("Booking", {
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  duration: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "Pending" }
});

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Equipment.hasMany(Booking, { foreignKey: "equipmentId" });
Booking.belongsTo(Equipment, { foreignKey: "equipmentId" });

module.exports = Booking;

if (res.ok) {
  alert("Booking successful! Redirecting to payment...");
  window.location.href = `payment.html?amount=2000`; // pass amount dynamically later
}


