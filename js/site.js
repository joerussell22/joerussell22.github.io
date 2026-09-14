(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (!document.querySelector(".scroll-progress")) {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.prepend(bar);
  }
  const nav = document.querySelector(".navbar-dream");
  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("is-compact", window.scrollY > 24);
  }, { passive: true });
  document.querySelectorAll(".navbar-dream .nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const file = href.split("/").pop();
    const here = location.pathname.split("/").pop() || "index.html";
    if (file === here) link.classList.add("active");
  });
  document.querySelectorAll(".needs-validation").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Brief received"; }
      const banner = document.getElementById("brief-success");
      if (banner) banner.classList.remove("d-none");
    });
  });
})();
