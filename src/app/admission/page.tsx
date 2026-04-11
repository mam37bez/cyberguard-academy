import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/ButtonLink';

export const metadata: Metadata = {
  title: 'Условия обучения и записи — CyberGuard Academy',
  description:
    'Условия обучения и записи в CyberGuard Academy: как выбрать курс, как проходит пробное занятие, что происходит после заявки и как начинается обучение.',
  alternates: {
    canonical: `${SITE_URL}/admission`,
  },
};

export default function AdmissionPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <SectionHeading
          dense
          as="h1"
          badge="Запись"
          title="Условия обучения и записи"
          subtitle="Как проходит запись, как выбрать курс, что такое пробное занятие и что происходит после отправки заявки"
        />

        <div className="max-w-4xl mx-auto space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">1. Как выбрать курс</h2>
            <p>
              На сайте представлены программы для детей, подростков и родителей.
              При выборе курса стоит ориентироваться на возраст, интерес к теме,
              уровень подготовки и цели обучения.
            </p>
            <p className="mt-3">
              Если остаются сомнения, можно оставить заявку или написать через форму
              контактов, чтобы уточнить, какая программа подойдёт лучше.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">2. Как проходит запись</h2>
            <p>
              Для записи на курс пользователь заполняет форму на сайте. В заявке
              указываются базовые контактные данные, информация об ученике и выбранном
              направлении обучения.
            </p>
            <p className="mt-3">
              После отправки формы мы связываемся с пользователем для уточнения
              деталей, ответа на вопросы и согласования дальнейших шагов.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              3. Что такое пробное занятие
            </h2>
            <p>
              Пробное занятие помогает познакомиться с форматом обучения, подачей
              материала и общей логикой курса. Это удобный способ понять, подходит ли
              программа ученику или семье.
            </p>
            <p className="mt-3">
              На пробном занятии можно увидеть, как объясняется материал, какой темп
              используется и насколько комфортен формат обучения.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              4. Что происходит после заявки
            </h2>
            <p>После отправки заявки обычно происходит следующий процесс:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>уточнение деталей по выбранному курсу;</li>
              <li>ответы на организационные вопросы;</li>
              <li>согласование удобного варианта старта;</li>
              <li>определение подходящего формата и маршрута обучения.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              5. Формат и ожидания от обучения
            </h2>
            <p>
              CyberGuard Academy ориентируется на практическую цифровую безопасность,
              понятную подачу материала и формирование устойчивых полезных привычек.
            </p>
            <p className="mt-3">
              Мы делаем акцент на защите аккаунтов, устройств, данных и осознанном
              поведении в интернете, а не на романтизации вредоносных сценариев.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              6. Кому особенно полезно обучение
            </h2>
            <p>
              Обучение особенно полезно детям, подросткам, родителям и семьям, которые
              хотят лучше понимать цифровые риски, мошенничество, фишинг, защиту
              аккаунтов, безопасность устройств и современные правила поведения в
              интернете.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              7. Что важно понимать заранее
            </h2>
            <p>
              Конкретные организационные детали могут зависеть от программы, возраста,
              филиала и формата взаимодействия. Поэтому окончательные нюансы записи и
              старта всегда лучше уточнять после отправки формы или обращения через
              страницу контактов.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">8. Контакты</h2>
            <p>
              Если у вас есть вопросы по записи, курсам, пробному занятию или выбору
              программы, используйте страницу контактов CyberGuard Academy.
            </p>
          </section>

          <div className="flex flex-wrap gap-3 pt-4">
            <ButtonLink href="/enrollment" variant="primary" size="md">
              Записаться
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="md">
              Контакты
            </ButtonLink>
            <ButtonLink href="/courses" variant="secondary" size="md">
              Курсы
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
