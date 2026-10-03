import type { Metadata } from "next";

export const SITE_NAME = "Briggs Digital Solutions";
export const SITE_ORIGIN = "https://briggsdigitalsolutions.com";
export const SITE_URL = new URL(SITE_ORIGIN);

export const DEFAULT_TITLE = "Briggs Digital Solutions | Websites That Do More";
export const DEFAULT_DESCRIPTION =
  "Design-led websites, management systems and digital tools built around how your business actually works. Based in Belfast, working across the UK and Ireland.";

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
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}

export function absoluteUrl(path: `/${string}` | "/" = "/") {
  return new URL(path, SITE_URL).toString();
}
