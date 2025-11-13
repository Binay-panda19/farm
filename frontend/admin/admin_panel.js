// admin_panel.js

document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ Handle Approve/Reject buttons
  const actionButtons = document.querySelectorAll(".action-btn");

  actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.classList.contains("approve") ? "Approved" : "Rejected";

      // Find the table row
      const row = btn.closest("tr");
      const itemName = row.cells[0].innerText;

      // Update status in table dynamically
      row.cells[3].innerText = action;

      alert(`${itemName} has been ${action.toLowerCase()}.`);

      // Optional: disable buttons after action
      btn.closest("td").querySelectorAll(".action-btn").forEach(b => b.disabled = true);

      // TODO: Integrate with backend API here
      // Example:
      // fetch('/api/admin/update', { method: 'POST', body: JSON.stringify({id, action}) })
    });
  });

  // 2️⃣ Handle row click for booking details
  const bookingRows = document.querySelectorAll(".table-container:nth-child(3) tbody tr"); // 3rd table = Booking Management
  bookingRows.forEach(row => {
    row.addEventListener("click", () => {
      const equipment = row.cells[0].innerText;
      const renter = row.cells[1].innerText;
      const owner = row.cells[2].innerText;
      const startDate = row.cells[3].innerText;
      const endDate = row.cells[4].innerText;
      const status = row.cells[5].innerText;

      alert(`Booking Details:\nEquipment: ${equipment}\nRenter: ${renter}\nOwner: ${owner}\nStart: ${startDate}\nEnd: ${endDate}\nStatus: ${status}`);
    });
  });

  // 3️⃣ Optional: Highlight pending approvals
  const tables = document.querySelectorAll(".table-container table tbody tr");
  tables.forEach(row => {
    const statusCell = row.cells[3]; // Status column
    if (statusCell && statusCell.innerText.toLowerCase() === "pending") {
      row.style.backgroundColor = "#fffde7"; // Light yellow highlight
    }
  });

});
