import { store, updateStatus } from "../store.js";
import { procedures } from "../../data/procedures.js";
import { statuses } from "../../data/statuses.js";
import { t, date } from "../i18n.js";
import { icon, button, badge, esc, empty, toast } from "../components/ui.js";
import { uploadView, bindUpload } from "../components/upload.js";
const procedure = (a) => procedures.find((p) => p.id === a.procedure);
function applicationRow(a) {
  const p = procedure(a);
  return `<a class="application-row" href="#/applications/${a.id}"><span class="icon-box">${icon(p.icon)}</span><div><h3>${t(p.name)}</h3><small>${a.id} · ${date(a.date)}</small></div>${badge(a.status)}${icon("chevron")}</a>`;
}
export function dashboard() {
  const action = store.applications.find(
    (a) => a.status === "COMPLEMENT_REQUIS",
  );
  return `<div class="container page"><header class="page-heading row-between"><div><p class="eyebrow">${t("Mon espace")} / ${t("Démonstration interactive")}</p><h1>${t("Bonjour")} ${esc(store.user.firstName)},<br><span class="muted">${t("voici où en sont vos démarches.")}</span></h1></div>${button("Nouvelle démarche", "#/procedures")}</header><div class="dashboard-layout"><div><h2>${t("Actions requises")}</h2>${action ? `<div class="action-card"><span class="icon-box gold">${icon("alert")}</span><div><p class="eyebrow">${t("Une action est nécessaire")}</p><h3>${t(procedure(action).name)}</h3><p>${t("Une pièce supplémentaire est nécessaire.")}</p><a class="button" href="#/applications/${action.id}">${t("Ajouter le document")}${icon("upload")}</a></div></div>` : `<div class="surface content-panel">${icon("check")}<h3>${t("Tout est à jour")}</h3><p>${t("Aucune action nécessaire pour le moment.")}</p></div>`}<div class="section-heading compact"><h2>${t("Mes démarches")}</h2><a class="text-link" href="#/applications">${t("Tout voir")}${icon("arrow")}</a></div><div class="surface application-list">${store.applications.slice(0, 3).map(applicationRow).join("")}</div></div><aside><div class="surface dashboard-summary"><p class="eyebrow">${t("Mes dossiers")}</p>${[
    [
      "En cours",
      store.applications.filter((a) =>
        ["SOUMIS", "EN_ETUDE"].includes(a.status),
      ).length,
    ],
    [
      "À compléter",
      store.applications.filter((a) => a.status === "COMPLEMENT_REQUIS").length,
    ],
    [
      "Terminées",
      store.applications.filter((a) => a.status === "VALIDE").length,
    ],
  ]
    .map(
      ([label, count]) =>
        `<div><span>${t(label)}</span><strong>${count.toString().padStart(2, "0")}</strong></div>`,
    )
    .join(
      "",
    )}</div><a href="#/help" class="help-card">${icon("help")}<h3>${t("Besoin d’être accompagné ?")}</h3><span class="text-link">${t("Centre d’aide")}${icon("arrow")}</span></a></aside></div></div>`;
}
export function applications() {
  return `<div class="container page"><header class="page-heading row-between"><div><p class="eyebrow">${t("Mes dossiers")}</p><h1>${t("Votre suivi, en toute clarté.")}</h1></div>${button("Nouvelle démarche", "#/procedures")}</header><form class="surface application-filters" id="application-filters"><div class="search">${icon("search")}<input name="q" aria-label="${t("Rechercher un dossier")}" placeholder="${t("Rechercher un dossier")}"></div><select name="status" aria-label="${t("Tous les statuts")}"><option value="">${t("Tous les statuts")}</option>${Object.entries(
    statuses,
  )
    .map(([key, s]) => `<option value="${key}">${s[store.language]}</option>`)
    .join(
      "",
    )}</select><select name="sort" aria-label="${t("Trier par")}"><option value="recent">${t("Plus récents")}</option><option value="old">${t("Plus anciens")}</option></select></form><p id="application-count" role="status"></p><div class="surface application-list" id="application-results"></div></div>`;
}
export function bindApplications() {
  const form = document.querySelector("#application-filters");
  const draw = () => {
    const f = Object.fromEntries(new FormData(form));
    const list = store.applications
      .filter(
        (a) =>
          (a.id + " " + t(procedure(a).name))
            .toLowerCase()
            .includes(f.q.toLowerCase()) &&
          (!f.status || a.status === f.status),
      )
      .sort(
        (a, b) =>
          (new Date(b.date) - new Date(a.date)) *
          (f.sort === "recent" ? 1 : -1),
      );
    document.querySelector("#application-count").textContent =
      list.length + " " + t("résultat(s)");
    document.querySelector("#application-results").innerHTML = list.length
      ? list.map(applicationRow).join("")
      : empty("Aucun dossier", "Vous retrouverez vos demandes ici.");
  };
  form.onsubmit = (e) => e.preventDefault();
  form.oninput = draw;
  form.onchange = draw;
  draw();
}
export function applicationDetail(a) {
  const p = procedure(a);
  return `<div class="container page"><a class="text-link" href="#/applications">${icon("chevron", "back")}${t("Retour aux dossiers")}</a><header class="page-heading row-between"><div><p class="eyebrow">${a.id}</p><h1>${t(p.name)}</h1><p>${t(p.administration)}</p></div>${badge(a.status)}</header><div class="detail-layout"><section class="surface content-panel"><h2>${t("Historique du dossier")}</h2><ol class="timeline"><li class="done"><span class="timeline-dot">${icon("check")}</span><small>${date(a.date)}</small><h3>${t("Dossier créé")}</h3><p>${t("Mon espace")}</p></li>${a.events.map((ev, i) => `<li class="${i === a.events.length - 1 ? "current" : "done"}"><span class="timeline-dot">${icon(statuses[ev.status].icon)}</span><small>${date(ev.date)}</small><h3>${statuses[ev.status][store.language]}</h3><p>${t(ev.message)}</p><small>${t(p.administration)}</small></li>`).join("")}${!["VALIDE", "REJETE", "ANNULE"].includes(a.status) ? `<li class="pending"><span class="timeline-dot"></span><h3>${t("Décision")}</h3><p>${t("En attente")}</p></li>` : ""}</ol></section><aside>${a.status === "COMPLEMENT_REQUIS" ? `<div class="surface content-panel complement"><span class="icon-box gold">${icon("alert")}</span><h2>${t("Une action est nécessaire")}</h2><p>${t("Merci d’ajouter un justificatif de domicile lisible.")}</p><small>${date(a.events.at(-1).date)}</small><h3>${t("Justificatif de domicile fictif")}</h3>${uploadView()}<button class="button full" id="send-complement">${t("Transmettre le complément")}${icon("send")}</button></div>` : `<div class="surface content-panel"><span class="icon-box">${icon(statuses[a.status].icon)}</span><h2>${statuses[a.status][store.language]}</h2><p>${t(statuses[a.status].description)}</p>${["SOUMIS", "EN_ETUDE"].includes(a.status) ? `<hr><p class="eyebrow">${t("Simulation du service instructeur")}</p><button class="button secondary full" id="simulate-complement">${t("Simuler un complément")}${icon("plus")}</button>` : ""}</div>`}<p class="disclaimer">${t("Données, tarifs et délais fictifs. Aucun document n’est transmis.")}</p></aside></div></div>`;
}
export function bindApplicationDetail(a, render) {
  const simulate = document.querySelector("#simulate-complement");
  if (simulate)
    simulate.onclick = () => {
      if (a.status === "SOUMIS")
        updateStatus(a, "EN_ETUDE", "Le service examine votre dossier.");
      updateStatus(
        a,
        "COMPLEMENT_REQUIS",
        "Merci d’ajouter un justificatif de domicile lisible.",
      );
      render();
      if (store.notifications) toast("Dossier mis à jour");
    };
  if (a.status === "COMPLEMENT_REQUIS") {
    a.complementFiles ??= [];
    const cleanup = bindUpload(a.complementFiles);
    document.querySelector("#send-complement").onclick = () => {
      if (
        !a.complementFiles.length ||
        a.complementFiles.some((f) => f.progress < 100)
      ) {
        document.querySelector("#upload-error").textContent = t(
          "Ajoutez un document avant de continuer.",
        );
        document.querySelector("#file-input").focus();
        return;
      }
      a.files = [...(a.files || []), ...a.complementFiles];
      a.complementFiles = [];
      updateStatus(
        a,
        "EN_ETUDE",
        "Complément reçu. Le service reprend l’étude de votre dossier.",
      );
      render();
      if (store.notifications) toast("Dossier mis à jour");
    };
    return cleanup;
  }
}
