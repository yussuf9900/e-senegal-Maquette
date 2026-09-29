import { initScrollyHero, destroyScrollyHero } from "./components/scrollyHero.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let context, observer;

export function cleanupMotion() {
  context?.revert();
  observer?.disconnect();
  destroyScrollyHero();
}

export function motion() {
  cleanupMotion();

  if (reduced.matches) {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("visible"));
    return;
  }

  // Initialisation du Scrollytelling Hero si présent
  if (document.querySelector("#hero-experience")) {
    initScrollyHero();
  }

  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("motion-ready");
    observer.observe(el);
  });

  if (window.gsap) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    context = gsap.context(() => {
      // Animation des étapes "Comment ça marche"
      if (document.querySelector(".steps-grid") && window.ScrollTrigger) {
        gsap.from(".step-number", {
          scrollTrigger: { trigger: ".steps-grid", start: "top 88%" },
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.55,
          ease: "power2.out",
          clearProps: "all",
        });
      }
    });
  }

  // Micro-tilt 3D pour les cartes Bento desktop
  if (matchMedia("(hover: hover) and (min-width: 900px)").matches) {
    document.querySelectorAll(".tilt").forEach((el) => {
      el.onpointermove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--mouse-x", `${x * 100}%`);
        el.style.setProperty("--mouse-y", `${y * 100}%`);
        el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 4}deg) rotateX(${(0.5 - y) * 4}deg) translateY(-4px)`;
      };
      el.onpointerleave = () => {
        el.style.transform = "";
      };
    });
  }
}

reduced.addEventListener("change", () => {
  cleanupMotion();
  document
    .querySelectorAll(".motion-ready")
    .forEach((el) => el.classList.add("visible"));
});
