import { t } from "../i18n.js";
import { icon, esc, toast } from "./ui.js";
export const uploadView = () =>
  `<div class="upload-zone" id="drop-zone"><span class="icon-box large">${icon("upload")}</span><h3>${t("Glissez votre document ici")}</h3><label class="text-link file-label" for="file-input">${t("ou choisissez un fichier")}</label><input type="file" id="file-input" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" aria-describedby="upload-help upload-error"><p id="upload-help">${t("PDF, JPG ou PNG · 5 Mo maximum")}</p></div><div id="upload-error" class="field-error" role="alert"></div><div id="file-list"></div><button type="button" class="button secondary" id="demo-file">${icon("plus")}${t("Ajouter un justificatif fictif")}</button>`;
export function bindUpload(files) {
  const timers = new Set();
  const zone = document.querySelector("#drop-zone");
  const error = document.querySelector("#upload-error");
  const input = document.querySelector("#file-input");
  function draw() {
    document.querySelector("#file-list").innerHTML = files
      .map(
        (f, i) =>
          `<div class="file-row">${icon("file")}<div><strong>${esc(f.name)}</strong><small>${esc(f.type)} · ${Math.ceil(f.size / 1024)} Ko · ${t(f.progress === 100 ? "Prêt" : "Fichier en cours de préparation…")}</small><progress max="100" value="${f.progress}" aria-label="${esc(f.name)}"></progress></div><button type="button" class="icon-button" data-remove-file="${i}" aria-label="${t("Supprimer")} ${esc(f.name)}">${icon("x")}</button></div>`,
      )
      .join("");
    document.querySelectorAll("[data-remove-file]").forEach(
      (b) =>
        (b.onclick = () => {
          files.splice(Number(b.dataset.removeFile), 1);
          draw();
        }),
    );
  }
  function add(file) {
    error.textContent = "";
    if (file.size > 5 * 1024 * 1024) {
      error.textContent = t("Ce fichier dépasse la taille autorisée de 5 Mo.");
      return;
    }
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      error.textContent = t("Choisissez un fichier PDF, JPG ou PNG.");
      return;
    }
    const record = {
      name: file.name,
      type: file.type,
      size: file.size,
      progress: 0,
    };
    files.push(record);
    draw();
    const timer = setInterval(() => {
      record.progress = Math.min(100, record.progress + 25);
      draw();
      if (record.progress === 100) {
        clearInterval(timer);
        timers.delete(timer);
        toast("Document ajouté");
      }
    }, 140);
    timers.add(timer);
  }
  input.onchange = () => {
    Array.from(input.files).forEach(add);
    input.value = "";
  };
  document.querySelector("#demo-file").onclick = () =>
    add({
      name: "justificatif-demonstration.pdf",
      type: "application/pdf",
      size: 24800,
    });
  zone.ondragover = (e) => {
    e.preventDefault();
    zone.classList.add("dragging");
  };
  zone.ondragleave = () => zone.classList.remove("dragging");
  zone.ondrop = (e) => {
    e.preventDefault();
    zone.classList.remove("dragging");
    Array.from(e.dataTransfer.files).forEach(add);
  };
  draw();
  return () => {
    timers.forEach(clearInterval);
    files.forEach((f) => (f.progress = 100));
  };
}
