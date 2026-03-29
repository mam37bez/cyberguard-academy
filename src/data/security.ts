import { SecurityThreat, Testimonial } from '@/types';
export const securityThreats: SecurityThreat[] = [
  {id:'phishing',name:'Email-фишинг',type:'phishing',severity:'high',description:'Мошеннические письма для кражи данных.',protection:['Проверяйте отправителя','Не переходите по ссылкам','Используйте 2FA'],indicators:['Срочность','Ошибки','Подозрительные ссылки']},
  {id:'scam-calls',name:'Мошеннические колл-центры',type:'scam_call',severity:'critical',description:'Мошенники представляются банками или полицией.',protection:['Не сообщайте коды из SMS','Перезвоните в банк сами','Не устанавливайте ПО','Не переводите деньги'],indicators:['Срочность','Просят данные','Угрозы блокировки']},
  {id:'social-eng',name:'Социальная инженерия',type:'social_engineering',severity:'high',description:'Психологические манипуляции для получения информации.',protection:['Проверяйте личность','Не делитесь информацией','Сообщайте о подозрительном'],indicators:['Необычные просьбы','Давление','Авторитет']},
  {id:'ransomware',name:'Программы-вымогатели',type:'ransomware',severity:'critical',description:'ПО шифрующее файлы и требующее выкуп.',protection:['Резервные копии','Обновляйте ОС','Антивирус','Не открывайте вложения'],indicators:['Файлы нечитаемы','Файлы о выкупе','Изменились расширения']},
  {id:'espionage',name:'Кибершпионаж спецслужб',type:'data_breach',severity:'critical',description:'APT-атаки для сбора разведданных.',protection:['Сквозное шифрование','VPN','Аппаратные ключи','Шифрование дисков'],indicators:['Странная активность','Неизвестные процессы','Подозрительные соединения']},
];
export const testimonials: Testimonial[] = [
  {id:'1',name:'Марина К.',role:'Мама ученика, 8 лет',content:'Сын сам объяснил бабушке почему нельзя сообщать код из SMS!',rating:5,avatar:''},
  {id:'2',name:'Андрей С.',role:'Ученик, 15 лет',content:'Теперь я знаю свою будущую профессию — кибербезопасность.',rating:5,avatar:''},
  {id:'3',name:'Ольга Д.',role:'Мама двоих учеников',content:'Старший уже помогает настраивать безопасность сети дома!',rating:5,avatar:''},
  {id:'4',name:'Виктор П.',role:'Папа ученицы',content:'Дочь чувствует себя уверенно в интернете.',rating:5,avatar:''},
  {id:'5',name:'Светлана М.',role:'Прошла курс для родителей',content:'Настроила защиту для всей семьи!',rating:5,avatar:''},
];
