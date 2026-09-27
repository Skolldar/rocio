// GSAP-driven text animations for the hero title/description. Each slide gets a
// distinct entrance so cycling through the deck feels varied.

import { gsap } from "gsap";

// Wraps each character in an inline-block span so letters can be staggered
// independently. Spaces become non-breaking spaces to preserve word gaps.
// `visible` keeps the letters shown, for splitting text that is already on screen.
export const splitText = (text: string, visible = false): string =>
  text
    .split("")
    .map(
      (char) =>
        `<span style="display: inline-block; opacity: ${visible ? 1 : 0};">${char === " " ? "&nbsp;" : char}</span>`
    )
    .join("");

// Animates the current title/description out before their content is swapped.
export const animateTitleOut = (titleEl: HTMLElement, descEl: HTMLElement): void => {
  gsap.to(titleEl.children, { y: -20, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power2.in" });
  gsap.to(descEl, { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" });
};

// Animates the freshly swapped title/description in. The entrance style is
// chosen by slide index, falling back to a slide-up for any extra slides.
export const animateTitleIn = (idx: number, titleEl: HTMLElement, descEl: HTMLElement): void => {
  gsap.set(titleEl.children, { opacity: 0 });
  gsap.set(descEl, { y: 20, opacity: 0 });

  const children = titleEl.children;
  switch (idx) {
    case 0:
      gsap.set(children, { y: 20 });
      gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
      gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      break;
    case 1:
      gsap.set(children, { y: -20 });
      gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)" });
      gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      break;
    case 2:
      gsap.set(children, { filter: "blur(10px)", scale: 1.5, y: 0 });
      gsap.to(children, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1, stagger: { amount: 0.5, from: "random" }, ease: "power2.out" });
      gsap.to(descEl, { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" });
      break;
    case 3:
      gsap.set(children, { scale: 0, y: 0 });
      gsap.to(children, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.5)" });
      gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      break;
    case 4:
      gsap.set(children, { rotationX: 90, y: 0, transformOrigin: "50% 50%" });
      gsap.to(children, { rotationX: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" });
      gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" });
      break;
    case 5:
      gsap.set(children, { x: 30, y: 0 });
      gsap.to(children, { x: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
      gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      break;
    default:
      gsap.set(children, { y: 20 });
      gsap.to(children, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: "power3.out" });
      gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
  }
};
