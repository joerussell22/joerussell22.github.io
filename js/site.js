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
  const onScroll = () => {
    if (nav) nav.classList.toggle("is-compact", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll(".navbar-dream .nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const file = href.split("/").pop();
    const here = location.pathname.split("/").pop() || "index.html";
    if (file === here) link.classList.add("active");
  });

  if (fine && !reduce) {
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(ring);
    let x = 0, y = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      requestAnimationFrame(tick);
    };
    tick();
    document.querySelectorAll("a, button, .card-weave").forEach((el) => {
      el.addEventListener("pointerenter", () => ring.classList.add("is-hot"));
      el.addEventListener("pointerleave", () => ring.classList.remove("is-hot"));
    });
    document.querySelectorAll(".btn-gold").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.12}px, ${dy * 0.18}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  document.querySelectorAll(".form-live input").forEach((input) => {
    const wrap = input.closest(".form-live");
    const sync = () => {
      const ok = input.checkValidity() && input.value.trim().length > 0;
      wrap.classList.toggle("is-ok", ok);
      input.classList.toggle("field-ok", ok);
    };
    input.addEventListener("input", sync);
    input.addEventListener("blur", sync);
  });

  document.querySelectorAll(".needs-validation").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        const first = form.querySelector(":invalid");
        if (first) first.focus();
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Brief received"; }
      const banner = document.getElementById("brief-success");
      if (banner) banner.classList.remove("d-none");
      form.reset();
      form.classList.remove("was-validated");
      form.querySelectorAll(".form-live").forEach((el) => el.classList.remove("is-ok"));
      form.querySelectorAll(".field-ok").forEach((el) => el.classList.remove("field-ok"));
    });
  });
})();
