document.addEventListener("DOMContentLoaded", () => {
  const amount = new URLSearchParams(window.location.search).get("amount") || 2000;

  document.querySelector("button").addEventListener("click", async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      const options = {
        key: "rzp_test_YourKeyID",
        amount: data.order.amount,
        currency: "INR",
        name: "Farmago",
        description: "Equipment Booking Payment",
        order_id: data.order.id,
        handler: async function (response) {
          alert("Payment successful!");
          window.location.href = "dashboard_renter.html";
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
    }
  });
});
