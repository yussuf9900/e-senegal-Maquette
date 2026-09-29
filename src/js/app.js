import { store, preference, seenIntro } from "./store.js";
import { t } from "./i18n.js";
import { shell } from "./components/shell.js";
import { toast, icon } from "./components/ui.js";
import { resolve } from "./router.js";
import { motion, cleanupMotion } from "./motion.js";
let dispose, activeTransition;
function transition(update) {
  if (
    !document.startViewTransition ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    update();
    return;
  }
  activeTransition?.skipTransition();
  activeTransition = document.startViewTransition(update);
  activeTransition.ready.catch(() => {});
  activeTransition.finished.catch(() => {});
}
export function render() {
  const page = resolve();
  if (!page) return;
  dispose?.();
  cleanupMotion();
  document.documentElement.lang = store.language;
  document.documentElement.dataset.theme = store.theme;
  document.title = t(page.title) + " — e-Sénégal";
  shell(page.path);
  document.querySelector("#main").innerHTML = page.html;
  document.querySelector("#overlay").replaceChildren();
  document.querySelector("#language").onchange = (e) => {
    preference("language", e.target.value);
    render();
    toast("Préférence enregistrée");
  };
  dispose = page.bind?.(render);
  motion();
}
function navigate() {
  if (
    store.wizard?.step === 3 &&
    !location.hash.startsWith("#/applications/new")
  )
    store.wizard = null;
  const update = () => {
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.querySelector("#main").focus({ preventScroll: true });
  };
  transition(update);
}
window.addEventListener("hashchange", navigate);
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-theme-toggle]")) {
    const update = () => {
      preference("theme", store.theme === "light" ? "dark" : "light");
      document.documentElement.dataset.theme = store.theme;
      document.querySelectorAll("[data-theme-toggle]").forEach((b) => {
        b.setAttribute(
          "aria-label",
          t(store.theme === "light" ? "Mode sombre" : "Mode clair"),
        );
        b.innerHTML =
          icon(store.theme === "light" ? "moon" : "sun") +
          (b.classList.contains("theme-toggle")
            ? ""
            : t(store.theme === "light" ? "Mode sombre" : "Mode clair"));
      });
    };
    transition(update);
  }
});
window.addEventListener(
  "scroll",
  () =>
    document
      .querySelector(".navbar")
      ?.classList.toggle("scrolled", scrollY > 30),
  { passive: true },
);
render();
if (!seenIntro() && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const intro = document.createElement("div");
  intro.className = "intro";
  intro.setAttribute("aria-hidden", "true");
  intro.innerHTML =
    '<span class="brand-symbol">e<span></span></span><strong>e-Sénégal.</strong>';
  document.body.append(intro);
  setTimeout(() => intro.remove(), 1400);
}
