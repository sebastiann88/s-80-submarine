import {
  ViewerApp,
  addBasePlugins,
  ScrollableCameraViewPlugin,
  CanvasTexture,
  Vector3,
  DoubleSide,
} from "https://dist.pixotronics.com/webgi/runtime/bundle-0.10.4.mjs";

async function setupViewer() {
  // Initialize the viewer
  const viewer = new ViewerApp({
    canvas: document.getElementById("mcanvas"),
  });

  // Add all the plugins at once
  await addBasePlugins(viewer);
  await viewer.addPlugin(ScrollableCameraViewPlugin);

  // This must be called after adding any plugin that changes the render pipeline.
  viewer.renderer.refreshPipeline();

  // Load a 3D model
  await viewer.load("./img/s-80-submarine.glb");

  // Load an environment map
  // await viewer.setEnvironmentMap(
  //     "https://dist.pixotronics.com/webgi/assets/hdr/gem_2.hdr.png?v=1"
  // );

  viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
  viewer.scene.activeCamera.position.set(1.8857891050, 0.7629809200, 3.9780318071);
  viewer.scene.activeCamera.positionTargetUpdated();

  let updatedCamera = false;
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      // How much a section is scrolled (0-1)
      const sectionOffset =
        (window.scrollY % window.innerHeight) / window.innerHeight;
      // Index of the section
      const sectionI = Math.floor(window.scrollY / window.innerHeight);

      // Rotate camera around object so that 1 rotation for every section.
      const t = 2 * Math.PI * sectionOffset;
      const radius = 10;

      // Set camera position around object in a circle.
      viewer.scene.activeCamera.position.set(
        radius * Math.sin(t),
        5 + sectionI * 3,
        radius * Math.cos(t)
      );
      updatedCamera = true;
    }, 50); // Debounce delay
  });

  viewer.addEventListener("postFrame", () => {
    if (updatedCamera) {
      // Notify that the camera position and target are updated. This is done in postFrame so that it happens only once per frame.
      viewer.scene.activeCamera.positionUpdated();
      updatedCamera = false;
    }
  });

  // Annotations

  const annotation = document.querySelector(".annotation");
  const annotationtext = document.querySelector(".annotationtext");

  const numberTexture = new CanvasTexture(document.querySelector("#number"));

  // const spriteMaterial = viewer.createMaterial("basic", {
  //   map: numberTexture,
  //   alphaTest: 0.5,
  //   transparent: true,
  //   depthTest: false,
  //   depthWrite: false,
  //   side: DoubleSide,
  // });

  const annotationPosition = new Vector3(0, -0.2, 1.5);

  // Dynamically fetch the loaded GLB model's first mesh
  const mesh = viewer.scene.children.find((obj) => obj.isMesh);

  if (!mesh) {
    console.error("No mesh object found in the scene.");
    return;
  }

  const camera = viewer.scene.activeCamera.cameraObject;

  let spriteBehindObject = false;

  function updateAnnotationOpacity() {
    const meshDistance = camera.position.distanceTo(mesh.position);
    const spriteDistance = camera.position.distanceTo(annotationPosition);
    spriteBehindObject = spriteDistance > meshDistance;
  }

  function updateScreenPosition() {
    const vector = annotationPosition.clone();
    const canvas = viewer.canvas;

    vector.project(camera);

    vector.x = Math.round(
      (0.5 + vector.x / 2) * (canvas.width / viewer.renderer.displayCanvasScaling)
    );
    vector.y = Math.round(
      (0.5 - vector.y / 2) * (canvas.height / viewer.renderer.displayCanvasScaling)
    );

    annotation.style.top = `${vector.y}px`;
    annotation.style.left = `${vector.x}px`;
    annotation.style.opacity = spriteBehindObject ? 0.5 : 1;
    annotationtext.style.opacity = spriteBehindObject ? 0 : 1;

    if (spriteBehindObject) {
      annotation.classList.add("annotationhide");
      annotationtext.classList.add("annotationtext");
    } else {
      annotation.classList.remove("annotationhide");
      annotationtext.classList.remove("annotationtext");
    }
  }

  updateAnnotationOpacity();
  updateScreenPosition();

  viewer.addEventListener("postRender", () => {
    updateAnnotationOpacity();
    updateScreenPosition();
  });
}

setupViewer();