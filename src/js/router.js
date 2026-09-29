import { store } from "./store.js";
import { procedures } from "../data/procedures.js";
import { home, bindHome } from "./pages/home.js";
import { catalogue, bindCatalogue, detail } from "./pages/procedures.js";
import {
  login,
  bindLogin,
  profile,
  bindProfile,
  help,
  bindHelp,
  notFound,
} from "./pages/account.js";
import {
  dashboard,
  applications,
  bindApplications,
  applicationDetail,
  bindApplicationDetail,
} from "./pages/applications.js";
import { wizard, bindWizard } from "./pages/wizard.js";
export function resolve() {
  const hash = location.hash.slice(1) || "/";
  const [path, query] = hash.split("?");
  const params = new URLSearchParams(query);
  if (
    /^\/(applications|dashboard|profile)(\/|$)/.test(path) &&
    !store.loggedIn
  ) {
    store.returnTo = hash;
    location.replace("#/login");
    return null;
  }
  if (path === "/")
    return { path, html: home(), bind: bindHome, title: "Accueil" };
  if (path === "/procedures")
    return {
      path,
      html: catalogue(params),
      bind: bindCatalogue,
      title: "Démarches",
    };
  if (/^\/procedures\/[^/]+$/.test(path)) {
    const p = procedures.find((p) => p.id === path.split("/")[2]);
    if (p) return { path, html: detail(p), title: p.name };
  }
  if (path === "/login")
    return { path, html: login(), bind: bindLogin, title: "Se connecter" };
  if (path === "/dashboard")
    return { path, html: dashboard(), title: "Mon espace" };
  if (path === "/applications")
    return {
      path,
      html: applications(),
      bind: bindApplications,
      title: "Mes dossiers",
    };
  if (
    path === "/applications/new" &&
    procedures.some((p) => p.id === (params.get("procedure") || "naissance"))
  )
    return {
      path,
      html: wizard(params),
      bind: bindWizard,
      title: "Nouvelle démarche",
    };
  if (/^\/applications\/[^/]+$/.test(path)) {
    const a = store.applications.find((a) => a.id === path.split("/")[2]);
    if (a)
      return {
        path,
        html: applicationDetail(a),
        bind: (render) => bindApplicationDetail(a, render),
        title: "Mes dossiers",
      };
  }
  if (path === "/profile")
    return { path, html: profile(), bind: bindProfile, title: "Mon profil" };
  if (path === "/help")
    return { path, html: help(), bind: bindHelp, title: "Centre d’aide" };
  return { path, html: notFound(), title: "404" };
}
