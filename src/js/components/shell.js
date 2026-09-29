import { store } from "../store.js";
import { t } from "../i18n.js";
import { icon } from "./ui.js";
export function shell(path) {
  const active = (p) => (path.startsWith(p) ? "active" : "");
  document.querySelector("#shell").innerHTML =
    `<header class="navbar"><a class="brand" href="#/" aria-label="e-Sénégal — ${t("Accueil")}"><span class="brand-symbol">e<span></span></span><span>e-Sénégal<span class="brand-period">.</span></span></a><nav class="desktop-nav" aria-label="Navigation principale"><a class="${active("/procedures")}" href="#/procedures">${t("Démarches")}</a><a class="${active("/applications")}" href="#/applications">${t("Mes dossiers")}</a><a class="${active("/help")}" href="#/help">${t("Aide")}</a></nav><div class="nav-actions"><label class="language-label"><span class="sr-only">${t("Langue")}</span><select id="language" aria-label="${t("Langue")}"><option value="fr" ${store.language === "fr" ? "selected" : ""}>FR</option><option value="wo" ${store.language === "wo" ? "selected" : ""}>WO</option></select></label><button class="icon-button theme-toggle" data-theme-toggle aria-label="${t(store.theme === "light" ? "Mode sombre" : "Mode clair")}">${icon(store.theme === "light" ? "moon" : "sun")}</button><a class="button nav-account" href="#/${store.loggedIn ? "dashboard" : "login"}">${icon("user")}${t("Mon espace")}</a></div></header><nav class="bottom-nav" aria-label="Navigation mobile">${[
      ["/", "home", "Accueil"],
      ["/procedures", "search", "Démarches"],
      ["/applications", "folder", "Dossiers"],
      ["/profile", "user", "Profil"],
    ]
      .map(
        ([href, ic, label]) =>
          `<a href="#${href}" class="${href === "/" ? (path === "/" ? "active" : "") : active(href)}" ${path === href ? 'aria-current="page"' : ""}>${icon(ic)}<span>${t(label)}</span></a>`,
      )
      .join("")}</nav>`;
  document.querySelector("#footer").innerHTML =
    `<footer class="container"><div class="footer-top"><a class="brand" href="#/"><span class="brand-symbol">e<span></span></span>e-Sénégal.</a><p>${t("Un Sénégal plus proche de vous.")}</p><a href="#/help">${t("Centre d’aide")}${icon("arrow")}</a></div><div class="footer-bottom"><span>© 2026 e-Sénégal · ${t("Prototype indépendant · Aucune démarche officielle")}</span><span class="flag-mark" aria-hidden="true"><i></i><i></i><i></i></span></div></footer>`;
}
