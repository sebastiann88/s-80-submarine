import { gsap } from "./gsap-core.js";
import { ScrollTrigger } from "./ScrollTrigger.min.js";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".fade-text", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".fade-text",
    start: "top center", // when top of the text hits center of viewport
    end: "bottom top",   // when bottom of the text hits top of viewport
    scrub: true,         // smooth scrub based on scroll position
  }
});