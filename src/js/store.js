import { initialApplications } from "../data/applications.js";
const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};
export const store = {
  language: read("es-language", "fr"),
  theme: read(
    "es-theme",
    matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  ),
  loggedIn: false,
  user: {
    firstName: "Youssou",
    lastName: "Diop",
    email: "demo@esenegal.sn",
    city: "Dakar",
  },
  applications: structuredClone(initialApplications),
  notifications: true,
  wizard: null,
  returnTo: null,
};
if (!["fr", "wo"].includes(store.language)) store.language = "fr";
if (!["dark", "light"].includes(store.theme)) store.theme = "light";
export function preference(key, value) {
  store[key] = value;
  try {
    localStorage.setItem("es-" + key, value);
  } catch {}
}
export function seenIntro() {
  const seen = read("es-intro", "");
  try {
    localStorage.setItem("es-intro", "1");
  } catch {}
  return !!seen;
}
export function newWizard(procedure = "naissance") {
  store.wizard = {
    procedure,
    step: 0,
    values: {
      firstName: "",
      lastName: "",
      birthDate: "",
      city: "Dakar",
      reference: "",
    },
    files: [],
    declared: false,
  };
  return store.wizard;
}
export function updateStatus(application, status, message) {
  application.status = status;
  application.events.push({ status, date: new Date().toISOString(), message });
}
