import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Geolocation from "ol/Geolocation";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

export const init = (view) => {
  const geolocation = new Geolocation({
    projection: view.getProjection(),
    trackingOptions: {
      enableHighAccuracy: true,
    },
  });

  geolocation.setTracking(true);

  geolocation.on("change", function () {
    const accuracy = geolocation.getAccuracy();
    const altitude = geolocation.getAltitude();
    const altitudeAccuracy = geolocation.getAltitudeAccuracy();
    const heading = geolocation.getHeading();
    const speed = geolocation.getSpeed();
    console.log({ accuracy, altitude, altitudeAccuracy, heading, speed });
  });

  geolocation.on("error", function (error) {
    const info = document.getElementById("info");
    info.innerHTML = error.message;
    info.style.display = "";
  });

  const accuracyFeature = new Feature();
  geolocation.on("change:accuracyGeometry", function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });

  const positionFeature = new Feature();
  positionFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: "#3399CC",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 2,
        }),
      }),
    })
  );

  geolocation.on("change:position", function () {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
  });

  return { accuracyFeature, positionFeature };
};
