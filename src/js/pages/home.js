import { categories, procedures } from "../../data/procedures.js";
import { t } from "../i18n.js";
import { icon, button, procedureCard } from "../components/ui.js";
export function home() {
  return `<section class="hero container"><div class="hero-copy"><div class="eyebrow"><span class="status-dot"></span>${t("Votre quotidien, simplifié.")}</div><h1>${t("Vos démarches publiques.")}<br><span>${t("Plus simples.")}<br>${t("Plus proches.")}</span></h1><p class="hero-description">${t("Un seul espace pour vos démarches administratives. Moins de déplacements, plus de temps pour ce qui compte.")}</p><form id="hero-search" class="search hero-search">${icon("search")}<input name="q" aria-label="${t("Rechercher une démarche")}" placeholder="${t("Quelle démarche souhaitez-vous effectuer ?")}"><button aria-label="${t("Rechercher")}">${icon("arrow")}</button></form><div class="suggestions">${categories
    .slice(0, 4)
    .map((c) => `<a href="#/procedures?category=${c.id}">${t(c.short)}</a>`)
    .join(
      "",
    )}</div><div class="hero-actions">${button("Explorer les démarches", "#/procedures")}${button("Suivre un dossier", "#/applications", true)}</div><div class="hero-note">${icon("shield")} ${t("Simple, du début à la fin")}</div></div><div class="hero-art" aria-label="Illustration originale de la corniche de Dakar"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><div class="art-frame"><img src="assets/images/dakar.svg" alt="Illustration de Dakar : océan, corniche, architecture et pirogue" width="600" height="660"><div class="art-caption"><span>14°41′ N · 17°26′ O</span><strong>${t("Un nouveau regard sur le service public.")}</strong></div></div><div class="float-card float-top"><span class="icon-box green">${icon("check")}</span><div><small>${t("Extrait de naissance")}</small><strong>${t("Demande envoyée")}</strong></div><span class="tiny-dot"></span></div><div class="float-card float-bottom"><div class="mini-avatar">YD</div><div><strong>${t("Tout au même endroit")}</strong><small>${t("Pensé pour vous")}</small></div>${icon("shield")}</div><span class="art-star" aria-hidden="true">✳</span><div class="art-index"><span>01 —</span> TERANGA NUMÉRIQUE</div></div></section>
<div class="trust-strip container"><span>${icon("shield")}${t("Simple, du début à la fin")}</span><span>${icon("clock")}${t("Accessible à tout moment")}</span><span>${icon("heart")}${t("Pensé pour vous")}</span><span class="demo-tag">${t("Démonstration interactive")}</span></div>
<section class="section container"><div class="section-heading reveal"><div><p class="eyebrow">${t("Démarches")}</p><h2>${t("Le service public, à votre portée.")}</h2><p>${t("Trouvez le bon point de départ, quel que soit votre besoin.")}</p></div><a class="text-link" href="#/procedures">${t("Toutes les démarches")}${icon("arrow")}</a></div><div class="bento">${categories.map((c, i) => `<a class="bento-card bento-${i} reveal tilt" href="#/procedures?category=${c.id}"><span class="icon-box ${c.color}">${icon(c.icon)}</span><div><h3>${t(c.name)}</h3><p>${t(c.description)}</p></div><div class="bento-bottom"><span>${procedures.filter((p) => p.category === c.id).length} ${t("démarches")}</span>${icon("arrow")}</div>${i === 0 ? `<div class="identity-art" aria-hidden="true"><div class="identity-chip"></div><div class="identity-head"></div><div class="identity-lines"><i></i><i></i><i></i></div><span>SÉNÉGAL <b>★</b></span></div>` : ""}</a>`).join("")}</div></section>
<section class="section popular-section"><div class="container"><div class="section-heading reveal"><div><p class="eyebrow">${t("Les plus demandées")}</p><h2>${t("Un besoin ? Un premier pas.")}</h2><p>${t("Les démarches utiles, à portée de main.")}</p></div><a class="text-link" href="#/procedures">${t("Tout voir")}${icon("arrow")}</a></div><div class="procedure-grid">${procedures.slice(0, 6).map(procedureCard).join("")}</div></div></section>
<section class="section container how-section"><div class="section-heading reveal"><div><p class="eyebrow">${t("Comment ça marche")}</p><h2>${t("Quatre étapes. Et vous avancez.")}</h2></div><span class="outline-label">e-Sénégal, simplement.</span></div><div class="steps-grid">${[
    [
      "Trouver",
      "Choisissez votre démarche et découvrez les pièces utiles.",
      "search",
    ],
    [
      "Constituer",
      "Rassemblez vos informations et vos justificatifs.",
      "folder",
    ],
    ["Envoyer", "Vérifiez votre dossier avant de le soumettre.", "send"],
    ["Suivre", "Retrouvez chaque avancée dans votre espace citoyen.", "clock"],
  ]
    .map(
      ([title, desc, ic], i) =>
        `<article class="how-step reveal"><div class="step-number">0${i + 1}<span>${icon(ic)}</span></div><h3>${t(title)}</h3><p>${t(desc)}</p></article>`,
    )
    .join("")}</div></section>
<section class="container confidence reveal"><div><p class="eyebrow">${t("Pensé pour vous")}</p><h2>${t("Un service public qui vous accompagne.")}</h2><p>${t("Des démarches centralisées, un suivi clair et une expérience pensée pour votre quotidien.")}</p></div><div class="confidence-list">${[
    [
      "folder",
      "Tout au même endroit",
      "Vos dossiers sont regroupés dans votre espace personnel.",
    ],
    [
      "clock",
      "Un suivi à chaque étape",
      "Consultez l’avancement et les messages du service.",
    ],
    [
      "heart",
      "Disponible à votre rythme",
      "Préparez votre dossier quand cela vous convient.",
    ],
  ]
    .map(
      ([ic, title, desc]) =>
        `<div>${icon(ic)}<div><h3>${t(title)}</h3><p>${t(desc)}</p></div></div>`,
    )
    .join("")}</div></section>
<section class="section container services"><p class="eyebrow">${t("Services publics")}</p><h2>${t("État civil, identité, mobilité : vos services dans un même espace.")}</h2><div class="administrations">${["Collectivités territoriales", "Ministère de l’Intérieur", "Guichet des entreprises", "Service des transports"].map((name, i) => `<a href="#/procedures?category=${["civil", "identite", "entreprise", "transport"][i]}">${icon("building")}<span>${t(name)}</span></a>`).join("")}</div></section><section class="final-cta container reveal"><div><p class="eyebrow">${t("On avance, ensemble.")}</p><h2>${t("Votre prochaine démarche commence ici.")}</h2><p>${t("Prenez quelques minutes. Gagnez en tranquillité.")}</p></div>${button("Commencer une démarche", "#/procedures")}</section>`;
}
export function bindHome() {
  document.querySelector("#hero-search").onsubmit = (e) => {
    e.preventDefault();
    location.hash =
      "/procedures?q=" + encodeURIComponent(new FormData(e.target).get("q"));
  };
}
