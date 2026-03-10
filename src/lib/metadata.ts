import type { Metadata } from "next";
import Configs from "../../config";

export const getMetadata = (url = "/"): Metadata => {
  const fullUrl = `${Configs.base_url}${url}`;
  const title = Configs.site_title;
  const description = Configs.site_description;
  const keywords = Configs.site_keywords.map((it) => it.keyword).join(",");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Simone Corsi" }],
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: title,
      images: [
        {
          url: `${Configs.base_url}/og_image.png`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: Configs.twitter_account,
      images: [`${Configs.base_url}/og_image.png`],
    },
  };
};
