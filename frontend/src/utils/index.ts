function addressShortener(address: string) {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
}

const MIN_ZOOM = 0.78;
const MAX_ZOOM = 22;
const MIN_MARKER_DIM = 20;
const MAX_MARKER_DIM = 200;

const DEFAULT_ZOOM = 10;

function normalizeMarkerDim(zoom: number) {
  return (zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM) * (MAX_MARKER_DIM - MIN_MARKER_DIM) + MIN_MARKER_DIM;
}

export {
  addressShortener,
  normalizeMarkerDim,
  DEFAULT_ZOOM
};