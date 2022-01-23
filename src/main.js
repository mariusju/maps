import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import { transform } from "ol/proj";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { styleFunction } from "./styles";
import { init } from "./tracking";

const center = transform([21.0871, 55.4319], "EPSG:4326", "EPSG:3857");
const view = new View({
  center,
  zoom: 12,
});

const { accuracyFeature, positionFeature } = init(view);

console.log(window.location.search);

const params = new URL(document.location).searchParams;
const route = params.get("route");

const map = new Map({
  target: "map-container",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: `./${route}.json`,
      }),
      style: styleFunction,
    }),
  ],
  view,
});

new VectorLayer({
  map: map,
  source: new VectorSource({
    features: [accuracyFeature, positionFeature],
  }),
});
