document.addEventListener("DOMContentLoaded", () => {
  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const equipment = JSON.parse(localStorage.getItem("equipment")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!activeUser || activeUser.role !== "renter") {
    alert("Access denied. Login as renter.");
    window.location.href = "../auth/login.html";
    return;
  }

  // Fill sidebar profile data
  document.getElementById("sidebarName").innerText = activeUser.name;
  document.getElementById("sidebarEmail").innerText = activeUser.email;
  document.getElementById("sidebarPhone").innerText =
    activeUser.phone || "Not added";

  const totalUserBookings = bookings.filter(
    (b) => b.renterId === activeUser.id
  ).length;
  document.getElementById("sidebarBookings").innerText = totalUserBookings;

  // Optional: avatar based on role
  document.getElementById("avatarImg").src =
    activeUser.role === "renter"
      ? "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      : "https://cdn-icons-png.flaticon.com/512/4333/4333609.png";

  const pendingTable = document.querySelector("#pendingTable tbody");
  const approvedTable = document.querySelector("#approvedTable tbody");
  const historyTable = document.querySelector("#historyTable tbody");

  const renterBookings = bookings.filter((b) => b.renterId === activeUser.id);

  pendingTable.innerHTML = "";
  approvedTable.innerHTML = "";
  historyTable.innerHTML = "";

  renterBookings.forEach((b) => {
    let owner = users.find((u) => u.id === b.ownerId);

    // fallback owner
    if (!owner) {
      owner = users.find((u) => u.role === "owner") || { name: "Owner" };
    }

    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.equipmentName || "N/A"}</td>
      <td>${owner.name || "N/A"}</td>
      <td>${b.startDate || "-"}</td>
      <td>${b.endDate || "-"}</td>
      <td>${b.status || "-"}</td>
    `;

    const status = b.status.toLowerCase().trim();

    if (status === "pending") {
      row.innerHTML += `
        <td><button class="action cancel" onclick="cancelBooking(${b.id})">Cancel</button></td>`;
      pendingTable.appendChild(row);
    } else if (status === "approved") {
      row.innerHTML += `
        <td><button class="action pay" onclick="goToPayment(${b.id})">Pay Now</button></td>`;
      approvedTable.appendChild(row);
    } else {
      historyTable.appendChild(row);
    }
  });
});

// Cancel booking
function cancelBooking(id) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings = bookings.filter((b) => b.id !== id);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert("Booking cancelled.");
  location.reload();
}

//payment
function goToPayment(id) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const b = bookings.find((b) => b.id === id);
  const amount = b.price || 2000;

  window.location.href = `/frontend/payment/payment.html?bookingId=${id}&amount=${amount}`;
}

// Logout
function logout() {
  localStorage.removeItem("activeUser");
  window.location.href = "../auth/login.html";
}

// Sidebar toggle
function toggleSidebar() {
  document.getElementById("sidebarBox").classList.toggle("active");
}
