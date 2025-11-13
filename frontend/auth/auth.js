// ===================================
//  AUTH.JS - LocalStorage Auth System
//  Supports: Multiple Users + 3 Roles
//  No backend, pure frontend
// ===================================

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Load users from localStorage or create empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // ===============================
  // SIGNUP LOGIC
  // ===============================
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;

      // Check duplicate email
      const emailExists = users.some((u) => u.email === email);

      if (emailExists) {
        alert("⚠️ Email already exists. Try logging in.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("✅ Signup successful! Please login.");
      window.location.href = "login.html"; // SAME FOLDER → OK
    });
  }

  // ===============================
  // LOGIN LOGIC
  // ===============================
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("❌ Invalid email or password!");
        return;
      }

      // Save active user
      localStorage.setItem("activeUser", JSON.stringify(user));

      alert(`✅ Welcome ${user.name}!`);

      // Redirect based on role (CORRECT PATHS)
      if (user.role === "owner") {
        window.location.href = "../dashboard/dashboard_owner.html";
      } else if (user.role === "renter") {
        window.location.href = "../dashboard/dashboard_renter.html";
      } else if (user.role === "admin") {
        window.location.href = "../admin/admin_panel.html";
      }
    });
  }
});
