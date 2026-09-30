/* ============================================================
   CONFIGURACIÓN: edita solo esta parte
   ============================================================ */
const CONFIG = {
  precioApp: 4, // euros al mes

  enlaces: {
    app:    "#", // URL de tu app de tests
    amazon: "#", // enlace de afiliado de Amazon al libro
    pdf:    "#", // enlace de Buy Me a Coffee al PDF
  },

  // Fechas en formato AAAA-MM-DD. Deja fecha en "" si aún no está confirmada.
  calendario: [
    { hito: "Publicación de la convocatoria (DOGV)", fecha: "" },
    { hito: "Plazo de presentación de solicitudes",  fecha: "" },
    { hito: "Lista provisional de admitidos",        fecha: "" },
    { hito: "Fecha del examen",                      fecha: "" },
  ],

  // Hito que mostrará la cuenta atrás del inicio (posición en la lista de arriba)
  hitoCuentaAtras: 3,
};

/* ============================================================
   CÓDIGO
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Año del pie
  document.getElementById("year").textContent = new Date().getFullYear();

  // Precio y enlaces
  document.querySelectorAll("[data-price]").forEach(el => (el.textContent = CONFIG.precioApp));
  document.querySelectorAll("[data-link]").forEach(a => {
    const url = CONFIG.enlaces[a.dataset.link];
    if (url && url !== "#") a.href = url;
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

  // Calendario
  const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });
  const body = document.getElementById("calBody");
  CONFIG.calendario.forEach(({ hito, fecha }) => {
    const tr = document.createElement("tr");
    const tdH = document.createElement("td");
    const tdF = document.createElement("td");
    tdH.textContent = hito;
    if (fecha) {
      tdF.textContent = fmt.format(new Date(fecha + "T00:00:00"));
    } else {
      tdF.textContent = "Por confirmar";
      tdF.className = "pending";
    }
    tr.append(tdH, tdF);
    body.appendChild(tr);
  });

  // Cuenta atrás
  const item = CONFIG.calendario[CONFIG.hitoCuentaAtras];
  const num = document.getElementById("cdNumber");
  const label = document.getElementById("cdLabel");
  const title = document.getElementById("cdTitle");
  if (item && item.fecha) {
    const dias = Math.ceil((new Date(item.fecha + "T00:00:00") - new Date()) / 86400000);
    title.textContent = item.hito;
    if (dias > 0) {
      num.textContent = dias;
      label.textContent = dias === 1 ? "día restante" : "días restantes";
    } else if (dias === 0) {
      num.textContent = "Hoy";
      label.textContent = "es el día";
    } else {
      num.textContent = "✓";
      label.textContent = "fecha ya pasada";
    }
  }
});
