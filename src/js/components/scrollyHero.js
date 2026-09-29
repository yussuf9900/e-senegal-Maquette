/**
 * e-Sénégal — Scrollytelling Hero Controller (Apple-style scrub)
 * Synchronise une séquence d'images WebP haute résolution / vidéo sur Canvas
 * avec les calques 3D glassmorphism et le ScrollTrigger de GSAP.
 */

const TOTAL_FRAMES = 120;
const FRAME_PREFIX = "assets/sequence/frame_";
const FRAME_EXT = ".webp";

let images = [];
let loadedCount = 0;
let currentFrame = 0;
let isLoaded = false;
let scrollTriggerInstance = null;
let animationFrameId = null;
let canvas, ctx;

/**
 * Formate le numéro de frame sur 4 chiffres (0001, 0002, ...)
 */
function getFramePath(index) {
  const num = String(index + 1).padStart(4, "0");
  return `${FRAME_PREFIX}${num}${FRAME_EXT}`;
}

/**
 * Précharge la séquence d'images progressivement
 */
function preloadImages(onFirstFrameReady) {
  images = new Array(TOTAL_FRAMES);
  loadedCount = 0;
  isLoaded = false;

  // 1. Charge la première frame immédiatement pour un affichage instantané
  const firstImg = new Image();
  firstImg.src = getFramePath(0);
  firstImg.onload = () => {
    images[0] = firstImg;
    loadedCount++;
    if (onFirstFrameReady) onFirstFrameReady();
    
    // 2. Charge les autres frames en arrière-plan par vagues
    loadRemainingFrames();
  };
  firstImg.onerror = () => {
    console.warn("Impossible de charger la première frame de la séquence.");
  };
}

function loadRemainingFrames() {
  for (let i = 1; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    img.onload = () => {
      images[i] = img;
      loadedCount++;
      if (loadedCount >= TOTAL_FRAMES) {
        isLoaded = true;
      }
    };
    img.onerror = () => {
      // Si une frame échoue, on continue
      loadedCount++;
    };
  }
}

/**
 * Dessine la frame active sur le canvas avec un comportement "object-fit: cover"
 */
function renderFrame(index) {
  if (!canvas || !ctx) return;
  const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  const img = images[clampedIndex] || images[0];
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;
  const imgRatio = imgW / imgH;
  const canvasRatio = w / h;

  let drawW, drawH, offsetX, offsetY;

  if (canvasRatio > imgRatio) {
    drawW = w;
    drawH = w / imgRatio;
    offsetX = 0;
    offsetY = (h - drawH) / 2;
  } else {
    drawH = h;
    drawW = h * imgRatio;
    offsetX = (w - drawW) / 2;
    offsetY = 0;
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

/**
 * Adapte la résolution du canvas au DPI de l'écran
 */
function resizeCanvas() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const targetW = Math.round(rect.width * dpr);
  const targetH = Math.round(rect.height * dpr);

  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }
    renderFrame(currentFrame);
  }
}

/**
 * Initialise le Scrollytelling Hero
 */
export function initScrollyHero() {
  destroyScrollyHero();

  const wrapper = document.querySelector("#hero-experience");
  canvas = document.querySelector("#hero-scrolly-canvas");
  if (!wrapper || !canvas) return;

  ctx = canvas.getContext("2d", { alpha: false });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  resizeCanvas();

  const handleResize = () => resizeCanvas();
  window.addEventListener("resize", handleResize, { passive: true });

  // Préchargement avec affichage de la frame 0 dès que prête
  preloadImages(() => {
    renderFrame(0);
  });

  // Si GSAP et ScrollTrigger sont disponibles, on configure la timeline synchronisée
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const phase1 = document.querySelector("#scrolly-phase-1");
    const phase2 = document.querySelector("#scrolly-phase-2");
    const phase3 = document.querySelector("#scrolly-phase-3");
    const cards = document.querySelectorAll(".glass-card-3d");

    // Objet frame virtuel que GSAP va animer
    const frameObj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          // Mise à jour de la frame vidéo
          const targetFrame = Math.round(self.progress * (TOTAL_FRAMES - 1));
          if (targetFrame !== currentFrame) {
            currentFrame = targetFrame;
            renderFrame(currentFrame);
          }
        },
      },
    });

    scrollTriggerInstance = tl.scrollTrigger;

    // Timeline des transitions de contenu :
    // Phase 1 : 0% -> 25% (visible au départ, puis s'estompe avec translation vers le haut)
    tl.to(
      phase1,
      {
        autoAlpha: 0,
        y: -50,
        scale: 0.94,
        ease: "power1.inOut",
        duration: 0.25,
      },
      0.1,
    );

    // Phase 2 : 25% -> 65% (apparition des cartes 3D en perspective)
    if (phase2) {
      tl.fromTo(
        phase2,
        { autoAlpha: 0, y: 60, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.25 },
        0.28,
      );

      // Animation 3D des cartes individuelles
      if (cards.length) {
        tl.fromTo(
          cards[0],
          { rotateY: 14, rotateX: 6, z: -40, opacity: 0 },
          { rotateY: 0, rotateX: 0, z: 0, opacity: 1, duration: 0.25 },
          0.32,
        );
        if (cards[1]) {
          tl.fromTo(
            cards[1],
            { y: 40, z: -20, opacity: 0 },
            { y: 0, z: 0, opacity: 1, duration: 0.25 },
            0.34,
          );
        }
        if (cards[2]) {
          tl.fromTo(
            cards[2],
            { rotateY: -14, rotateX: 6, z: -40, opacity: 0 },
            { rotateY: 0, rotateX: 0, z: 0, opacity: 1, duration: 0.25 },
            0.36,
          );
        }
      }

      // Disparition complète de la phase 2
      tl.to(
        phase2,
        {
          autoAlpha: 0,
          y: -30,
          scale: 1.02,
          ease: "power1.inOut",
          duration: 0.15,
        },
        0.52,
      );
    }

    // Phase 3 : 66% -> 100% (Recherche centrale interactive et guichet connecté)
    if (phase3) {
      tl.fromTo(
        phase3,
        { autoAlpha: 0, y: 35, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.18 },
        0.66,
      );
    }
  }

  // Micro-tilt 3D au curseur pour les cartes glassmorphism
  initCardTilt();
}

/**
 * Active l'effet 3D interactif et de reflet lumineux sur les cartes au mouvement de la souris
 */
function initCardTilt() {
  if (!matchMedia("(hover: hover) and (min-width: 900px)").matches) return;

  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.onpointermove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (0.5 - y) * 14;
      const tiltY = (x - 0.5) * 14;

      card.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(12px)`;
    };

    card.onpointerleave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };
  });
}

/**
 * Nettoie les écouteurs et le ScrollTrigger pour éviter les fuites mémoire
 */
export function destroyScrollyHero() {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  ctx = null;
  canvas = null;
}
