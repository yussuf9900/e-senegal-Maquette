import { categories, procedures } from "../../data/procedures.js";
import { t, money } from "../i18n.js";
import {
  icon,
  button,
  breadcrumb,
  procedureCard,
  empty,
  esc,
} from "../components/ui.js";
import { faqs } from "../../data/help.js";
export function catalogue(params) {
  return `<div class="container page">${breadcrumb([["Démarches"]])}<header class="page-heading"><p class="eyebrow">${t("Catalogue des démarches")}</p><h1>${t("Tout commence par un besoin.")}</h1><p>${t("Recherchez, comparez et préparez votre prochaine démarche.")}</p></header><form id="filters" class="filters surface"><div class="search">${icon("search")}<input name="q" value="${esc(params.get("q") || "")}" placeholder="${t("Rechercher une démarche")}" aria-label="${t("Rechercher une démarche")}"></div><div class="filter-grid"><label>${t("Démarches")}<select name="category"><option value="">${t("Toutes les catégories")}</option>${categories.map((c) => `<option value="${c.id}" ${params.get("category") === c.id ? "selected" : ""}>${t(c.name)}</option>`).join("")}</select></label><label>${t("Disponibilité")}<select name="online"><option value="">${t("Toutes")}</option><option value="1">${t("En ligne uniquement")}</option></select></label><label>${t("Coût")}<select name="cost"><option value="">${t("Tous les tarifs")}</option><option value="free">${t("Gratuit uniquement")}</option></select></label><label>${t("Trier par")}<select name="sort"><option value="default">${t("Pertinence")}</option><option value="days">${t("Délai le plus court")}</option><option value="fee">${t("Coût croissant")}</option></select></label></div></form><div class="results-heading"><span id="result-count" role="status"></span><button class="text-link" id="reset">${t("Réinitialiser")}${icon("x")}</button></div><div class="procedure-grid" id="results"></div><p class="disclaimer">${icon("help")}${t("Données, tarifs et délais fictifs. Aucun document n’est transmis.")}</p></div>`;
}
const normalize = (value) =>
  value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
export function bindCatalogue() {
  const form = document.querySelector("#filters");
  function filter() {
    const f = Object.fromEntries(new FormData(form));
    let list = procedures.filter(
      (p) =>
        normalize(t(p.name) + " " + t(p.description)).includes(
          normalize(f.q),
        ) &&
        (!f.category || p.category === f.category) &&
        (!f.online || p.online) &&
        (!f.cost || p.fee === 0),
    );
    if (["days", "fee"].includes(f.sort))
      list.sort((a, b) => a[f.sort] - b[f.sort]);
    document.querySelector("#results").innerHTML = list.length
      ? list.map(procedureCard).join("")
      : empty();
    document.querySelector("#result-count").textContent =
      `${list.length} ${t("résultat(s)")}`;
  }
  form.onsubmit = (e) => e.preventDefault();
  form.oninput = filter;
  form.onchange = filter;
  document.querySelector("#reset").onclick = () => {
    form.reset();
    form.elements.q.value = "";
    form.elements.category.value = "";
    filter();
  };
  filter();
}
export function detail(p) {
  return `<div class="container page">${breadcrumb([["Démarches", "#/procedures"], [p.name]])}<div class="detail-layout"><article><header class="page-heading"><span class="icon-box large">${icon(p.icon)}</span><p class="eyebrow">${t(categories.find((c) => c.id === p.category).name)}</p><h1>${t(p.name)}</h1><p>${t(p.description)}</p></header><div class="surface content-panel"><h2>${t("Documents nécessaires")}</h2><p>${t("À préparer")}</p><ul class="check-list">${p.documents.map((d) => `<li>${icon("check")} ${t(d)}</li>`).join("")}</ul><hr><h3>${t("Conditions")}</h3><p>${t(p.condition)}</p></div><section class="content-panel"><h2>${t("Les étapes de votre démarche")}</h2><ol class="number-list">${["Rassemblez vos informations et vos justificatifs.", "Vérifiez votre dossier avant de le soumettre.", "Retrouvez chaque avancée dans votre espace citoyen."].map((x) => `<li>${t(x)}</li>`).join("")}</ol></section><h2>${t("Questions fréquentes")}</h2>${faqs
    .slice(0, 3)
    .map(
      (f) =>
        `<details><summary>${t(f.q)}${icon("plus")}</summary><p>${t(f.a)}</p></details>`,
    )
    .join(
      "",
    )}</article><aside class="surface sticky-summary"><span class="online">${t(p.online ? "En ligne" : "Sur rendez-vous")}</span><dl><div><dt>${icon("clock")}${t("Temps estimé")}</dt><dd>${p.days} ${t("jours")}</dd></div><div><dt>${icon("receipt")}${t("Coût indicatif")}</dt><dd>${money(p.fee)}</dd></div><div><dt>${icon("building")}${t("Administration")}</dt><dd>${t(p.administration)}</dd></div></dl>${button("Commencer la démarche", `#/applications/new?procedure=${p.id}`)}<p class="disclaimer">${icon("shield")}${t("Données, tarifs et délais fictifs. Aucun document n’est transmis.")}</p></aside></div></div>`;
}
