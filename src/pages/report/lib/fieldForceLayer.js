import { ScatterplotLayer } from "@deck.gl/layers";

const SELECTED_COLOR = [239, 68, 68];
const DEFAULT_COLOR = [37, 99, 235];

export function buildFieldForceLayer(data, { id = "field-force", onClick, selectedCode } = {}) {
  return new ScatterplotLayer({
    id,
    data,
    getPosition: (d) => [d.position.lng, d.position.lat],
    getRadius: 9000,
    radiusMinPixels: 7,
    radiusMaxPixels: 16,
    getFillColor: (d) => (d.code === selectedCode ? SELECTED_COLOR : DEFAULT_COLOR),
    getLineColor: [255, 255, 255],
    lineWidthMinPixels: 2,
    stroked: true,
    pickable: true,
    onClick: (info) => info.object && onClick?.(info.object),
    updateTriggers: { getFillColor: [selectedCode] },
  });
}

export const DHAKA_CENTER = { lat: 23.8103, lng: 90.4125 };
