import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — CyberGuard Academy',
  description:
    'Политика конфиденциальности CyberGuard Academy: как мы обрабатываем персональные данные, заявки и обращения пользователей.',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Политика конфиденциальности
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности описывает, каким образом
              CyberGuard Academy обрабатывает персональные данные пользователей сайта,
              форм обратной связи и заявок на обучение.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Какие данные мы можем получать
            </h2>
            <p>Через формы на сайте мы можем получать следующие данные:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>имя пользователя или родителя;</li>
              <li>адрес электронной почты;</li>
              <li>номер телефона;</li>
              <li>тему и содержание сообщения;</li>
              <li>данные, указанные в заявке на обучение;</li>
              <li>техническую информацию, необходимую для защиты форм от спама.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Зачем мы используем данные
            </h2>
            <p>Персональные данные могут использоваться для следующих целей:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>ответ на обращения пользователей;</li>
              <li>обработка заявок на обучение;</li>
              <li>уточнение деталей по курсам и расписанию;</li>
              <li>защита форм от автоматических и мошеннических отправок;</li>
              <li>улучшение качества работы сайта и сервиса.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Защита данных</h2>
            <p>
              Мы принимаем разумные технические и организационные меры для защиты данных
              от несанкционированного доступа, изменения, утраты или неправомерного
              использования.
            </p>
            <p className="mt-3">
              Для защиты форм могут использоваться антиспам-механизмы, валидация
              данных и средства ограничения подозрительной активности.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Передача данных третьим лицам
            </h2>
            <p>
              Мы не передаём персональные данные третьим лицам, за исключением случаев,
              когда это требуется законодательством или необходимо для работы
              технических сервисов, обеспечивающих функционирование сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Срок хранения данных</h2>
            <p>
              Данные хранятся не дольше, чем это необходимо для обработки обращения,
              заявки или выполнения законных обязательств, связанных с работой сайта и
              образовательных услуг.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Права пользователя</h2>
            <p>Пользователь вправе:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>запросить уточнение своих данных;</li>
              <li>запросить обновление или удаление данных;</li>
              <li>отозвать согласие на обработку данных, если это применимо;</li>
              <li>обратиться по вопросам обработки данных через форму контактов.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Изменения политики</h2>
            <p>
              Мы можем обновлять настоящую Политику конфиденциальности по мере развития
              сайта, форм, сервисов и требований к обработке данных. Актуальная версия
              всегда размещается на данной странице.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Контакты</h2>
            <p>
              Если у вас есть вопросы по поводу обработки данных, используйте страницу
              контактов сайта CyberGuard Academy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
