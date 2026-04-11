import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Условия использования — CyberGuard Academy',
  description:
    'Условия использования сайта CyberGuard Academy: правила работы с материалами, формами, заявками и образовательной информацией.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <SectionHeading
          dense
          as="h1"
          badge="Документы"
          title="Условия использования"
          subtitle="Правила использования сайта, материалов, форм и образовательных разделов CyberGuard Academy"
        />

        <div className="max-w-4xl mx-auto space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">1. Общие положения</h2>
            <p>
              Настоящие Условия использования регулируют работу с сайтом CyberGuard
              Academy, его страницами, формами, материалами и информацией, доступной
              пользователям.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              2. Информационный характер материалов
            </h2>
            <p>
              Материалы сайта носят образовательный и информационный характер. Они
              предназначены для повышения цифровой грамотности, понимания рисков и
              формирования безопасных привычек при работе в интернете.
            </p>
            <p className="mt-3">
              Информация на сайте не должна рассматриваться как призыв к нарушению
              закона, получению несанкционированного доступа к системам или
              использованию вредоносных практик.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">3. Использование сайта</h2>
            <p>Пользователь обязуется использовать сайт добросовестно и законно.</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>не предпринимать действий, нарушающих работу сайта;</li>
              <li>не использовать формы для спама и вредоносной активности;</li>
              <li>не пытаться обойти механизмы защиты сайта;</li>
              <li>не использовать материалы сайта в незаконных целях.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">4. Формы связи и заявки</h2>
            <p>
              Отправляя данные через формы на сайте, пользователь подтверждает, что
              указывает достоверную информацию и использует формы по назначению: для
              связи, записи, уточнения информации о курсах и обучении.
            </p>
            <p className="mt-3">
              Сайт может использовать технические механизмы защиты форм от спама,
              автоматических отправок и подозрительной активности.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              5. Образовательные материалы и блог
            </h2>
            <p>
              Статьи, описания программ, рекомендации и интерактивные инструменты
              публикуются с целью обучения и повышения уровня цифровой безопасности.
            </p>
            <p className="mt-3">
              Несмотря на то, что материалы ориентированы на практическую пользу,
              пользователь самостоятельно принимает решения о применении рекомендаций
              с учётом своей ситуации, возраста, уровня подготовки и контекста.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              6. Ограничение ответственности
            </h2>
            <p>
              CyberGuard Academy стремится поддерживать актуальность и полезность
              материалов сайта, однако не гарантирует абсолютную полноту, отсутствие
              неточностей или применимость информации ко всем возможным ситуациям.
            </p>
            <p className="mt-3">
              Пользователь использует материалы сайта, инструменты самопроверки и
              рекомендации осознанно и на свой риск, понимая, что цифровая безопасность
              требует регулярного внимания и самостоятельной оценки ситуации.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              7. Ссылки на другие страницы сайта
            </h2>
            <p>
              На сайте могут размещаться ссылки на страницы курсов, блога, FAQ,
              политики конфиденциальности и другие разделы. Пользователь может
              использовать их для получения дополнительной информации, но обязан
              самостоятельно оценивать актуальность и применимость материалов.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">8. Изменение условий</h2>
            <p>
              CyberGuard Academy вправе обновлять данные Условия использования по мере
              развития сайта, образовательных программ, сервисов и юридических
              требований. Актуальная версия условий размещается на этой странице.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">9. Контакты</h2>
            <p>
              Если у вас есть вопросы по использованию сайта, форм, материалов или
              условий, используйте страницу контактов CyberGuard Academy.
            </p>
          </section>

          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/contact" variant="primary" size="md">
              Связаться с нами
            </ButtonLink>
            <ButtonLink href="/privacy" variant="secondary" size="md">
              Конфиденциальность
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
