import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Филиалы и локации — CyberGuard Academy',
  description:
    'Филиалы и локации CyberGuard Academy: города, адреса, контактные данные и информация о площадках для обучения.',
  alternates: {
    canonical: `${SITE_URL}/locations`,
  },
};

const locations = [
  {
    city: 'Минск (основная)',
    address: 'ул. Аэродромная, 125',
    phone: 'Уточняйте через форму',
    email: 'Уточняйте через форму',
    note: 'Основная локация проекта. Для уточнения деталей используйте форму связи на сайте.',
  },
  {
    city: 'Минск / Arena City',
    address: 'Пр. Победителей, 84, Arena City (2-й этаж)',
    phone: 'Уточняйте через форму',
    email: 'Уточняйте через форму',
    note: 'Дополнительная площадка в Минске. Детали записи и формата уточняйте через сайт.',
  },
  {
    city: 'Гродно',
    address: 'ул. 17 сентября, 49А / ул. Титова, 14',
    phone: '+375-29-739-85-88',
    email: 'grodno@kiber-one.com',
    note: 'Для заявок и обращений по филиалу Гродно можно использовать форму на сайте с выбором соответствующего филиала.',
  },
  {
    city: 'Брест',
    address: 'ул. Советская, 85 / ул. Варшавское шоссе, 43',
    phone: '+375-29-765-22-50',
    email: 'brest@kiber-one.com',
    note: 'Для заявок и обращений по филиалу Брест можно использовать форму на сайте с выбором соответствующего филиала.',
  },
  {
    city: 'Борисов',
    address: 'ул. Строителей, 26',
    phone: '+375 29 633-27-79',
    email: 'Уточняйте через форму',
    note: 'Если по филиалу Борисов нужны детали, рекомендуем использовать страницу контактов для уточнения информации.',
  },
];

export default function LocationsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Локации"
          title="Филиалы и площадки CyberGuard Academy"
          subtitle="Здесь собраны основные города, адреса и контактные данные, связанные с обучением и записью"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Card key={location.city + location.address} variant="default">
              <CardContent>
                <div className="text-2xl mb-3">📍</div>
                <h2 className="text-xl font-semibold text-white mb-4">{location.city}</h2>

                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Адрес</div>
                    <div className="text-gray-300">{location.address}</div>
                  </div>

                  <div>
                    <div className="text-gray-500 mb-1">Телефон</div>
                    <div className="text-gray-300">{location.phone}</div>
                  </div>

                  <div>
                    <div className="text-gray-500 mb-1">Email</div>
                    <div className="text-gray-300 break-all">{location.email}</div>
                  </div>

                  <div className="pt-2 border-t border-cyber-border">
                    <div className="text-gray-400 text-sm leading-relaxed">{location.note}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
