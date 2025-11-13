// ===============================
// Owner Dashboard
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const equipment = JSON.parse(localStorage.getItem("equipment")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!activeUser || activeUser.role !== "owner") {
    alert("Access denied. Login as owner.");
    window.location.href = "../auth/login.html";
    return;
  }

  // Sidebar Info
  document.getElementById("sidebarName").innerText = activeUser.name;
  document.getElementById("sidebarEmail").innerText = activeUser.email;
  document.getElementById("sidebarPhone").innerText =
    activeUser.phone || "Not added";

  // Calculate total earnings (Approved bookings only)
  const earnings = bookings
    .filter((b) => b.ownerId === activeUser.id && b.status === "Approved")
    .reduce((sum, b) => sum + (b.total_price || b.price || 0), 0);

  document.getElementById("sidebarEarnings").textContent = "₹" + earnings;

  // Avatar
  document.getElementById("avatarImg").src =
    "https://cdn-icons-png.flaticon.com/512/4333/4333609.png";

  // Prepare table bodies
  const bookingTableBody = document.querySelector("#bookingTable tbody");
  const equipmentTableBody = document.querySelector("#equipmentTable tbody");

  // Summary counts
  const ownerBookings = bookings.filter((b) => b.ownerId === activeUser.id);
  const ownerEquipment = equipment.filter((eq) => eq.ownerId === activeUser.id);

  const pending = ownerBookings.filter((b) => b.status === "Pending").length;
  const completed = ownerBookings.filter(
    (b) => b.status === "Completed"
  ).length;

  document.getElementById("earnings").innerText = "₹" + earnings;
  document.getElementById("pendingCount").innerText = pending;
  document.getElementById("completedCount").innerText = completed;

  // Fill Booking Table
  bookingTableBody.innerHTML = "";
  ownerBookings.forEach((b) => {
    const renter = users.find((u) => u.id === b.renterId);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.equipmentName}</td>
      <td>${renter ? renter.name : "Unknown"}</td>
      <td>${b.startDate}</td>
      <td>${b.endDate}</td>
      <td>${b.status}</td>
      <td>
        ${
          b.status === "Pending"
            ? `
          <button class="action approve" onclick="approveBooking(${b.id})">Approve</button>
          <button class="action reject" onclick="rejectBooking(${b.id})">Reject</button>
        `
            : "—"
        }
      </td>
    `;

    bookingTableBody.appendChild(row);
  });

  // Fill Equipment Table
  equipmentTableBody.innerHTML = "";
  ownerEquipment.forEach((eq) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${eq.name}</td>
      <td>${eq.type}</td>
      <td>₹${eq.price}</td>
      <td>${eq.location}</td>
      <td>
        <button class="action delete" onclick="deleteEquipment(${eq.id})">Delete</button>
      </td>
    `;

    equipmentTableBody.appendChild(row);
  });
});

// ===============================
// APPROVE BOOKING + SEND EMAIL
// ===============================

function approveBooking(id) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const equipmentList = JSON.parse(localStorage.getItem("equipment")) || [];

  const booking = bookings.find((b) => b.id === id);
  if (!booking) return alert("Booking not found!");

  booking.status = "Approved";
  localStorage.setItem("bookings", JSON.stringify(bookings));

  const renter = users.find((u) => u.id === booking.renterId);
  const owner = users.find((u) => u.id === booking.ownerId);
  const equipment = equipmentList.find((e) => e.id === booking.equipmentId);

  if (!renter || !owner || !equipment) {
    alert("Missing user/equipment data. Email not sent.");
    return location.reload();
  }

  // Send billing email
  sendBookingApprovedEmail(renter, owner, equipment, booking)
    .then(() => {
      alert("Booking approved. Email sent!");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
      alert("Booking approved, but email failed.");
      location.reload();
    });
}

// ===============================
// REJECT BOOKING
// ===============================

function rejectBooking(id) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const b = bookings.find((b) => b.id === id);
  b.status = "Rejected";

  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert("Booking rejected.");
  location.reload();
}

// ===============================
// DELETE EQUIPMENT
// ===============================

function deleteEquipment(id) {
  let equipment = JSON.parse(localStorage.getItem("equipment")) || [];
  equipment = equipment.filter((eq) => eq.id !== id);

  localStorage.setItem("equipment", JSON.stringify(equipment));
  alert("Equipment deleted.");
  location.reload();
}

// ===============================
// SIDEBAR
// ===============================

function toggleSidebar() {
  document.getElementById("sidebarBox").classList.toggle("active");
}

// ===============================
// SEND APPROVED EMAIL
// ===============================

function sendBookingApprovedEmail(renter, owner, equipment, booking) {
  return emailjs.send("service_pk6l53v", "template_uhedfjc", {
    email: renter.email,
    name: renter.name,
    equipment_name: equipment.name,
    start_date: booking.startDate,
    end_date: booking.endDate,
    duration: booking.duration,
    total_price: booking.total_price,
    owner_name: owner.name,
    owner_phone: owner.phone || "N/A",
  });
}

function logout() {
  localStorage.removeItem("activeUser");
  window.location.href = "../auth/login.html";
}
