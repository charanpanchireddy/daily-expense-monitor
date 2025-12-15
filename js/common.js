/* ================= COMMON (ALL PAGES) ================= */

// ---------- DARK MODE ----------
(function () {
  const toggle = document.getElementById("darkToggle");
  if (!toggle) return;

  const saved = localStorage.getItem("dem_dark") === "1";
  if (saved) {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("dem_dark", "1");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.removeItem("dem_dark");
    }
  });
})();

// ---------- PROFILE PICTURE ----------
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("profileImg");
  const saveBtn = document.getElementById("saveProfilePicBtn");

  if (img) {
    const saved = localStorage.getItem("dem_profile_pic");
    if (saved) img.src = saved;
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const input = document.getElementById("profilePicInput");
      const status = document.getElementById("profilePicStatus");
      if (!input.files.length) return;

      const file = input.files[0];
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("dem_profile_pic", reader.result);
        img.src = reader.result;
        status.textContent = "Updated successfully";
        setTimeout(() => {
          bootstrap.Modal.getInstance(
            document.getElementById("profilePicModal")
          ).hide();
          status.textContent = "";
          input.value = "";
        }, 500);
      };
      reader.readAsDataURL(file);
    };
  }
});

// ---------- CURRENCY (DISPLAY ONLY) ----------
function getCurrency() {
  return localStorage.getItem("dem_currency") || "₹";
}
function setCurrency(symbol) {
  localStorage.setItem("dem_currency", symbol);
  location.reload();
}

// ---------- RESET ALL DATA ----------
function resetAllData() {
  if (!confirm("Reset all local data?")) return;
  localStorage.clear();
  alert("All local data reset");
  location.reload();
}
