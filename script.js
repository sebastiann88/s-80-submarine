import {
  ViewerApp,
  addBasePlugins,
  DiamondPlugin,
  AssetManagerPlugin,
  ScrollableCameraViewPlugin,
  Vector3
} from "https://dist.pixotronics.com/webgi/runtime/bundle-0.10.4.mjs";

async function setupViewer() {
  // Initialize the viewer
  const viewer = new ViewerApp({
    canvas: document.getElementById("mcanvas"),
  });

  // Add all the plugins at once
  await addBasePlugins(viewer);
  await viewer.addPlugin(ScrollableCameraViewPlugin);
  await viewer.addPlugin(DiamondPlugin);

  // This must be called after adding any plugin that changes the render pipeline.
  viewer.renderer.refreshPipeline();

  // Load a 3d model.
  await viewer.load(
    "./s-80-submarine.glb"
  );

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
}

setupViewer();