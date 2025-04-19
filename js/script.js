import { gsap } from "./gsap-core.js";

const containers = gsap.utils.toArray(".section-1");
containers.forEach((container) => {
  gsap.to(container, {
    autoAlpha: 1,
    ease: "power1.in",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: true
    }
  });
});