// signup.js

/**document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("form");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signupForm.querySelector("input[name='name']").value.trim();
    const email = signupForm.querySelector("input[name='email']").value.trim();
    const password = signupForm.querySelector("input[name='password']").value.trim();
    const role = signupForm.querySelector("select[name='role']").value;

    if (!name || !email || !password || !role) {
      alert("All fields are required!");
      return;
    }

    alert(`Signup successful for ${name} as ${role}`);
    // Redirect to login page
    window.location.href = "login.html";
  });
});**/

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("form");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!name || !email || !password || !role) {
      alert("All fields are required!");
      return;
    }

    try {
      // 🔹 Call backend API
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone, password, role })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ " + data.msg);
        window.location.href = "login.html"; // redirect after signup
      } else {
        alert("❌ " + data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Please try again later.");
    }
  });
})
