gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TweenLite);

window.onload = function() {

  ScrollTrigger.create({
    trigger: ".section-1",
    start: "95.8% 95.2%",
    end: "top top",
    // markers: true,
    onEnter: () => {
      TweenLite.set("#canvasContainer", {
        opacity: 1,
      });
    },
    onLeaveBack: () => {
      TweenLite.set("#canvasContainer", {
        opacity: 0,
      });
    },
    immediateRender: false,
  });

  ScrollTrigger.create({
    trigger: ".section-3",
    start: "95.8% bottom",
    end: "bottom bottom",
    // markers: true,
    onEnter: () => {
      TweenLite.set("#canvasContainer", {
        opacity: 0,
      });
    },
    onLeaveBack: () => {
      TweenLite.set("#canvasContainer", {
        opacity: 1,
      });
    },
    immediateRender: false,
  });

  gsap.to(".section-1", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".section-1",
      start: "30% 15%", // when top of the text hits center of viewport
      end: "bottom 75%",   // when bottom of the text hits top of viewport
      scrub: true,         // smooth scrub based on scroll position
      // markers: true,       // show markers for debugging
    },
    immediateRender: true,
  });
  
  gsap.to(".fade-left1", {
    xPercent: -20,
    yPercent: 0,
    scrollTrigger: {
      trigger: ".section-1",
      start: "30% 15%",
      end: "bottom 75%",
      scrub: true,
      x: -100,
      y: 0,
      // markers: true,
    },
    immediateRender: true,
  });
  
  gsap.to(".fade-right1", {
    xPercent: 20,
    yPercent: 0,
    scrollTrigger: {
      trigger: ".section-1",
      start: "30% 15%",
      end: "bottom 75%",
      scrub: true,
      x: 400,
      y: 0,
      // markers: true,
    },
    immediateRender: true,
  });
  
  gsap.to(".section-2", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".section-2",
      start: "20% 20%",
      end: "bottom 85%",
      scrub: true,
      // markers: true,
    },
    immediateRender: true,
  });
  
  gsap.to(".fade-left2", {
    xPercent: -20,
    yPercent: 0,
    scrollTrigger: {
      trigger: ".section-2",
      start: "20% 20%",
      end: "bottom 75%",
      scrub: true,
      x: -400,
      y: 0,
      // markers: true,
    },
    immediateRender: true,
  });
  
  gsap.to(".fade-right2", {
    xPercent: 20,
    yPercent: 0,
    scrollTrigger: {
      trigger: ".section-2",
      start: "20% 20%",
      end: "bottom 75%",
      scrub: true,
      x: 400,
      y: 0,
      // markers: true,
    },
    immediateRender: true,
  });

  gsap.to(".section-3", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".section-3",
      start: "top 2%",
      end: "bottom 80%",
      scrub: true,
      // markers: true,
    },
    immediateRender: false,
  });
  
  gsap.to(".fade-left3", {
    xPercent: -20,
    yPercent: 0,
    scrollTrigger: {
      trigger: ".section-3",
      start: "top -15%",
      end: "bottom 0%",
      scrub: true,
      x: -400,
      y: 0,
      // markers: true,
    },
    immediateRender: true,
  });

  gsap.to(".fade-right3", {
    xPercent: 20,
    yPercent: 0,
    scrollTrigger: {
      trigger: ".section-3",
      start: "top 2%",
      end: "bottom 0%",
      scrub: true,
      x: -400,
      y: 0,
      // markers: true,
    },
    immediateRender: true,
  });
  
  // gsap.to(".fade-right4", {
  //   xPercent: 100,
  //   yPercent: 0,
  //   scrollTrigger: {
  //     trigger: ".section-4",
  //     start: "20% 20%",
  //     end: "bottom 75%",
  //     scrub: true,
  //     x: 400,
  //     y: 0,
  //     // markers: true,
  //   },
  //   immediateRender: true,
  // });
};