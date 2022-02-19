import Overlay from "ol/Overlay";
import { FullScreen } from "ol/control";

const container = document.getElementById("popup");
const contentElement = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");

export const usePopup = (map) => {
  closer.onclick = () => {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };
  const overlay = new Overlay({
    element: container,
    autoPan: true,
    offset: [0, -10],
  });
  map.addOverlay(overlay);

  const fullscreen = new FullScreen();
  map.addControl(fullscreen);

  map.on("click", (evt) => {
    const feature = map.forEachFeatureAtPixel(
      evt.pixel,
      (feature, layer) => feature
    );
    if (feature) {
      const geometry = feature.getGeometry();
      const coord = geometry.getCoordinates();

      let content = "<h3>" + feature.get("name") + "</h3>";
      content += "<h5>" + feature.get("description") + "</h5>";

      contentElement.innerHTML = content;
      overlay.setPosition(coord);

      console.info(feature.getProperties());
    }
  });

  map.on("pointermove", (e) => {
    if (e.dragging) {
      return;
    }
    const pixel = map.getEventPixel(e.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getViewport().style.cursor = hit ? "pointer" : "";
  });
};
