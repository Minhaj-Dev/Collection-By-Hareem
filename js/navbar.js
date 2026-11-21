let nav = document.getElementById("repeatNav")

nav.innerHTML=  `
<div class="container nav-container">
      <a href="./index.html" class="brand-logo">
        <span class="brand-name">Collection By Hareem</span>
        <span class="brand-sub">Shine with Style</span>
      </a>

      <button class="nav-toggle" id="navToggle" aria-label="Toggle Menu" aria-expanded="false">
        <i class="fa-solid fa-bars"></i>
      </button>

      <ul class="nav-links" id="navLinks">
        <li><a href="./index.html" class="nav-link">Home</a></li>
        <li class="nav-dropdown">
          <button type="button" class="nav-link dropdown-toggle" aria-expanded="false">
            Categories <i class="fa-solid fa-chevron-down"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a href="./necklaces.html" class="dropdown-item">Necklaces</a></li>
            <li><a href="./earrings.html" class="dropdown-item">Earrings</a></li>
            <li><a href="./rings.html" class="dropdown-item">Rings</a></li>
            <li><a href="./bracelets.html" class="dropdown-item">Bracelets</a></li>
            <li><a href="./more.html" class="dropdown-item">&amp; More</a></li>
          </ul>
        </li>
        <li><a href="./about.html" class="nav-link ">About Us</a></li>
        <li><a href="./contact.html" class="nav-link">Contact Us</a></li>
        <li><a href="./login.html" class="nav-link">Login</a></li>
      </ul>
    </div>
`