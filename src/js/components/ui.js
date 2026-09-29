import { t, money } from "../i18n.js";
import { store } from "../store.js";
import { statuses } from "../../data/statuses.js";
const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  search: "m21 21-4.3-4.3 M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0",
  check: "m5 12 4 4L19 6",
  x: "m6 6 12 12M6 18 18 6",
  file: "M14 2H6a2 2 0 0 0-2 2v16h16V8zM14 2v6h6M8 12h8M8 16h5",
  id: "M3 5h18v14H3zM7 9h2v3H7zM6 15h4M14 9h4M14 13h4",
  home: "m3 10 9-7 9 7v11h-7v-7h-4v7H3z",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18",
  car: "m5 4-3 8v7h3v-3h14v3h3v-7l-3-8zM2 12h20M6 13v1M18 13v1",
  briefcase: "M3 7h18v14H3zM8 7V3h8v4M3 12c6 3 12 3 18 0M12 11v5",
  receipt: "M5 2v20l3-2 4 2 4-2 3 2V2zM9 7h6M9 11h6M9 15h4",
  heart: "M20 4c-3-2-6 0-8 2-2-2-5-4-8-2-7 6 8 16 8 16S27 10 20 4Z",
  clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M12 7v5l3 2",
  sun: "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0M12 1v2M12 21v2M1 12h2M21 12h2M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2",
  moon: "M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z",
  user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2",
  chevron: "m9 5 7 7-7 7",
  down: "m6 9 6 6 6-6",
  shield: "m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6zM8 12l3 3 5-6",
  upload: "M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5",
  edit: "m16 3 5 5-12 12-6 1 1-6zM13 6l5 5",
  send: "m22 2-7 20-4-9-9-4zM11 13 22 2",
  alert: "m12 3 10 18H2zM12 9v5M12 17v1",
  plus: "M12 5v14M5 12h14",
  folder: "M3 5h6l2 3h10v13H3z",
  help: "M9 8a3 3 0 1 1 5 3c-2 1-2 2-2 3M12 17v1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  building:
    "M4 21V8h16v13M2 21h20M8 12v2M12 12v2M16 12v2M8 17v4M16 17v4M2 8l10-6 10 6z",
  logout: "M9 3H3v18h6M9 12h13m-5-5 5 5-5 5",
  bell: "M18 8a6 6 0 0 0-12 0v7l-2 3h16l-2-3zM10 21h4",
  filter: "M3 5h18M6 12h12M9 19h6",
};
export const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name] || paths.file}"/></svg>`;
export const esc = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const button = (label, href, secondary = false) =>
  `<a class="button ${secondary ? "secondary" : ""}" href="${href}">${t(label)}${icon("arrow")}</a>`;
export function badge(status) {
  const s = statuses[status];
  return `<span class="badge ${s.color}">${icon(s.icon)}${s[store.language]}</span>`;
}
export function procedureCard(p) {
  return `<a class="procedure-card surface" href="#/procedures/${p.id}"><div class="card-top"><span class="icon-box">${icon(p.icon)}</span><span class="online ${p.online ? "" : "appointment"}">${t(p.online ? "En ligne" : "Sur rendez-vous")}</span></div><h3>${t(p.name)}</h3><p>${t(p.description)}</p><div class="card-bottom"><span>${icon("clock")}${p.days} ${t("jours")}</span><span>${money(p.fee)}</span><span class="circle-arrow">${icon("arrow")}</span></div></a>`;
}
export const empty = (
  title = "Aucun résultat",
  text = "Essayez un autre mot ou retirez un filtre.",
) =>
  `<div class="empty"><span class="icon-box">${icon("search")}</span><h3>${t(title)}</h3><p>${t(text)}</p></div>`;
export function toast(message) {
  const host = document.querySelector("#toasts");
  host.innerHTML = `<div class="toast">${icon("check")} ${esc(t(message))}</div>`;
  setTimeout(() => host.replaceChildren(), 3500);
}
export const breadcrumb = (items) =>
  `<nav class="breadcrumb" aria-label="Fil d’Ariane"><a href="#/">${t("Accueil")}</a>${items.map(([label, href]) => `${icon("chevron")}${href ? `<a href="${href}">${t(label)}</a>` : `<span>${t(label)}</span>`}`).join("")}</nav>`;
export const field = (name, label, value = "", type = "text", extra = "") =>
  `<div class="field"><label for="${name}">${t(label)}</label><input id="${name}" name="${name}" type="${type}" value="${esc(value)}" aria-describedby="${name}-error" ${extra}><span id="${name}-error" class="field-error"></span></div>`;
export function modal(title, content) {
  const host = document.querySelector("#overlay");
  const previous = document.activeElement;
  host.innerHTML = `<dialog><div class="modal-heading"><h2>${t(title)}</h2><button class="icon-button" aria-label="${t("Fermer")}" data-close>${icon("x")}</button></div>${content}</dialog>`;
  const dialog = host.querySelector("dialog");
  dialog.showModal();
  dialog.querySelector("[data-close]").onclick = () => dialog.close();
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    host.replaceChildren();
    previous?.focus();
  });
}
