/* =========================================
   Collection By Hareem - Product Detail Page
   ========================================= */

document.addEventListener("DOMContentLoaded", async () => {
  const detailContainer = document.getElementById("productDetailContainer");
  const relatedContainer = document.getElementById("relatedProducts");
  if (!detailContainer) return;

  const allProducts = await fetchAllProducts();
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    detailContainer.innerHTML = `
      <div class="empty-state">
        <h2>Product Not Found</h2>
        <p>The jewelry piece you are looking for may have moved or is no longer available.</p>
        <a href="./index.html" class="btn btn-primary">Back to Home</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} | ${STORE_CONFIG.brandName}`;

  const waOrderUrl = buildWhatsAppOrderUrl(product);
  const categoryPage = `./${product.category}.html`;

  detailContainer.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="./index.html">Home</a> /
      <a href="${categoryPage}">${product.categoryLabel}</a> /
      <span>${product.name}</span>
    </nav>

    <div class="detail-grid">
      <div class="detail-img-box">
        <img src="${product.image}" alt="${product.name}" id="detailMainImg" />
      </div>

      <div class="detail-info">
        <span class="detail-sku">Code: ${product.id}</span>
        <h1 class="detail-title">${product.name}</h1>
        <p class="detail-price">${formatPKR(product.price)}</p>
        <p class="detail-desc">${product.description}</p>

        <ul class="detail-specs">
          <li><span>Category</span><span>${product.categoryLabel}</span></li>
          <li><span>Material</span><span>${product.material}</span></li>
          <li><span>Care Guide</span><span>${product.care}</span></li>
          <li><span>Availability</span><span>In Stock</span></li>
        </ul>

        <a href="${waOrderUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
        </a>

        <p class="detail-note">
          <i class="fa-solid fa-circle-info"></i> Clicking the button opens WhatsApp with this product's name, code, price, and direct link pre-filled for quick ordering.
        </p>
      </div>
    </div>
  `;

  const mainImg = document.getElementById("detailMainImg");
  if (mainImg) {
    mainImg.addEventListener("error", () => {
      if (mainImg.src !== FALLBACK_IMAGE) mainImg.src = FALLBACK_IMAGE;
    });
  }

  if (relatedContainer) {
    const related = allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    renderProductCards(related, relatedContainer);
  }
});
