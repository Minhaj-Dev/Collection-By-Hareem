/* =========================================
   Collection By Hareem - Data & Cloud Layer
   ========================================= */

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">' +
      '<rect width="600" height="600" fill="#F4E3E6"/>' +
      '<text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="#4A2328" font-family="Georgia, serif" font-size="28">Collection By Hareem</text>' +
      '<text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="#B76E79" font-family="sans-serif" font-size="16">Shine with Style</text>' +
    "</svg>"
  );

const CATEGORY_LABELS = {
  necklaces: "Necklaces",
  earrings: "Earrings",
  rings: "Rings",
  bracelets: "Bracelets",
  more: "& More"
};

const DEFAULT_PRODUCTS = [
  // --- NECKLACES ---
  {
    id: "CBH-NK-101",
    name: "Rose Quartz Teardrop Pendant",
    category: "necklaces",
    categoryLabel: "Necklaces",
    price: 2450,
    featured: true,
    badge: "Bestseller",
    material: "Rose Gold Plated Alloy & Pink Zircon",
    care: "Keep away from perfume & water",
    description: "A delicate teardrop pink crystal pendant suspended on a dainty rose-gold chain. Perfect for everyday elegance and festive evenings.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-NK-102",
    name: "Layered Pearl Blossom Choker",
    category: "necklaces",
    categoryLabel: "Necklaces",
    price: 3200,
    featured: true,
    badge: "New",
    material: "Faux Freshwater Pearls & Gold Plated Brass",
    care: "Store in dry pouch after use",
    description: "Double-layered pearl choker accented with miniature floral charms for a timeless bridal or party look.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-NK-103",
    name: "Aurelia Minimalist Bar Necklace",
    category: "necklaces",
    categoryLabel: "Necklaces",
    price: 1850,
    featured: false,
    badge: "",
    material: "18k Gold Plated Stainless Steel",
    care: "Tarnish resistant; wipe with soft cloth",
    description: "Sleek and understated horizontal bar pendant designed for effortless layering with your favorite chains.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-NK-104",
    name: "Blush Crystal Solitaire Chain",
    category: "necklaces",
    categoryLabel: "Necklaces",
    price: 2100,
    featured: false,
    badge: "Trending",
    material: "Rose Gold Finish & AAA Cubic Zirconia",
    care: "Avoid direct moisture",
    description: "A single luminous blush solitaire stone set in a refined four-prong bezel.",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-NK-105",
    name: "Butterfly Charm Layered Chain",
    category: "necklaces",
    categoryLabel: "Necklaces",
    price: 2250,
    featured: false,
    badge: "New",
    material: "Rose Gold Plated Brass & Micro Zircon",
    care: "Keep in dry jewelry pouch",
    description: "Graceful dual-strand chain featuring a shimmering butterfly motif for casual and semi-formal wear.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-NK-106",
    name: "Royal Kundan Festive Necklace",
    category: "necklaces",
    categoryLabel: "Necklaces",
    price: 4500,
    featured: false,
    badge: "Festive",
    material: "Gold Plated Alloy & Kundan Stones",
    care: "Store in airtight box",
    description: "Statement festive necklace crafted with luminous kundan stones and pearl drops.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
  },

  // --- EARRINGS ---
  {
    id: "CBH-ER-201",
    name: "Pink Crystal Drop Earrings",
    category: "earrings",
    categoryLabel: "Earrings",
    price: 1950,
    featured: true,
    badge: "Bestseller",
    material: "Rose Gold Plated & Faceted Pink Stones",
    care: "Store separately to prevent scratches",
    description: "Sparkling pear-shaped pink crystal drops framed with micro-zircon halos that catch the light from every angle.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-ER-202",
    name: "Pearl & Gold Hoops",
    category: "earrings",
    categoryLabel: "Earrings",
    price: 1650,
    featured: false,
    badge: "New",
    material: "Gold Plated Alloy & Faux Pearls",
    care: "Wipe gently after wearing",
    description: "Lightweight everyday hoops lined with lustrous mini pearls for a soft feminine finish.",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-ER-203",
    name: "Floral Jhumka Studs",
    category: "earrings",
    categoryLabel: "Earrings",
    price: 2300,
    featured: true,
    badge: "Festive",
    material: "Antique Rose Gold Finish & Kundan Accents",
    care: "Keep in airtight jewelry box",
    description: "Traditional meets modern in these delicate floral jhumka earrings ideal for Eid, mehndi, and formal wear.",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-ER-204",
    name: "Celestial Starburst Studs",
    category: "earrings",
    categoryLabel: "Earrings",
    price: 1450,
    featured: false,
    badge: "",
    material: "Hypoallergenic Alloy & Clear Zirconia",
    care: "Avoid sprays and lotions",
    description: "Petite starburst studs with brilliant-cut stones for subtle shimmer day or night.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-ER-205",
    name: "Rose Gold Chandbali Drops",
    category: "earrings",
    categoryLabel: "Earrings",
    price: 2650,
    featured: false,
    badge: "Festive",
    material: "Rose Gold Plated & Pearl Beads",
    care: "Keep away from moisture",
    description: "Crescent-shaped chandbali earrings accented with blush stones and dainty pearl tassels.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-ER-206",
    name: "Minimalist Heart Huggies",
    category: "earrings",
    categoryLabel: "Earrings",
    price: 1350,
    featured: false,
    badge: "Trending",
    material: "18k Gold Plated Stainless Steel",
    care: "Wipe with soft cloth",
    description: "Featherlight huggie hoops with tiny dangling heart charms for effortless daily wear.",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"
  },

  // --- RINGS ---
  {
    id: "CBH-RG-301",
    name: "Blush Halo Solitaire Ring",
    category: "rings",
    categoryLabel: "Rings",
    price: 1750,
    featured: true,
    badge: "Bestseller",
    material: "Rose Gold Plated & Cubic Zirconia",
    care: "Remove before washing hands",
    description: "An adjustable statement solitaire ring surrounded by a shimmering halo of delicate crystals.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-RG-302",
    name: "Dainty Twist Band Set (3 Pcs)",
    category: "rings",
    categoryLabel: "Rings",
    price: 1550,
    featured: false,
    badge: "Value Set",
    material: "18k Gold Plated Brass",
    care: "Keep dry",
    description: "A stackable trio of minimalist twisted and smooth bands that can be worn together or solo.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-RG-303",
    name: "Petal Crown Open Ring",
    category: "rings",
    categoryLabel: "Rings",
    price: 1600,
    featured: false,
    badge: "Adjustable",
    material: "Rose Gold Tone & Pink Enamel",
    care: "Store in soft pouch",
    description: "Inspired by blooming petals, this adjustable open-band ring adds romantic charm to any hand.",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-RG-304",
    name: "Eternity Sparkle Band",
    category: "rings",
    categoryLabel: "Rings",
    price: 1900,
    featured: false,
    badge: "",
    material: "Silver Tone Rhodium Plated & Zircon",
    care: "Wipe with microfiber cloth",
    description: "Full-circle pave stone band designed for timeless sparkle and comfortable all-day wear.",
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-RG-305",
    name: "Pearl & Crystal Cocktail Ring",
    category: "rings",
    categoryLabel: "Rings",
    price: 2100,
    featured: false,
    badge: "New",
    material: "Rose Gold Plated & Faux Pearl",
    care: "Keep away from perfume",
    description: "Statement cocktail ring pairing a luminous central pearl with delicate crystal accents.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-RG-306",
    name: "Infinity Knot Promise Ring",
    category: "rings",
    categoryLabel: "Rings",
    price: 1450,
    featured: false,
    badge: "",
    material: "Rose Gold Plated Alloy",
    care: "Store in dry box",
    description: "Minimalist infinity knot band symbolizing timeless grace and everyday style.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80"
  },

  // --- BRACELETS ---
  {
    id: "CBH-BR-401",
    name: "Heart Charm Pearl Bracelet",
    category: "bracelets",
    categoryLabel: "Bracelets",
    price: 1850,
    featured: true,
    badge: "Bestseller",
    material: "Faux Pearls & Rose Gold Heart Clasp",
    care: "Avoid pulling or soaking",
    description: "A graceful strand of creamy pearls finished with our signature heart charm.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-BR-402",
    name: "Rose Gold Tennis Bracelet",
    category: "bracelets",
    categoryLabel: "Bracelets",
    price: 2750,
    featured: true,
    badge: "Luxury",
    material: "Rose Gold Plated & AAA Zirconia",
    care: "Keep away from chemicals",
    description: "Continuous line of hand-set sparkling stones with a secure fold-over clasp.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-BR-403",
    name: "Minimalist Clover Chain Bracelet",
    category: "bracelets",
    categoryLabel: "Bracelets",
    price: 1650,
    featured: false,
    badge: "Trending",
    material: "Stainless Steel Gold Plated",
    care: "Water resistant; dry after wash",
    description: "Delicate four-leaf clover motifs along a fine gold chain for an effortlessly chic wrist stack.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-BR-404",
    name: "Boho Crystal Cuff Bangle",
    category: "bracelets",
    categoryLabel: "Bracelets",
    price: 2150,
    featured: false,
    badge: "",
    material: "Rose Gold Alloy & Pink Quartz",
    care: "Store in box",
    description: "Open-ended sculpted cuff topped with twin polished blush crystals.",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-BR-405",
    name: "Evil Eye Dainty Chain Bracelet",
    category: "bracelets",
    categoryLabel: "Bracelets",
    price: 1500,
    featured: false,
    badge: "New",
    material: "Gold Plated Brass & Enamel",
    care: "Keep dry",
    description: "Trendy protective evil-eye charm centered on an adjustable fine chain.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-BR-406",
    name: "Festive Kundan Kada Bangle",
    category: "bracelets",
    categoryLabel: "Bracelets",
    price: 2950,
    featured: false,
    badge: "Festive",
    material: "Antique Gold Finish & Kundan",
    care: "Store in velvet box",
    description: "Hinged festive kada encrusted with traditional kundan work and pearl edging.",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80"
  },

  // --- & MORE ---
  {
    id: "CBH-MR-501",
    name: "Bridal Rose Jewelry Gift Set",
    category: "more",
    categoryLabel: "& More",
    price: 4800,
    featured: true,
    badge: "Gift Ready",
    material: "Rose Gold Plated Necklace + Earrings + Ring",
    care: "Includes velvet keepsake box",
    description: "A curated 3-piece matching set packaged in a blush velvet gift box—perfect for gifting or special occasions.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-MR-502",
    name: "Pearl Hair Vine & Pins (Set of 4)",
    category: "more",
    categoryLabel: "& More",
    price: 1400,
    featured: false,
    badge: "New",
    material: "Flexible Rose Gold Wire & Pearls",
    care: "Store flat",
    description: "Hand-twisted floral pearl hair pins to elevate buns, braids, and festive hairstyles.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-MR-503",
    name: "Dainty Charm Anklet",
    category: "more",
    categoryLabel: "& More",
    price: 1250,
    featured: false,
    badge: "",
    material: "Gold Plated Chain & Mini Bells",
    care: "Avoid sea water",
    description: "Featherlight ankle chain with subtle charms for effortless summer and festive styling.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-MR-504",
    name: "Velvet Travel Jewelry Organizer",
    category: "more",
    categoryLabel: "& More",
    price: 1950,
    featured: false,
    badge: "Must Have",
    material: "Soft Blush Velvet & Gold Zipper",
    care: "Spot clean only",
    description: "Compact zippered travel case with dedicated slots for rings, earrings, necklaces, and bracelets.",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-MR-505",
    name: "Crystal Maang Tikka",
    category: "more",
    categoryLabel: "& More",
    price: 1800,
    featured: false,
    badge: "Festive",
    material: "Rose Gold Plated & Pink Zircon",
    care: "Keep in box",
    description: "Delicate teardrop maang tikka crafted to complement festive and bridal outfits.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "CBH-MR-506",
    name: "Satin Ribbon Jewelry Pouch Set (3 Pcs)",
    category: "more",
    categoryLabel: "& More",
    price: 950,
    featured: false,
    badge: "",
    material: "Blush Pink Satin",
    care: "Hand wash cold",
    description: "Soft drawstring satin pouches to keep your jewelry tarnish-free and organized.",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=800&q=80"
  }
];

const LOCAL_STORAGE_KEY = "cbh_products_v1";

function normalizeProduct(raw) {
  const cat = String(raw.category || "more").toLowerCase().trim();
  return {
    id: String(raw.id || "").trim(),
    name: String(raw.name || "").trim(),
    category: cat,
    categoryLabel: raw.categoryLabel || CATEGORY_LABELS[cat] || "& More",
    price: Number(raw.price) || 0,
    featured: raw.featured === true || String(raw.featured).toLowerCase() === "true",
    badge: String(raw.badge || "").trim(),
    material: String(raw.material || "Rose Gold Plated").trim(),
    care: String(raw.care || "Keep away from perfume & water").trim(),
    description: String(raw.description || "").trim(),
    image: String(raw.image || "").trim() || FALLBACK_IMAGE
  };
}

function getLocalProducts() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed.map(normalizeProduct);
    }
  } catch (err) {
    console.warn("localStorage unavailable:", err);
  }
  return DEFAULT_PRODUCTS.map(normalizeProduct);
}

function saveLocalProducts(list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("Could not save to localStorage:", err);
  }
}

async function fetchAllProducts() {
  if (STORE_CONFIG.googleScriptUrl && STORE_CONFIG.googleScriptUrl.startsWith("http")) {
    try {
      const res = await fetch(`${STORE_CONFIG.googleScriptUrl}?action=getProducts`);
      const data = await res.json();
      if (data && Array.isArray(data.products)) {
        return data.products.map(normalizeProduct);
      }
    } catch (err) {
      console.warn("Google Sheets fetch failed, falling back to local data:", err);
    }
  }
  return getLocalProducts();
}

function formatPKR(amount) {
  return `${STORE_CONFIG.currency} ${Number(amount).toLocaleString("en-PK")}`;
}

function buildWhatsAppOrderUrl(product) {
  const productLink = window.location.href;
  const message =
    `Assalam-o-Alaikum ${STORE_CONFIG.brandName}! I am interested in ordering this item:

` +
    `Product: ${product.name}
` +
    `Code: ${product.id}
` +
    `Price: ${formatPKR(product.price)}
` +
    `Link: ${productLink}

` +
    `Please let me know about its availability and delivery details.`;
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
