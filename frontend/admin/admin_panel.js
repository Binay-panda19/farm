document.addEventListener("DOMContentLoaded", () => {
  console.log("Admin panel loaded.");

  // 1️⃣ Handle Approve/Reject buttons
  const actionButtons = document.querySelectorAll(".action-btn");

  actionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isApprove = btn.classList.contains("approve");
      const action = isApprove ? "Approved" : "Rejected";

      const row = btn.closest("tr");
      const statusCell = row.cells[3] || row.cells[4] || row.cells[5]; // Auto-detect

      statusCell.innerText = action;

      alert(`${row.cells[0].innerText} has been ${action.toLowerCase()}.`);

      // Disable both buttons
      btn
        .closest("td")
        .querySelectorAll(".action-btn")
        .forEach((b) => (b.disabled = true));
    });
  });

  // 2️⃣ Booking row click — show details
  const bookingRows = document.querySelectorAll("#bookingTable tbody tr");

  bookingRows.forEach((row) => {
    row.addEventListener("click", () => {
      const equipment = row.cells[0].innerText;
      const renter = row.cells[1].innerText;
      const owner = row.cells[2].innerText;
      const start = row.cells[3].innerText;
      const end = row.cells[4].innerText;
      const status = row.cells[5].innerText;

      alert(
        `Booking Details:\nEquipment: ${equipment}\nRenter: ${renter}\nOwner: ${owner}\nStart: ${start}\nEnd: ${end}\nStatus: ${status}`
      );
    });
  });

  // 3️⃣ Highlight pending rows
  const rows = document.querySelectorAll(".table-container table tbody tr");

  rows.forEach((row) => {
    const statusCell = [...row.cells].find(
      (cell) => cell.innerText.toLowerCase() === "pending"
    );

    if (statusCell) {
      row.style.backgroundColor = "#fffde7"; // soft yellow
    }
  });
});

function logout() {
  window.location.href = "../auth/login.html";
}
