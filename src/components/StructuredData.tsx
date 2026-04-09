export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'CyberGuard Academy',
    description: 'Онлайн-академия по кибербезопасности для детей и родителей',
    url: 'https://cyberguard-academy.vercel.app',
    logo: 'https://cyberguard-academy.vercel.app/opengraph-image',
    sameAs: [
      // Добавь ссылки на соцсети когда будут
    ],
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
