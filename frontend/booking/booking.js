// ===========================
// EmailJS Settings
// ===========================
const SERVICE_ID = "service_pk6l53v";
const TEMPLATE_NOTIFY_OWNER = "template_qhuuqz5"; // booking arrived
const TEMPLATE_CONFIRM_RENTER = "template_qhuuqz5"; // same template
const TEMPLATE_APPROVED = "template_uhedfjc"; // billing

// 1️⃣ Notify OWNER (Booking request arrived)
function sendBookingRequestEmail(owner, renter, equipment, booking) {
  return emailjs.send(SERVICE_ID, TEMPLATE_NOTIFY_OWNER, {
    email: owner.email, // receiver email (owner)
    name: "Farmago", // sender name

    equipment_name: equipment.name,
    start_date: booking.startDate,
    end_date: booking.endDate,
    duration: booking.duration,
    total_price: booking.total_price,

    renter_name: renter.name,
    renter_email: renter.email,
    renter_phone: renter.phone || "N/A",
  });
}

// 2️⃣ Confirmation Email to RENTER
function sendBookingConfirmationEmail(renter, equipment, booking) {
  return emailjs.send(SERVICE_ID, TEMPLATE_CONFIRM_RENTER, {
    email: renter.email, // receiver email (renter)
    name: "Farmago",

    equipment_name: equipment.name,
    start_date: booking.startDate,
    end_date: booking.endDate,
    duration: booking.duration,
    total_price: booking.total_price,

    renter_name: renter.name,
    renter_email: renter.email,
    renter_phone: renter.phone || "N/A",
  });
}

// 3️⃣ Billing email when approved (Used later in owner dashboard)
function sendBookingApprovedEmail(renter, owner, equipment, booking) {
  return emailjs.send(SERVICE_ID, TEMPLATE_APPROVED, {
    email: renter.email, // Receiver
    name: "Farmago Billing", // sender

    equipment_name: equipment.name,
    start_date: booking.startDate,
    end_date: booking.endDate,
    duration: booking.duration,
    total_price: booking.total_price,

    owner_name: owner.name,
    owner_phone: owner.phone || "N/A",
  });
}

// ====================================================
// MAIN BOOKING SCRIPT
// ====================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  const urlParams = new URLSearchParams(window.location.search);
  const equipmentId = parseInt(urlParams.get("equipmentId"));

  if (!equipmentId) {
    alert("Invalid equipment selection.");
    window.location.href = "../equipment/equipment_list.html";
    return;
  }

  const equipmentList = JSON.parse(localStorage.getItem("equipment")) || [];
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!activeUser || activeUser.role !== "renter") {
    alert("Only renters can book equipment.");
    window.location.href = "../auth/login.html";
    return;
  }

  const selectedEquipment = equipmentList.find((eq) => eq.id === equipmentId);
  const owner = users.find((u) => u.id === selectedEquipment.ownerId);

  if (!selectedEquipment || !owner) {
    alert("Equipment or owner not found.");
    window.location.href = "../equipment/equipment_list.html";
    return;
  }

  // Fill equipment details box
  const equipmentBox = document.getElementById("equipmentBox");
  equipmentBox.innerHTML = `
    <img src="${selectedEquipment.image}">
    <div class="equipment-info">
      <h3>${selectedEquipment.name}</h3>
      <p><strong>Type:</strong> ${selectedEquipment.type}</p>
      <p><strong>Price:</strong> ₹${selectedEquipment.price}/hour</p>
      <p><strong>Location:</strong> ${selectedEquipment.location}</p>
    </div>
  `;

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const startDate = form.start_date.value;
    const endDate = form.end_date.value;
    const duration = form.duration.value;

    if (!startDate || !endDate || !duration) {
      alert("All fields are required.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date must be after start date.");
      return;
    }

    const totalPrice = selectedEquipment.price * (duration === "Daily" ? 8 : 1);

    const newBooking = {
      id: Date.now(),
      equipmentId,
      renterId: activeUser.id,
      ownerId: selectedEquipment.ownerId,
      startDate,
      endDate,
      duration,
      status: "Pending",
      price: selectedEquipment.price,
      total_price: totalPrice,
      equipmentName: selectedEquipment.name,
      equipmentImage: selectedEquipment.image,
    };

    // store booking
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // send emails
    sendBookingRequestEmail(owner, activeUser, selectedEquipment, newBooking);
    sendBookingConfirmationEmail(activeUser, selectedEquipment, newBooking);

    alert("Booking submitted! Emails sent.");
    window.location.href = "../dashboard/dashboard_renter.html";
  });
});
