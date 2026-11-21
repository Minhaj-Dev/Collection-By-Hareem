/* =========================================
   Collection By Hareem - Products & Pagination
   ========================================= */

const ITEMS_PER_PAGE = 4;

document.addEventListener("DOMContentLoaded", async () => {
  const featuredContainer = document.getElementById("featuredProducts");
  const categoryContainer = document.getElementById("categoryProducts");
  const paginationContainer = document.getElementById("pagination");

  if (!featuredContainer && !categoryContainer) return;

  const allProducts = await fetchAllProducts();

  if (featuredContainer) {
    const featured = allProducts.filter((p) => p.featured).slice(0, 8);
    renderProductCards(featured, featuredContainer);
  }

  if (categoryContainer) {
    const categoryKey = categoryContainer.dataset.category;
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    let currentPage = 1;

    const getFilteredProducts = () => {
      let list = allProducts.filter((p) => p.category === categoryKey);

      if (searchInput && searchInput.value.trim()) {
        const q = searchInput.value.trim().toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      }

      if (sortSelect) {
        if (sortSelect.value === "price-asc") {
          list.sort((a, b) => a.price - b.price);
        } else if (sortSelect.value === "price-desc") {
          list.sort((a, b) => b.price - a.price);
        }
      }
      return list;
    };

    const renderPage = (scrollToTop = false) => {
      const items = getFilteredProducts();
      const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
      if (currentPage > totalPages) currentPage = totalPages;

      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

      renderProductCards(pageItems, categoryContainer);
      renderPagination(totalPages);

      if (scrollToTop) {
        categoryContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const renderPagination = (totalPages) => {
      if (!paginationContainer) return;

      if (totalPages <= 1) {
        paginationContainer.innerHTML = "";
        return;
      }

      let html = `
        <button class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""} aria-label="Previous Page">
          <i class="fa-solid fa-chevron-left"></i> Prev
        </button>
      `;

      for (let i = 1; i <= totalPages; i++) {
        html += `
          <button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}" aria-label="Page ${i}">
            ${i}
          </button>
        `;
      }

      html += `
        <button class="page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""} aria-label="Next Page">
          Next <i class="fa-solid fa-chevron-right"></i>
        </button>
      `;

      paginationContainer.innerHTML = html;

      paginationContainer.querySelectorAll(".page-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const targetPage = Number(btn.dataset.page);
          if (targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
            currentPage = targetPage;
            renderPage(true);
          }
        });
      });
    };

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        currentPage = 1;
        renderPage();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        currentPage = 1;
        renderPage();
      });
    }

    renderPage();
  }
});

function createProductCardHTML(product) {
  return `
    <article class="product-card">
      <a href="./product.html?id=${encodeURIComponent(product.id)}" class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      </a>
      <div class="product-body">
        <span class="product-cat">${product.categoryLabel}</span>
        <a href="./product.html?id=${encodeURIComponent(product.id)}">
          <h3 class="product-title">${product.name}</h3>
        </a>
        <p class="product-price">${formatPKR(product.price)}</p>
        <a href="./product.html?id=${encodeURIComponent(product.id)}" class="btn btn-outline product-card-btn">
          View Details
        </a>
      </div>
    </article>
  `;
}

function renderProductCards(list, container) {
  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h2>No items found</h2>
        <p>Try a different search keyword or explore our other collections.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(createProductCardHTML).join("");
  container.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.src !== FALLBACK_IMAGE) img.src = FALLBACK_IMAGE;
    });
  });
}
