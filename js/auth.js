/* =========================================
   Collection By Hareem - Hidden Admin Auth
   ========================================= */

const ADMIN_SESSION_KEY = "cbh_admin_session";

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function isAdminLoggedIn() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "authenticated";
  } catch {
    return false;
  }
}

function logoutAdmin() {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {}
  window.location.href = "./login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  if (isAdminLoggedIn()) {
    window.location.href = "./admin.html";
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value;
    const errorEl = document.getElementById("loginError");

    if (errorEl) errorEl.textContent = "";

    try {
      const hashedInput = await sha256(password);
      if (
        username === STORE_CONFIG.adminUsername &&
        hashedInput === STORE_CONFIG.adminPasswordHash
      ) {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "authenticated");
        showToast("Welcome back! Redirecting to Control Panel...");
        setTimeout(() => {
          window.location.href = "./admin.html";
        }, 500);
      } else {
        if (errorEl) errorEl.textContent = "Invalid credentials. Access denied.";
        showToast("Invalid username or password.");
      }
    } catch (err) {
      if (errorEl) errorEl.textContent = "Authentication error. Please use HTTPS or localhost.";
    }
  });
});
