import Configs from '../../config';

export const baseMetadata = ({ url }) => ({
  title: Configs.site_title,
  description: Configs.site_description,
  keywords: Configs.site_keywords.map((it) => it.keyword).join(','),
  author: 'Simone Corsi',
  canonical: Configs.base_url + url,
});

export const twitterMetadata = ({
  title,
  description,
  url,
}: {
  title?: string;
  description?: string;
  url: string;
  }) => ({
    'og:site_name': Configs.site_title,
    'og:url': Configs.base_url + url,
    'og:title': title ? [title, Configs.site_title].join(' | ') : '',
    'og:description': description ? description : Configs.site_description,
    'og:image': Configs.base_url + '/og_image.png',
    'og:type': 'article',
  });

export const openGraphMetadata = ({
  title,
  description,
  url,
}: {
  title?: string;
  description?: string;
  url: string;
}) => ({
  'og:site_name': Configs.site_title,
  'og:url': Configs.base_url + url,
  'og:title': title ? [title, Configs.site_title].join(' | ') : '',
  'og:description': description ? description : Configs.site_description,
  'og:image': Configs.base_url + '/og_image.png',
  'og:type': 'article',
});
