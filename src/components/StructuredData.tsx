export function StructuredData() {
  const siteUrl = 'https://cyberguard-academy.vercel.app';

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteUrl}/#organization`,
    name: 'CyberGuard Academy',
    description:
      'Онлайн-академия по кибербезопасности для детей и родителей: модули, квизы и практические инструменты безопасности.',
    url: siteUrl,
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
  };

  const graph = [organization, website];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  );
}
