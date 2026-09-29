import { store, newWizard } from "../store.js";
import { procedures } from "../../data/procedures.js";
import { t } from "../i18n.js";
import { icon, field, esc, toast } from "../components/ui.js";
import { uploadView, bindUpload } from "../components/upload.js";
export function wizard(params) {
  const id = params.get("procedure") || "naissance";
  if (!store.wizard || store.wizard.procedure !== id) newWizard(id);
  const w = store.wizard;
  const p = procedures.find((p) => p.id === w.procedure);
  return `<div class="container page wizard-page"><header class="wizard-heading"><a href="#/procedures/${p.id}" class="text-link">${icon("chevron", "back")} ${t(p.name)}</a><span class="outline-label">${t("Démonstration interactive")}</span></header><ol class="stepper" aria-label="${t("Les étapes de votre démarche")}">${["Informations", "Justificatifs", "Vérification", "Confirmation"].map((label, i) => `<li class="${i === w.step ? "current" : i < w.step ? "complete" : ""}" ${i === w.step ? 'aria-current="step"' : ""}><span>${i < w.step ? icon("check") : "0" + (i + 1)}</span><strong>${t(label)}</strong></li>`).join("")}</ol><section class="surface wizard-panel" id="wizard-content">${stepContent(w, p)}</section></div>`;
}
function stepContent(w, p) {
  if (w.step === 0)
    return `<p class="eyebrow">01 / 04</p><h1>${t("Vos informations")}</h1><p>${t("Utilisez uniquement des informations fictives.")}</p><form id="information-form" novalidate><div class="form-grid">${field("firstName", "Prénom", w.values.firstName, "text", 'autocomplete="off" maxlength="60"')}${field("lastName", "Nom", w.values.lastName, "text", 'autocomplete="off" maxlength="60"')}${field("birthDate", "Date de naissance", w.values.birthDate, "date", `max="${new Date().toISOString().slice(0, 10)}" min="1900-01-01"`)}${field("city", "Commune", w.values.city, "text", 'maxlength="80"')}${field("reference", "Référence de l’acte", w.values.reference, "text", 'placeholder="DEMO-2026-042" maxlength="80"')}</div><div class="wizard-actions"><a class="text-link" href="#/procedures/${p.id}">${t("Retour")}</a><button class="button">${t("Continuer")}${icon("arrow")}</button></div></form>`;
  if (w.step === 1)
    return `<p class="eyebrow">02 / 04</p><h1>${t("Vos justificatifs")}</h1><p>${t("Un fichier fictif suffit pour cette démonstration.")}</p><p class="notice">${p.documents.map(t).join(" · ")}</p>${uploadView()}<div class="wizard-actions"><button class="button secondary" data-step="0">${t("Retour")}</button><button class="button" id="documents-next">${t("Continuer")}${icon("arrow")}</button></div>`;
  if (w.step === 2)
    return `<p class="eyebrow">03 / 04</p><h1>${t("Vérifiez votre demande")}</h1><div class="review-block"><div class="row-between"><h3>${t("Démarche")}</h3><a class="text-link" href="#/procedures">${t("Modifier")}${icon("edit")}</a></div><p>${t(p.name)}</p></div><div class="review-block"><div class="row-between"><h3>${t("Informations personnelles")}</h3><button class="text-link" data-step="0">${t("Modifier")}${icon("edit")}</button></div><dl class="review-grid">${[
      ["firstName", "Prénom"],
      ["lastName", "Nom"],
      ["birthDate", "Date de naissance"],
      ["city", "Commune"],
      ["reference", "Référence de l’acte"],
    ]
      .map(
        ([key, label]) =>
          `<div><dt>${t(label)}</dt><dd>${esc(w.values[key])}</dd></div>`,
      )
      .join(
        "",
      )}</dl></div><div class="review-block"><div class="row-between"><h3>${t("Documents")}</h3><button class="text-link" data-step="1">${t("Modifier")}${icon("edit")}</button></div>${w.files.map((f) => `<p>${icon("file")}${esc(f.name)}</p>`).join("")}</div><label class="checkbox-label"><input type="checkbox" id="declaration" ${w.declared ? "checked" : ""} aria-describedby="declaration-error">${t("Je confirme utiliser des données fictives pour cette démonstration.")}</label><p class="field-error" id="declaration-error" role="alert"></p><div class="wizard-actions"><button class="button secondary" data-step="1">${t("Retour")}</button><button class="button" id="submit-application">${t("Soumettre ma demande")}${icon("send")}</button></div>`;
  return `<div class="confirmation"><span class="success-mark">${icon("check")}</span><p class="eyebrow">04 / 04</p><h1>${t("Demande envoyée")}</h1><p>${t("Votre dossier a été créé dans cette démonstration.")}</p><div class="reference-number">${w.applicationId}</div><a class="button" href="#/applications/${w.applicationId}">${t("Suivre mon dossier")}${icon("arrow")}</a></div>`;
}
export function bindWizard(render) {
  const w = store.wizard;
  let cleanup = () => {};
  const go = (step) => {
    w.step = step;
    render();
    document
      .querySelector("#wizard-content h1")
      ?.setAttribute("tabindex", "-1");
    document.querySelector("#wizard-content h1")?.focus();
  };
  document
    .querySelectorAll("[data-step]")
    .forEach((b) => (b.onclick = () => go(Number(b.dataset.step))));
  if (w.step === 0) {
    const form = document.querySelector("#information-form");
    form.oninput = () => {
      Object.assign(w.values, Object.fromEntries(new FormData(form)));
    };
    form.onsubmit = (e) => {
      e.preventDefault();
      Object.assign(w.values, Object.fromEntries(new FormData(form)));
      let first;
      for (const [name, value] of Object.entries(w.values)) {
        let message = !value.trim() ? "Veuillez renseigner ce champ." : "";
        if (
          name === "birthDate" &&
          value &&
          (value > new Date().toISOString().slice(0, 10) ||
            value < "1900-01-01" ||
            Number.isNaN(Date.parse(value)))
        )
          message = "Indiquez une date passée valide.";
        const input = form.elements[name];
        input.setAttribute("aria-invalid", String(!!message));
        document.querySelector("#" + name + "-error").textContent = t(message);
        if (message && !first) first = input;
      }
      if (first) {
        first.focus();
        return;
      }
      go(1);
    };
  }
  if (w.step === 1) {
    cleanup = bindUpload(w.files);
    document.querySelector("#documents-next").onclick = () => {
      if (!w.files.length || w.files.some((f) => f.progress < 100)) {
        document.querySelector("#upload-error").textContent = t(
          w.files.length
            ? "Fichier en cours de préparation…"
            : "Ajoutez un document avant de continuer.",
        );
        document.querySelector("#file-input").focus();
        return;
      }
      go(2);
    };
  }
  if (w.step === 2) {
    document.querySelector("#declaration").onchange = (e) =>
      (w.declared = e.target.checked);
    document.querySelector("#submit-application").onclick = () => {
      if (!w.declared) {
        document.querySelector("#declaration-error").textContent = t(
          "Confirmez la déclaration pour envoyer la demande.",
        );
        document
          .querySelector("#declaration")
          .setAttribute("aria-invalid", "true");
        document.querySelector("#declaration").focus();
        return;
      }
      const b = document.querySelector("#submit-application");
      b.disabled = true;
      b.innerHTML = `<span class="spinner"></span>${t("Envoi en cours…")}`;
      document
        .querySelectorAll("[data-step]")
        .forEach((x) => (x.disabled = true));
      const timer = setTimeout(() => {
        const id =
          "ES-2026-" +
          String(
            1247 + store.applications.filter((a) => a.created).length,
          ).padStart(6, "0");
        const now = new Date().toISOString();
        store.applications.unshift({
          id,
          procedure: w.procedure,
          status: "SOUMIS",
          date: now,
          created: true,
          values: { ...w.values },
          files: structuredClone(w.files),
          events: [
            {
              status: "SOUMIS",
              date: now,
              message: "Votre demande a bien été reçue.",
            },
          ],
        });
        w.applicationId = id;
        go(3);
      }, 900);
      cleanup = () => clearTimeout(timer);
    };
  }
  return cleanup;
}
