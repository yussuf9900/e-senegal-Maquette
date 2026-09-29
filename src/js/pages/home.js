import { categories, procedures } from "../../data/procedures.js";
import { t } from "../i18n.js";
import { icon, button, procedureCard } from "../components/ui.js";

export function home() {
  return `
  <!-- HERO SCROLLYTELLING APPLE-STYLE -->
  <section class="hero-scrolly-wrapper" id="hero-experience">
    <div class="hero-scrolly-pinned">
      <!-- Background Canvas HD Frame Scrub -->
      <canvas id="hero-scrolly-canvas" class="hero-scrolly-canvas"></canvas>
      
      <!-- Vignette & Glow Ambiance -->
      <div class="hero-scrolly-ambient"></div>

      <!-- Scrollytelling Layers -->
      <div class="hero-scrolly-content container">
        
        <!-- PHASE 1: Vision & Emergence -->
        <div class="scrolly-phase phase-1" id="scrolly-phase-1">
          <div class="hero-glass-pod">
            <div class="hero-badge-pill">
              <span class="status-beacon"></span>
              <span>${t("Guichet Numérique National")}</span>
              <span class="badge-tag">Dakar 2026</span>
            </div>
            <h1 class="hero-title-main">
              ${t("Vos démarches publiques.")}<br>
              <span class="gradient-text">${t("Plus simples. Plus proches.")}</span>
            </h1>
            <p class="hero-subtitle">
              ${t("Un seul espace pour vos démarches administratives. Moins de déplacements, plus de temps pour ce qui compte.")}
            </p>

            <form id="hero-search" class="search hero-search-glass">
              ${icon("search")}
              <input name="q" aria-label="${t("Rechercher une démarche")}" placeholder="${t("Ex: Extrait de naissance, Passeport, Casier judiciaire...")}">
              <button aria-label="${t("Rechercher")}">${icon("arrow")}</button>
            </form>

            <div class="suggestions glass-suggestions">
              <span class="suggestions-label">${t("Fréquent :")}</span>
              ${categories
                .slice(0, 4)
                .map((c) => `<a href="#/procedures?category=${c.id}">${t(c.short)}</a>`)
                .join("")}
            </div>

            <div class="hero-scroll-cue">
              <span class="mouse-icon"><i class="wheel"></i></span>
              <span class="cue-text">${t("Faites défiler pour explorer la transformation")}</span>
            </div>
          </div>
        </div>

        <!-- PHASE 2: 3D Holographic Floating Civic Cards -->
        <div class="scrolly-phase phase-2" id="scrolly-phase-2">
          <div class="phase-2-header">
            <div class="eyebrow-pill">${icon("shield")} ${t("Sécurisé & Certifié")}</div>
            <h2>${t("Du papier au clic en un instant.")}</h2>
            <p>${t("Toutes vos pièces d'état civil et justificatifs centralisés en toute sécurité.")}</p>
          </div>
          <div class="cards-3d-cluster">
            <div class="glass-card-3d card-left tilt-card">
              <div class="card-glass-glow"></div>
              <div class="card-header">
                <span class="icon-box green">${icon("check")}</span>
                <span class="chip-status">${t("Délivré en 48h")}</span>
              </div>
              <h3>${t("Extrait de naissance")}</h3>
              <p>${t("Conforme aux registres d'état civil avec signature électronique.")}</p>
              <div class="card-footer">
                <span class="barcode-preview"></span>
                <span class="security-seal">★ ${t("QR Vérifié")}</span>
              </div>
            </div>

            <div class="glass-card-3d card-center tilt-card">
              <div class="card-glass-glow"></div>
              <div class="card-header">
                <span class="icon-box gold">${icon("shield")}</span>
                <span class="chip-status gold-chip">${t("Biométrique")}</span>
              </div>
              <h3>${t("Passeport & CNI")}</h3>
              <p>${t("Renouvellement en ligne et prise de rendez-vous sans file d'attente.")}</p>
              <div class="card-footer">
                <span class="id-number">SN-DKR-2026-992</span>
                <span class="flag-mini">🇸🇳</span>
              </div>
            </div>

            <div class="glass-card-3d card-right tilt-card">
              <div class="card-glass-glow"></div>
              <div class="card-header">
                <span class="icon-box blue">${icon("folder")}</span>
                <span class="chip-status blue-chip">${t("100% Dématérialisé")}</span>
              </div>
              <h3>${t("Guichet Entreprises")}</h3>
              <p>${t("Création de société et déclarations fiscales simplifiées.")}</p>
              <div class="card-footer">
                <span class="tag-status">${t("Validation instantanée")}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- PHASE 3: Hub Connecté & Actions Rapides -->
        <div class="scrolly-phase phase-3" id="scrolly-phase-3">
          <div class="hero-hub-island">
            <div class="hub-header">
              <div class="eyebrow-pill">${icon("globe")} ${t("Guichet Connecté")}</div>
              <h2>${t("Accédez à tous vos services publics")}</h2>
              <p>${t("Explorez l’ensemble des démarches certifiées ou suivez l’avancement de vos dossiers en temps réel.")}</p>
            </div>

            <div class="hero-actions-glass">
              ${button("Explorer les démarches", "#/procedures")}
              ${button("Suivre un dossier", "#/applications", true)}
            </div>
            <div class="hero-note-glass">
              ${icon("shield")} ${t("Simple, transparent et accessible partout")}
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- TRUST STRIP -->
  <div class="trust-strip container">
    <span>${icon("shield")} ${t("Simple, du début à la fin")}</span>
    <span>${icon("clock")} ${t("Accessible 24h/24, 7j/7")}</span>
    <span>${icon("heart")} ${t("Pensé pour vous")}</span>
    <span class="demo-tag">${t("Démonstration interactive")}</span>
  </div>

  <!-- BENTO CATEGORIES -->
  <section class="section container">
    <div class="section-heading reveal">
      <div>
        <p class="eyebrow">${t("Démarches")}</p>
        <h2>${t("Le service public, à votre portée.")}</h2>
        <p>${t("Trouvez le bon point de départ, quel que soit votre besoin.")}</p>
      </div>
      <a class="text-link" href="#/procedures">${t("Toutes les démarches")}${icon("arrow")}</a>
    </div>
    <div class="bento">
      ${categories
        .map(
          (c, i) => `
        <a class="bento-card bento-${i} reveal tilt" href="#/procedures?category=${c.id}">
          <span class="icon-box ${c.color}">${icon(c.icon)}</span>
          <div>
            <h3>${t(c.name)}</h3>
            <p>${t(c.description)}</p>
          </div>
          <div class="bento-bottom">
            <span>${procedures.filter((p) => p.category === c.id).length} ${t("démarches")}</span>
            ${icon("arrow")}
          </div>
          ${
            i === 0
              ? `<div class="identity-art" aria-hidden="true">
                  <div class="identity-chip"></div>
                  <div class="identity-head"></div>
                  <div class="identity-lines"><i></i><i></i><i></i></div>
                  <span>SÉNÉGAL <b>★</b></span>
                </div>`
              : ""
          }
        </a>`,
        )
        .join("")}
    </div>
  </section>

  <!-- POPULAR PROCEDURES -->
  <section class="section popular-section">
    <div class="container">
      <div class="section-heading reveal">
        <div>
          <p class="eyebrow">${t("Les plus demandées")}</p>
          <h2>${t("Un besoin ? Un premier pas.")}</h2>
          <p>${t("Les démarches utiles, à portée de main.")}</p>
        </div>
        <a class="text-link" href="#/procedures">${t("Tout voir")}${icon("arrow")}</a>
      </div>
      <div class="procedure-grid">
        ${procedures.slice(0, 6).map(procedureCard).join("")}
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="section container how-section">
    <div class="section-heading reveal">
      <div>
        <p class="eyebrow">${t("Comment ça marche")}</p>
        <h2>${t("Quatre étapes. Et vous avancez.")}</h2>
      </div>
      <span class="outline-label">e-Sénégal, simplement.</span>
    </div>
    <div class="steps-grid">
      ${[
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
        .join("")}
    </div>
  </section>

  <!-- CONFIDENCE / VALUES -->
  <section class="container confidence reveal">
    <div>
      <p class="eyebrow">${t("Pensé pour vous")}</p>
      <h2>${t("Un service public qui vous accompagne.")}</h2>
      <p>${t("Des démarches centralisées, un suivi clair et une expérience pensée pour votre quotidien.")}</p>
    </div>
    <div class="confidence-list">
      ${[
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
        .join("")}
    </div>
  </section>

  <!-- PUBLIC ADMINISTRATIONS -->
  <section class="section container services">
    <p class="eyebrow">${t("Services publics")}</p>
    <h2>${t("État civil, identité, mobilité : vos services dans un même espace.")}</h2>
    <div class="administrations">
      ${[
        "Collectivités territoriales",
        "Ministère de l’Intérieur",
        "Guichet des entreprises",
        "Service des transports",
      ]
        .map(
          (name, i) =>
            `<a href="#/procedures?category=${["civil", "identite", "entreprise", "transport"][i]}">${icon("building")}<span>${t(name)}</span></a>`,
        )
        .join("")}
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="final-cta container reveal">
    <div>
      <p class="eyebrow">${t("On avance, ensemble.")}</p>
      <h2>${t("Votre prochaine démarche commence ici.")}</h2>
      <p>${t("Prenez quelques minutes. Gagnez en tranquillité.")}</p>
    </div>
    ${button("Commencer une démarche", "#/procedures")}
  </section>
  `;
}

export function bindHome() {
  const searchForm = document.querySelector("#hero-search");
  if (searchForm) {
    searchForm.onsubmit = (e) => {
      e.preventDefault();
      location.hash =
        "/procedures?q=" + encodeURIComponent(new FormData(e.target).get("q"));
    };
  }
}
