// ===============================
// PAYMENT HANDLER (Frontend Only)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const bookingId = parseInt(params.get("bookingId"));

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    alert("Invalid booking. Redirecting...");
    window.location.href = "../dashboard/dashboard_renter.html";
    return;
  }

  // Calculate Final Cost
  let totalPrice = 0;

  if (booking.duration === "Hourly") {
    totalPrice = booking.price * 1;
  } else {
    totalPrice = booking.price * 8; // 8 hours assumed = 1 day
  }

  // Push values to UI
  document.getElementById("eqName").innerText = booking.equipmentName;
  document.getElementById("startDate").innerText = booking.startDate;
  document.getElementById("endDate").innerText = booking.endDate;
  document.getElementById("duration").innerText = booking.duration;
  document.getElementById(
    "rate"
  ).innerText = `₹${booking.price} / ${booking.duration}`;
  document.getElementById("totalPrice").innerText = `₹${totalPrice}`;
});

// ===============================
// SIMULATED PAYMENT PROCESS
// ===============================

function payNow() {
  const params = new URLSearchParams(window.location.search);
  const bookingId = parseInt(params.get("bookingId"));

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  let bookingIndex = bookings.findIndex((b) => b.id === bookingId);

  if (bookingIndex === -1) {
    alert("Error: Booking not found.");
    return;
  }

  // Update status to completed
  bookings[bookingIndex].status = "Completed";

  // Save back to localStorage
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("✅ Payment Successful! Booking moved to history.");

  // Redirect back to renter dashboard
  window.location.href = "../dashboard/dashboard_renter.html";
}
