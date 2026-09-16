import { buildAnniversaryOg, ogAlt, ogContentType, ogSize } from "./anniversary-og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildAnniversaryOg();
}
