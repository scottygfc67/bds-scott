import type { Metadata } from "next";

export const SITE_NAME = "Briggs Digital Solutions";
export const SITE_ORIGIN = "https://briggsdigitalsolutions.com";
export const SITE_URL = new URL(SITE_ORIGIN);

export const DEFAULT_TITLE = "Briggs Digital Solutions | Websites That Do More";
export const DEFAULT_DESCRIPTION =
  "Design-led websites, management systems and digital tools built around how your business actually works. Based in Belfast, working across the UK and Ireland.";

export const SOCIAL_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: canonicalUrl,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export function absoluteUrl(path: `/${string}` | "/" = "/") {
  return new URL(path, SITE_URL).toString();
}
