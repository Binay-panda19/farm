// dashboard_owner.js

/**document.addEventListener("DOMContentLoaded", () => {

  // Example: handle table row click to view booking details
  const bookingRows = document.querySelectorAll(".table-container tbody tr");
  bookingRows.forEach(row => {
    row.addEventListener("click", () => {
      const equipment = row.cells[0].innerText;
      const renter = row.cells[1].innerText;
      const startDate = row.cells[2].innerText;
      const endDate = row.cells[3].innerText;
      const status = row.cells[4].innerText;

      alert(`Booking Details:\nEquipment: ${equipment}\nRenter: ${renter}\nStart: ${startDate}\nEnd: ${endDate}\nStatus: ${status}`);
    });
  });

  // Example: dynamically update earnings card
  const earningsCard = document.querySelector(".cards .card:nth-child(1) p");
  const activeBookings = document.querySelector(".cards .card:nth-child(2) p");

  // Simulate fetching data
  const earnings = 12000; // ₹
  const activeCount = 3;

  earningsCard.innerText = `₹${earnings}`;
  activeBookings.innerText = activeCount;
});**/

/**document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Redirect if not owner
  if (!token || role !== "owner") {
    alert("Access denied. Please login as Owner.");
    window.location.href = "login.html";
  }

  const addForm = document.querySelector("#add-equipment-form");
  const equipmentList = document.querySelector("#owner-equipment-list");

  // Fetch owner's equipment
  async function fetchEquipment() {
    try {
      const res = await fetch("http://localhost:5000/api/equipment/owner", {
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
          `;
          equipmentList.appendChild(div);
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

  // Add new equipment
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = addForm.querySelector("input[name='name']").value.trim();
    const type = addForm.querySelector("input[name='type']").value.trim();
    const description = addForm.querySelector("textarea[name='description']").value.trim();
    const price = addForm.querySelector("input[name='price']").value.trim();
    const location = addForm.querySelector("input[name='location']").value.trim();

    try {
      const res = await fetch("http://localhost:5000/api/equipment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, type, description, price, location })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Equipment added successfully!");
        fetchEquipment(); // Refresh list
        addForm.reset();
      } else {
        alert(data.msg || "Failed to add equipment");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while adding equipment");
    }
  });
});**/

// dashboard_owner.js

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Redirect if not owner
  if (!token || role !== "owner") {
    alert("Access denied. Please login as Owner.");
    window.location.href = "login.html";
    return;
  }

  const addForm = document.querySelector("#add-equipment-form");
  const equipmentList = document.querySelector("#owner-equipment-list");

  // Update dashboard cards
  const earningsCard = document.querySelector(".cards .card:nth-child(1) p");
  const activeBookings = document.querySelector(".cards .card:nth-child(2) p");

  // Simulate fetching data for cards
  const earnings = 12000; // ₹ - Replace with actual API call
  const activeCount = 3;  // Replace with actual API call

  if (earningsCard) earningsCard.innerText = '${earnings}';
  if (activeBookings) activeBookings.innerText = activeCount;

  // Handle table row clicks for booking details
  const bookingRows = document.querySelectorAll(".table-container tbody tr");
  bookingRows.forEach(row => {
    row.addEventListener("click", () => {
      const equipment = row.cells[0].innerText;
      const renter = row.cells[1].innerText;
      const startDate = row.cells[2].innerText;
      const endDate = row.cells[3].innerText;
      const status = row.cells[4].innerText;

      alert(`Booking Details:
Equipment: ${equipment}
Renter: ${renter}
Start: ${startDate}
End: ${endDate}
Status: ${status}`);
    });
  });

  // Fetch owner's equipment
  async function fetchEquipment() {
    try {
      const res = await fetch("http://localhost:5000/api/equipment/owner", {
        headers: { "Authorization": 'Bearer ${token}' }
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
          `;
          equipmentList.appendChild(div);
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

  // Add new equipment
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = addForm.querySelector("input[name='name']").value.trim();
    const type = addForm.querySelector("input[name='type']").value.trim();
    const description = addForm.querySelector("textarea[name='description']").value.trim();
    const price = addForm.querySelector("input[name='price']").value.trim();
    const location = addForm.querySelector("input[name='location']").value.trim();

    try {
      const res = await fetch("http://localhost:5000/api/equipment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ${token}'
        },
        body: JSON.stringify({ name, type, description, price, location })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Equipment added successfully!");
        fetchEquipment(); // Refresh list
        addForm.reset();
      } else {
        alert(data.msg || "Failed to add equipment");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while adding equipment");
    }
  });
});


