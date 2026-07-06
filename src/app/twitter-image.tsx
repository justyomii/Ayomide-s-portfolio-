import { buildOgImage, ogImageAlt, ogImageSize } from "@/lib/og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = "image/png";

export default async function Image() {
  return buildOgImage();
}
