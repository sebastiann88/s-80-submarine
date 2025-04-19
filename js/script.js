const containers = gsap.utils.toArray(".container");
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