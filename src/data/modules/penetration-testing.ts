import { Module } from '@/types/quiz';

export const penetrationTestingModule: Module = {
  id: 'penetration-testing',
  title: 'Penetration Testing',
  description: 'Основы пентеста: методологии, инструменты, этапы тестирования и этичный хакинг',
  icon: '🔓',
  difficulty: 'advanced',
  estimatedTime: '30 минут',
  questions: [
    {
      id: 'pentest-1',
      question: 'Что такое Penetration Testing (пентест)?',
      options: [
        'Авторизованная симуляция кибератаки для выявления уязвимостей',
        'Нелегальный взлом систем',
        'Тестирование производительности сети',
        'Проверка пользователей на знание паролей'
      ],
      correctAnswer: 0,
      explanation: 'Penetration Testing — это авторизованная (с разрешения владельца) симуляция реальных атак на систему для выявления уязвимостей до того, как их найдут злоумышленники.',
      points: 10
    },
    {
      id: 'pentest-2',
      question: 'Какие бывают типы пентеста по знанию о системе?',
      options: [
        'Black Box, White Box, Grey Box',
        'Red Box, Blue Box, Green Box',
        'Fast, Medium, Slow',
        'Internal, External, Cloud'
      ],
      correctAnswer: 0,
      explanation: 'Black Box — тестер ничего не знает о системе. White Box — полная информация (код, архитектура). Grey Box — частичная информация. Каждый тип имитирует разные сценарии атаки.',
      points: 15
    },
    {
      id: 'pentest-3',
      question: 'Что такое Reconnaissance (разведка) в пентесте?',
      options: [
        'Первый этап: сбор информации о цели',
        'Этап атаки на систему',
        'Написание отчёта',
        'Установка backdoor'
      ],
      correctAnswer: 0,
      explanation: 'Reconnaissance — первый этап пентеста. Пассивная разведка (OSINT, whois, поиск) и активная (сканирование портов, определение сервисов). Чем больше информации, тем эффективнее атака.',
      points: 15
    },
    {
      id: 'pentest-4',
      question: 'Какой инструмент используется для сканирования портов?',
      options: [
        'Nmap',
        'Photoshop',
        'Excel',
        'Chrome'
      ],
      correctAnswer: 0,
      explanation: 'Nmap (Network Mapper) — самый популярный инструмент для сканирования сети. Определяет открытые порты, сервисы, версии ПО, операционную систему и потенциальные уязвимости.',
      points: 10
    },
    {
      id: 'pentest-5',
      question: 'Что такое Metasploit?',
      options: [
        'Фреймворк для разработки и выполнения эксплойтов',
        'Антивирусная программа',
        'Текстовый редактор',
        'Операционная система'
      ],
      correctAnswer: 0,
      explanation: 'Metasploit Framework — мощный инструмент пентестера. Содержит тысячи эксплойтов, payloads, модулей для сканирования и пост-эксплуатации. Основа многих пентест-операций.',
      points: 15
    },
    {
      id: 'pentest-6',
      question: 'Что такое Burp Suite?',
      options: [
        'Инструмент для тестирования безопасности веб-приложений',
        'Программа для монтажа видео',
        'Система управления базами данных',
        'Облачное хранилище'
      ],
      correctAnswer: 0,
      explanation: 'Burp Suite — главный инструмент для тестирования веб-приложений. Работает как прокси, перехватывает запросы, позволяет их модифицировать, искать уязвимости (XSS, SQL injection и др.).',
      points: 15
    },
    {
      id: 'pentest-7',
      question: 'Что такое Privilege Escalation?',
      options: [
        'Повышение привилегий после получения начального доступа',
        'Установка антивируса',
        'Создание резервной копии',
        'Шифрование данных'
      ],
      correctAnswer: 0,
      explanation: 'Privilege Escalation — этап после получения начального доступа. Цель — повысить права (от обычного пользователя до администратора/root), чтобы получить полный контроль над системой.',
      points: 20
    },
    {
      id: 'pentest-8',
      question: 'Что такое Payload?',
      options: [
        'Код, выполняемый на целевой системе после эксплуатации уязвимости',
        'Размер файла',
        'Тип шифрования',
        'Метод аутентификации'
      ],
      correctAnswer: 0,
      explanation: 'Payload — это "полезная нагрузка", код который выполняется на цели после успешной эксплуатации. Может открыть reverse shell, скачать файл, создать пользователя и т.д.',
      points: 15
    },
    {
      id: 'pentest-9',
      question: 'Что такое CVE?',
      options: [
        'Common Vulnerabilities and Exposures — база данных известных уязвимостей',
        'Тип вируса',
        'Метод шифрования',
        'Облачный сервис'
      ],
      correctAnswer: 0,
      explanation: 'CVE (Common Vulnerabilities and Exposures) — стандартизированная база данных публично известных уязвимостей. Каждая уязвимость получает уникальный идентификатор (например, CVE-2021-44228 — Log4Shell).',
      points: 15
    },
    {
      id: 'pentest-10',
      question: 'Какая операционная система чаще всего используется пентестерами?',
      options: [
        'Kali Linux',
        'Windows 11',
        'macOS',
        'Android'
      ],
      correctAnswer: 0,
      explanation: 'Kali Linux — специализированный дистрибутив Linux для пентеста. Содержит сотни предустановленных инструментов: Nmap, Metasploit, Burp Suite, Wireshark, John the Ripper и многие другие.',
      points: 10
    }
  ]
};
