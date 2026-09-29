import { store, preference } from "../store.js";
import { t } from "../i18n.js";
import { icon, field, toast, modal, empty, esc } from "../components/ui.js";
import { faqs } from "../../data/help.js";
export function login() {
  return `<div class="container page login-layout"><div class="login-story"><p class="eyebrow">${t("Mon espace")}</p><h1>${t("Bienvenue dans votre espace.")}</h1><p>${t("Retrouvez vos démarches, là où vous les avez laissées.")}</p><div class="login-art">${icon("folder")}<div>${icon("check")} ${t("Un suivi à chaque étape")}</div></div><span>${icon("shield")}${t("Connexion simulée, valable uniquement pour cette session.")}</span></div><section class="surface login-card"><span class="icon-box">${icon("user")}</span><h2>${t("Se connecter")}</h2><div class="notice"><strong>${t("Compte de démonstration")}</strong><p>demo@esenegal.sn<br>demo123</p><button class="text-link" id="autofill">${t("Utiliser le compte démo")}${icon("arrow")}</button></div><form id="login-form" novalidate>${field("email", "Adresse e-mail", "", "email", 'autocomplete="off"')}${field("password", "Mot de passe", "", "password", 'autocomplete="off"')}<p class="field-error" id="login-error" role="alert"></p><button class="button full">${t("Se connecter")}${icon("arrow")}</button></form><p class="disclaimer">${t("Connexion simulée, valable uniquement pour cette session.")}</p></section></div>`;
}
export function bindLogin() {
  document.querySelector("#autofill").onclick = () => {
    document.querySelector("#email").value = "demo@esenegal.sn";
    document.querySelector("#password").value = "demo123";
    document.querySelector("#login-form button").focus();
  };
  document.querySelector("#login-form").onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (
      data.get("email") !== "demo@esenegal.sn" ||
      data.get("password") !== "demo123"
    ) {
      document.querySelector("#login-error").textContent = t(
        "Vérifiez les identifiants fictifs affichés ci-dessus.",
      );
      for (const input of e.target.querySelectorAll("input")) {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", "login-error");
      }
      document.querySelector("#email").focus();
      return;
    }
    store.loggedIn = true;
    toast("Session de démonstration ouverte");
    const target = store.returnTo || "/dashboard";
    store.returnTo = null;
    location.hash = target;
  };
}
export function profile() {
  return `<div class="container page narrow"><header class="page-heading"><p class="eyebrow">${t("Mon profil")}</p><h1>${t("Un espace à votre image.")}</h1></header><section class="surface content-panel"><div class="profile-heading"><span class="avatar">YD</span><div><h2>${esc(store.user.firstName)} ${esc(store.user.lastName)}</h2><p>${t("Compte de démonstration")}</p></div></div><form id="profile-form" novalidate><div class="form-grid">${field("firstName", "Prénom", store.user.firstName)}${field("lastName", "Nom", store.user.lastName)}${field("profileEmail", "Adresse e-mail", store.user.email, "email", "readonly")}${field("city", "Commune", store.user.city)}</div><button class="button">${t("Enregistrer")}${icon("check")}</button><p class="disclaimer">${t("Utilisez uniquement des informations fictives.")}</p></form></section><section class="surface content-panel preferences"><h2>${t("Préférences")}</h2><div><span>${t("Langue")}</span><select aria-label="${t("Langue")}" id="profile-language"><option value="fr" ${store.language === "fr" ? "selected" : ""}>Français</option><option value="wo" ${store.language === "wo" ? "selected" : ""}>Wolof</option></select></div><div><span>${t("Apparence")}</span><button class="button secondary" data-theme-toggle>${icon(store.theme === "light" ? "moon" : "sun")}${t(store.theme === "light" ? "Mode sombre" : "Mode clair")}</button></div><div><label for="notifications">${t("Notifications simulées")}<small>${t("Recevoir les mises à jour de mes dossiers dans la démo.")}</small></label><input class="switch" type="checkbox" id="notifications" ${store.notifications ? "checked" : ""}></div></section><button class="button secondary" id="logout">${icon("logout")}${t("Se déconnecter")}</button></div>`;
}
export function bindProfile(render) {
  document.querySelector("#profile-form").onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let invalid = false;
    for (const key of ["firstName", "lastName", "city"]) {
      const input = e.target.elements[key];
      const blank = !data.get(key).trim();
      input.setAttribute("aria-invalid", String(blank));
      document.querySelector("#" + key + "-error").textContent = blank
        ? t("Veuillez renseigner ce champ.")
        : "";
      if (blank && !invalid) {
        input.focus();
        invalid = true;
      }
    }
    if (invalid) return;
    for (const key of ["firstName", "lastName", "city"])
      store.user[key] = data.get(key).trim();
    document.querySelector(".profile-heading h2").textContent =
      store.user.firstName + " " + store.user.lastName;
    toast("Profil mis à jour");
  };
  document.querySelector("#profile-language").onchange = (e) => {
    preference("language", e.target.value);
    render();
    toast("Préférence enregistrée");
  };
  document.querySelector("#notifications").onchange = (e) => {
    store.notifications = e.target.checked;
    toast("Préférence enregistrée");
  };
  document.querySelector("#logout").onclick = () => {
    store.loggedIn = false;
    store.wizard = null;
    location.hash = "/";
    toast("Session terminée");
  };
}
export function help() {
  return `<div class="container page narrow"><header class="page-heading center"><p class="eyebrow">${t("Centre d’aide")}</p><h1>${t("Comment pouvons-nous vous aider ?")}</h1></header><div class="search surface">${icon("search")}<input id="help-search" aria-label="${t("Rechercher dans l’aide")}" placeholder="${t("Rechercher dans l’aide")}"></div><div class="tabs" role="group" aria-label="${t("Démarches")}">${[
    ["", "Toutes"],
    ["demo", "Démonstration interactive"],
    ["documents", "Documents"],
    ["suivi", "Suivre"],
  ]
    .map(
      ([key, label]) =>
        `<button data-help-category="${key}" class="${key === "" ? "active" : ""}" aria-pressed="${key === ""}">${t(label)}</button>`,
    )
    .join(
      "",
    )}</div><div id="faq-list"></div><div class="surface assistance"><span class="icon-box">${icon("help")}</span><h2>${t("Besoin d’être accompagné ?")}</h2><button id="assistance" class="button">${t("Contacter l’assistance")}${icon("arrow")}</button></div></div>`;
}
export function bindHelp() {
  let category = "";
  const draw = () => {
    const q = document.querySelector("#help-search").value.toLowerCase();
    const found = faqs.filter(
      (f) =>
        (!category || f.category === category) &&
        t(f.q + "")
          .toLowerCase()
          .includes(q),
    );
    document.querySelector("#faq-list").innerHTML = found.length
      ? found
          .map(
            (f) =>
              `<details><summary>${t(f.q)}${icon("plus")}</summary><p>${t(f.a)}</p></details>`,
          )
          .join("")
      : empty();
  };
  document.querySelector("#help-search").oninput = draw;
  document.querySelectorAll("[data-help-category]").forEach(
    (b) =>
      (b.onclick = () => {
        category = b.dataset.helpCategory;
        document.querySelectorAll("[data-help-category]").forEach((x) => {
          x.classList.toggle("active", x === b);
          x.setAttribute("aria-pressed", String(x === b));
        });
        draw();
      }),
  );
  document.querySelector("#assistance").onclick = () =>
    modal(
      "Assistance de démonstration",
      `<p>${t("Non. Cet espace est un prototype indépendant. Toutes les données sont fictives.")}</p><ol class="number-list"><li>${t("Choisissez votre démarche et découvrez les pièces utiles.")}</li><li>${t("Ouvrez le dossier concerné et utilisez Ajouter le document. Le suivi se met à jour immédiatement.")}</li></ol>`,
    );
  draw();
}
export function notFound() {
  return `<div class="container page empty not-found"><span class="huge-number">404</span><h1>${t("Cette page a pris un autre chemin.")}</h1><a class="button" href="#/">${t("Revenir à l’accueil")}${icon("arrow")}</a></div>`;
}
