const reduced = matchMedia("(prefers-reduced-motion: reduce)");
let context, observer;
export function cleanupMotion() {
  context?.revert();
  observer?.disconnect();
}
export function motion() {
  cleanupMotion();
  if (reduced.matches) return;
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
      if (document.querySelector(".hero")) {
        gsap.from(".hero-copy > *", {
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: "power2.out",
          clearProps: "all",
        });
        gsap.from(".hero-art", {
          y: 20,
          opacity: 0,
          duration: 1,
          delay: 0.25,
          clearProps: "all",
        });
        if (window.ScrollTrigger)
          gsap.from(".step-number", {
            scrollTrigger: { trigger: ".steps-grid", start: "top 88%" },
            y: 18,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            clearProps: "all",
          });
      }
    });
  }
  if (matchMedia("(hover: hover) and (min-width: 900px)").matches)
    document.querySelectorAll(".tilt").forEach((el) => {
      el.onpointermove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--mouse-x", `${x * 100}%`);
        el.style.setProperty("--mouse-y", `${y * 100}%`);
        el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 1.6}deg) rotateX(${(0.5 - y) * 1.6}deg) translateY(-2px)`;
      };
      el.onpointerleave = () => (el.style.transform = "");
    });
}
reduced.addEventListener("change", () => {
  cleanupMotion();
  document
    .querySelectorAll(".motion-ready")
    .forEach((el) => el.classList.add("visible"));
});
