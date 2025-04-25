gsap.registerPlugin(ScrollTrigger);

gsap.to("#view1", {
  opacity: 0,
  scrollTrigger: {
    trigger: "#view1",
    start: "20% 20%", // when top of the text hits center of viewport
    end: "bottom 70%",   // when bottom of the text hits top of viewport
    scrub: true,         // smooth scrub based on scroll position
    // markers: true,       // show markers for debugging
  }
});

gsap.to("#fadeLeft", {
  xPercent: -100,
  yPercent: -50,
  scrollTrigger: {
    trigger: "#view1",
    start: "20% 20%", // when top of the text hits center of viewport
    end: "bottom 70%",   // when bottom of the text hits top of viewport
    scrub: true,         // smooth scrub based on scroll position
    x: -400,
    y: 0,
    // markers: true,       // show markers for debugging
  }
});

gsap.to("#fadeRight", {
  xPercent: 100,
  yPercent: 50,
  scrollTrigger: {
    trigger: "#view1",
    start: "20% 20%", // when top of the text hits center of viewport
    end: "bottom 70%",   // when bottom of the text hits top of viewport
    scrub: true,         // smooth scrub based on scroll position
    x: 400,
    y: 0,
    // markers: true,       // show markers for debugging
  }
});