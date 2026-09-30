/* ============================================================
   CONFIGURACIÓN: edita solo esta parte
   ============================================================ */
const CONFIG = {
  precioApp: 4, // euros al mes

  enlaces: {
    playstore: "#", // URL de tu app en Google Play
    amazon:    "#", // enlace de afiliado de Amazon al libro
    pdf:       "#", // enlace de Buy Me a Coffee al PDF
  },

  // Fecha y hora del examen (previsión). Cámbiala cuando se confirme.
  fechaExamen: "2026-11-28T10:00:00",
};

/* ============================================================
   CÓDIGO
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  document.querySelectorAll("[data-price]").forEach(el => (el.textContent = CONFIG.precioApp));
  document.querySelectorAll("[data-link]").forEach(a => {
    const url = CONFIG.enlaces[a.dataset.link];
    if (url && url !== "#") a.href = url;
  });

  // Cambio de tema claro / oscuro
  const themeBtn = document.getElementById("themeBtn");
  const root = document.documentElement;
  function updateThemeLabel() {
    const dark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
  }
  updateThemeLabel();
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    updateThemeLabel();
  });

  // Menú móvil
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    })
  );

  // Cuenta atrás
  const d = document.getElementById("cdD");
  const h = document.getElementById("cdH");
  const m = document.getElementById("cdM");
  const target = new Date(CONFIG.fechaExamen).getTime();

  function tick() {
    let diff = Math.max(0, target - Date.now());
    d.textContent = Math.floor(diff / 86400000);
    h.textContent = Math.floor((diff % 86400000) / 3600000);
    m.textContent = Math.floor((diff % 3600000) / 60000);
  }
  tick();
  setInterval(tick, 30000);
});
