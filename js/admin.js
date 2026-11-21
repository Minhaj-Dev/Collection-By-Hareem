/* =========================================
   Collection By Hareem - Admin Control Panel
   Supports Google Sheets (Cloud) + Local Mode
   ========================================= */

let adminProducts = [];
let editingId = null;

document.addEventListener("DOMContentLoaded", async () => {
  if (!isAdminLoggedIn()) {
    window.location.href = "./login.html";
    return;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logoutAdmin);

  updateModeIndicator();
  setupImageUpload();
  setupProductForm();
  await loadAdminTable();
});

function isCloudMode() {
  return Boolean(STORE_CONFIG.googleScriptUrl && STORE_CONFIG.googleScriptUrl.startsWith("http"));
}

function updateModeIndicator() {
  const badge = document.getElementById("storageModeBadge");
  if (!badge) return;

  if (isCloudMode()) {
    badge.classList.add("cloud");
    badge.innerHTML = '<i class="fa-solid fa-cloud-check"></i> Live Mode: Google Sheets Connected';
  } else {
    badge.innerHTML = '<i class="fa-solid fa-laptop-code"></i> Local Mode (Connect Google Sheet in js/config.js for Live Sync)';
  }
}

function setupImageUpload() {
  const fileInput = document.getElementById("prodImageFile");
  const urlInput = document.getElementById("prodImageUrl");
  const previewBox = document.getElementById("imgPreviewBox");

  if (urlInput && previewBox) {
    urlInput.addEventListener("input", () => {
      const val = urlInput.value.trim();
      if (val) {
        previewBox.innerHTML = `<img src="${val}" alt="Preview" />`;
      } else {
        previewBox.textContent = "Image preview will appear here";
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files[0];
      if (!file) return;

      if (!STORE_CONFIG.imgbbApiKey) {
        showToast("ImgBB API key not set in js/config.js — using local preview.");
        const reader = new FileReader();
        reader.onload = (ev) => {
          urlInput.value = ev.target.result;
          previewBox.innerHTML = `<img src="${ev.target.result}" alt="Preview" />`;
        };
        reader.readAsDataURL(file);
        return;
      }

      previewBox.textContent = "Uploading image to ImgBB...";
      try {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${encodeURIComponent(STORE_CONFIG.imgbbApiKey)}`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (data && data.success && data.data && data.data.url) {
          urlInput.value = data.data.url;
          previewBox.innerHTML = `<img src="${data.data.url}" alt="Uploaded Preview" />`;
          showToast("Image uploaded successfully!");
        } else {
          throw new Error("Upload failed");
        }
      } catch (err) {
        previewBox.textContent = "Upload failed. Paste an image URL instead.";
        showToast("Image upload failed. Check your ImgBB API key.");
      }
    });
  }
}

function setupProductForm() {
  const form = document.getElementById("adminProductForm");
  const cancelBtn = document.getElementById("cancelEditBtn");

  if (cancelBtn) {
    cancelBtn.addEventListener("click", resetAdminForm);
  }

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("saveProdBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

    const category = document.getElementById("prodCategory").value;
    const productObj = normalizeProduct({
      id: document.getElementById("prodId").value.trim() || `CBH-${Date.now().toString().slice(-4)}`,
      name: document.getElementById("prodName").value.trim(),
      category: category,
      categoryLabel: CATEGORY_LABELS[category] || "& More",
      price: Number(document.getElementById("prodPrice").value),
      badge: document.getElementById("prodBadge").value.trim(),
      featured: document.getElementById("prodFeatured").checked,
      material: document.getElementById("prodMaterial").value.trim(),
      care: document.getElementById("prodCare").value.trim(),
      description: document.getElementById("prodDesc").value.trim(),
      image: document.getElementById("prodImageUrl").value.trim()
    });

    try {
      if (isCloudMode()) {
        const action = editingId ? "updateProduct" : "addProduct";
        await fetch(STORE_CONFIG.googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action, product: productObj })
        });
        showToast(editingId ? "Product updated in Google Sheet!" : "Product added to Google Sheet!");
      } else {
        if (editingId) {
          adminProducts = adminProducts.map((p) => (p.id === editingId ? productObj : p));
          showToast("Product updated locally!");
        } else {
          adminProducts.unshift(productObj);
          showToast("Product added locally!");
        }
        saveLocalProducts(adminProducts);
      }

      resetAdminForm();
      await loadAdminTable();
    } catch (err) {
      showToast("Error saving product. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = editingId ? "Update Product" : "Add Product";
    }
  });
}

async function loadAdminTable() {
  const tbody = document.getElementById("adminProductTableBody");
  const countEl = document.getElementById("totalProdCount");
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem;">Loading products...</td></tr>';
  adminProducts = await fetchAllProducts();

  if (countEl) countEl.textContent = adminProducts.length;

  if (!adminProducts.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem;">No products yet. Add your first piece!</td></tr>';
    return;
  }

  tbody.innerHTML = adminProducts
    .map(
      (p) => `
      <tr>
        <td><img src="${p.image}" alt="${p.name}" class="admin-thumb" /></td>
        <td>
          <strong>${p.name}</strong><br />
          <small style="color: var(--text-muted);">${p.id}</small>
        </td>
        <td>${p.categoryLabel}</td>
        <td><strong>${formatPKR(p.price)}</strong></td>
        <td>
          <div class="action-btns">
            <button type="button" class="btn btn-outline btn-sm edit-btn" data-id="${p.id}">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${p.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");

  tbody.querySelectorAll(".admin-thumb").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.src !== FALLBACK_IMAGE) img.src = FALLBACK_IMAGE;
    });
  });

  tbody.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => populateEditForm(btn.dataset.id));
  });

  tbody.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleDeleteProduct(btn.dataset.id));
  });
}

function populateEditForm(id) {
  const product = adminProducts.find((p) => p.id === id);
  if (!product) return;

  editingId = product.id;
  document.getElementById("formHeading").textContent = "Edit Product";
  document.getElementById("saveProdBtn").textContent = "Update Product";
  document.getElementById("cancelEditBtn").style.display = "inline-flex";

  document.getElementById("prodId").value = product.id;
  document.getElementById("prodId").readOnly = true;
  document.getElementById("prodName").value = product.name;
  document.getElementById("prodCategory").value = product.category;
  document.getElementById("prodPrice").value = product.price;
  document.getElementById("prodBadge").value = product.badge;
  document.getElementById("prodFeatured").checked = Boolean(product.featured);
  document.getElementById("prodMaterial").value = product.material;
  document.getElementById("prodCare").value = product.care;
  document.getElementById("prodDesc").value = product.description;
  document.getElementById("prodImageUrl").value = product.image;
  document.getElementById("imgPreviewBox").innerHTML = `<img src="${product.image}" alt="Preview" />`;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetAdminForm() {
  editingId = null;
  const form = document.getElementById("adminProductForm");
  if (form) form.reset();
  document.getElementById("prodId").readOnly = false;
  document.getElementById("formHeading").textContent = "Add New Product";
  document.getElementById("saveProdBtn").textContent = "Add Product";
  document.getElementById("cancelEditBtn").style.display = "none";
  document.getElementById("imgPreviewBox").textContent = "Image preview will appear here";
}

async function handleDeleteProduct(id) {
  if (!confirm(`Are you sure you want to delete product ${id}?`)) return;

  if (isCloudMode()) {
    await fetch(STORE_CONFIG.googleScriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "deleteProduct", id })
    });
    showToast("Product deleted from Google Sheet!");
  } else {
    adminProducts = adminProducts.filter((p) => p.id !== id);
    saveLocalProducts(adminProducts);
    showToast("Product deleted locally!");
  }

  await loadAdminTable();
}
