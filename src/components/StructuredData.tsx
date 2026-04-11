import { ORGANIZATION_SAME_AS, SITE_URL } from '@/lib/site';

export function StructuredData() {
  const siteUrl = SITE_URL;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteUrl}/#organization`,
    name: 'CyberGuard Academy',
    description:
      'Онлайн-академия по кибербезопасности для детей и родителей: модули, квизы и практические инструменты безопасности.',
    url: siteUrl,
    sameAs: [...ORGANIZATION_SAME_AS],
    areaServed: {
      '@type': 'Country',
      name: 'Belarus',
    },
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/icon`,
      width: 32,
      height: 32,
    },
    image: [`${siteUrl}/opengraph-image`],
    inLanguage: 'ru-RU',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'BYN',
      lowPrice: '0',
      highPrice: '200',
    },
    educationalCredentialAwarded: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certificate',
      name: 'Сертификат о прохождении курса кибербезопасности',
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'CyberGuard Academy',
    description: 'Обучение кибербезопасности для детей, подростков и родителей.',
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: 'ru-RU',
    potentialAction: [
      { '@type': 'ReadAction', 'name': 'Курсы', target: `${siteUrl}/courses` },
      { '@type': 'ReadAction', 'name': 'Блог', target: `${siteUrl}/blog` },
      { '@type': 'ReadAction', 'name': 'Инструменты безопасности', target: `${siteUrl}/security-tools` },
      { '@type': 'ReadAction', 'name': 'Контакты', target: `${siteUrl}/contact` },
      { '@type': 'ReadAction', 'name': 'Запись на курс', target: `${siteUrl}/enrollment` },
    ],
  };

  const graph = [organization, website];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
