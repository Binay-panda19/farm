// dashboard_renter.js

/**document.addEventListener("DOMContentLoaded", () => {

  // Example: handle table row click to view booking info
  const bookingRows = document.querySelectorAll(".table-container tbody tr");
  bookingRows.forEach(row => {
    row.addEventListener("click", () => {
      const equipment = row.cells[0].innerText;
      const owner = row.cells[1].innerText;
      const startDate = row.cells[2].innerText;
      const endDate = row.cells[3].innerText;
      const status = row.cells[4].innerText;

      alert(`Booking Info:\nEquipment: ${equipment}\nOwner: ${owner}\nStart: ${startDate}\nEnd: ${endDate}\nStatus: ${status}`);
    });
  });

  // Example: update summary cards dynamically
  const upcomingCard = document.querySelector(".cards .card:nth-child(1) p");
  const completedCard = document.querySelector(".cards .card:nth-child(2) p");
  const totalPaymentCard = document.querySelector(".cards .card:nth-child(3) p");

  // Simulate fetching data
  const upcoming = 2;
  const completed = 5;
  const totalPaid = 18500;

  upcomingCard.innerText = upcoming;
  completedCard.innerText = completed;
  totalPaymentCard.innerText = `₹${totalPaid}`;
});**/

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "renter") {
    alert("Access denied. Please login as Renter.");
    window.location.href = "login.html";
  }

  const equipmentList = document.querySelector("#renter-equipment-list");

  // Fetch available equipment
  async function fetchEquipment() {
    try {
      const res = await fetch("http://localhost:5000/api/equipment", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      equipmentList.innerHTML = "";

      if (res.ok) {
        data.forEach(eq => {
          const div = document.createElement("div");
          div.classList.add("equipment-card");
          div.innerHTML = `
            <h3>${eq.name}</h3>
            <p>Type: ${eq.type}</p>
            <p>Price: ₹${eq.price}</p>
            <p>Location: ${eq.location}</p>
            <button class="book-btn" data-id="${eq.id}">Book Now</button>
          `;
          equipmentList.appendChild(div);
        });

        // Add event listeners for booking buttons
        document.querySelectorAll(".book-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const eqId = btn.getAttribute("data-id");
            window.location.href = `booking.html?equipmentId=${eqId}`;
          });
        });
      } else {
        alert(data.msg || "Failed to fetch equipment");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while fetching equipment");
    }
  }

  fetchEquipment();
});

