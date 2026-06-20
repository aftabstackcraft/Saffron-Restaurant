(() => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  const filterButtons = document.querySelectorAll("[data-menu-filter]");
  const menuCards = document.querySelectorAll("[data-menu-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.menuFilter;

      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      menuCards.forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.menuCategory === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  const forms = document.querySelectorAll("[data-smart-form]");

  forms.forEach((form) => {
    const message = form.querySelector("[data-form-message]");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = Array.from(form.querySelectorAll("[required]"));
      const emptyField = requiredFields.find((field) => !field.value.trim());
      const emailField = form.querySelector('input[type="email"]');
      const emailLooksValid = !emailField || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());

      if (emptyField) {
        emptyField.focus();
        if (message) {
          message.textContent = "Please fill all required details.";
          message.className = "form-message is-error";
        }
        return;
      }

      if (!emailLooksValid) {
        emailField.focus();
        if (message) {
          message.textContent = "Please enter a valid email address.";
          message.className = "form-message is-error";
        }
        return;
      }

      form.reset();
      if (message) {
        message.textContent = "Thank you. Your request has been noted and our team will contact you soon.";
        message.className = "form-message is-success";
      }
    });
  });
})();
