import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";

export const defaultStyle = function (feature) {
  var gType = feature.getGeometry().getType();
  var Point = new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: "rgba(255,0,41,0.5)",
      }),
      radius: 5,
      stroke: new Stroke({
        color: "#ec00ca",
        width: 1,
      }),
    }),
    text: new Text({
      font: "14px Calibri",
      text: feature.get("name"),
      placement: "line",
      offsetY: -12,
      // offsetX: 2,
      fill: new Fill({
        color: "purple",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 1,
      }),
    }),
  });
  var LineString = new Style({
    stroke: new Stroke({
      color: "#f00",
      width: 3,
    }),
    text: new Text({
      font: "14px Calibri",
      text: feature.get("name"),
      placement: "line",
      fill: new Fill({
        color: "purple",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 1,
      }),
    }),
  });
  var Polygon = new Style({
    fill: new Fill({
      color: "rgba(0,255,255,0.5)",
    }),
    stroke: new Stroke({
      color: "#0ff",
      width: 1,
    }),
    text: new Text({
      font: "14px Calibri",
      text: feature.get("name"),
      placement: "line",
      fill: new Fill({
        color: "purple",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 1,
      }),
    }),
  });
  var MultiPoint = new Style({
    image: new CircleStyle({
      fill: new Fill({
        color: "rgba(255,0,255,0.5)",
      }),
      radius: 5,
      stroke: new Stroke({
        color: "#f0f",
        width: 1,
      }),
    }),
    text: new Text({
      font: "14px Calibri",
      text: feature.get("name"),
      placement: "line",
      fill: new Fill({
        color: "purple",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 1,
      }),
    }),
  });
  var MultiLineString = new Style({
    stroke: new Stroke({
      color: "#0f0",
      width: 3,
    }),
    text: new Text({
      font: "14px Calibri",
      text: feature.get("name"),
      placement: "line",
      fill: new Fill({
        color: "purple",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 1,
      }),
    }),
  });
  var MultiPolygon = new Style({
    fill: new Fill({
      color: "rgba(0,0,255,0.5)",
    }),
    stroke: new Stroke({
      color: "#00f",
      width: 1,
    }),
    text: new Text({
      font: "14px Calibri",
      text: feature.get("name"),
      placement: "line",
      fill: new Fill({
        color: "purple",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 1,
      }),
    }),
  });
  if (gType === "Point") {
    return Point;
  } else if (gType === "LineString") {
    return LineString;
  } else if (gType === "Polygon") {
    return Polygon;
  } else if (gType === "MultiPoint") {
    return MultiPoint;
  } else if (gType === "MultiLineString") {
    return MultiLineString;
  } else if (gType === "MultiPolygon") {
    return MultiPolygon;
  }
}

export const styleFunction = function (feature, resolution) {
  var featureStyleFunction = feature.getStyleFunction();
  if (featureStyleFunction) {
    return featureStyleFunction.call(feature, resolution);
  } else {
    return defaultStyle(feature);
  }
};
