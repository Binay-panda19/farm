// login.js

/**document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='email']").value.trim();
    const password = loginForm.querySelector("input[type='password']").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Simulate login
    alert(`Login successful for ${email}`);
    // Redirect to dashboard based on role (example)
    window.location.href = "dashboard_renter.html";
  });
});**/

/**document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Both email and password are required!");
      return;
    }

    try {
      // 🔹 Call backend login API
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token in localStorage for authentication
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);

        alert(`Welcome ${data.name}! You are logged in as ${data.role}.`);

        // 🔹 Redirect based on role
        if (data.role === "owner") {
          window.location.href = "dashboard_owner.html";
        } else if (data.role === "renter") {
          window.location.href = "dashboard_renter.html";
        } else if (data.role === "admin") {
          window.location.href = "admin_panel.html";
        }
      } else {
        alert("❌ " + data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Please try again later.");
    }
  });
});**/

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values from the form
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Both email and password are required!");
      return;
    }

    try {
      // Send login request to backend
      const res = await fetch("http://localhost:5500/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Save JWT token and role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);

        alert(`Welcome ${data.name}! You are logged in as ${data.role}.`);

        // Redirect based on role
        if (data.role === "owner") {
          window.location.href = "http://localhost:5500/dashboard_owner.html";
          window.location.replace('http://localhost:5500/dashboard_owner.html');
        } else if (data.role === "renter") {
          window.location.href = "http://localhost:5500/dashboard_renter.html";
          window.location.replace('http://localhost:5500/dashboard_renter.html');
        } else if (data.role === "admin") {
          window.location.href = "http://localhost:5500/admin_panel.html";
          window.location.replace('http://localhost:5500/admin_panel.html');
        }
      } else {
        // Show backend error message
        alert("❌ " + data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Please try again later.");
    }
  });
});


