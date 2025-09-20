# Firebase Kanban Task Manager

Веб-приложение для управления задачами, построенное на React, TypeScript, Firebase и Ant Design.

## Демо

Приложение доступно по адресу: [https://fir-kanban-db797.web.app](https://fir-kanban-db797.web.app)

## Возможности

- Аутентификация пользователей
- Создание, редактирование и удаление задач
- Фильтрация и поиск задач
- Статистика выполнения
- Адаптивный дизайн
- Уведомления о действиях

## Технологии

- React 18 + TypeScript
- Vite (сборщик)
- Ant Design (UI компоненты)
- Redux Toolkit (состояние)
- Firebase (аутентификация и база данных)
- React Router (маршрутизация)

## Установка и запуск

### Предварительные требования

- Node.js 18 или выше
- npm или yarn
- Firebase CLI

### Шаг 1: Клонирование репозитория

```bash
git clone https://github.com/MIndistCalm/firebase_kanban.git
cd firebase_kanban
```

### Шаг 2: Установка зависимостей

```bash
npm install
```

### Шаг 3: Настройка Firebase

1. Установите Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Войдите в Firebase:
```bash
firebase login
```

3. Инициализируйте проект:
```bash
firebase init
```

При инициализации выберите:
- **Authentication** - для настройки аутентификации
- **Firestore** - для базы данных
- **Hosting** - для хостинга

### Шаг 4: Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Получить эти значения можно в [Firebase Console](https://console.firebase.google.com/) в настройках проекта.

### Шаг 5: Настройка Firebase Authentication

1. В Firebase Console перейдите в раздел **Authentication**
2. Включите провайдер **Email/Password**
3. Настройте домен для аутентификации

### Шаг 6: Настройка Firestore

1. В Firebase Console перейдите в раздел **Firestore Database**
2. Создайте базу данных
3. Установите правила безопасности:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Шаг 7: Запуск приложения

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## Доступные команды

```bash
# Разработка
npm run dev          # Запуск dev сервера
npm run build        # Сборка для продакшена
npm run preview      # Предварительный просмотр сборки

# Firebase
firebase deploy      # Деплой на Firebase Hosting
```

## Деплой на Firebase Hosting

1. Соберите проект:
```bash
npm run build
```

2. Деплой:
```bash
firebase deploy --only hosting
```

После успешного деплоя вы получите URL вашего приложения.

## Структура проекта

```
src/
├── components/          # UI компоненты
│   ├── Auth/           # Аутентификация
│   ├── Tasks/          # Модуль задач
│   └── Toast/          # Уведомления
├── pages/              # Страницы
├── store/              # Redux состояние
├── services/           # Firebase сервисы
├── utils/              # Утилиты
├── types/              # TypeScript типы
├── constants/          # Константы
└── styles/             # CSS стили
```

## Возможные проблемы

### Ошибка "Firebase project not found"
- Убедитесь, что вы вошли в правильный Firebase проект
- Проверьте настройки в `.firebaserc`

### Ошибка "Missing or insufficient permissions"
- Проверьте правила безопасности Firestore
- Убедитесь, что аутентификация настроена правильно

### Ошибка "Firebase app not initialized"
- Проверьте переменные окружения в `.env`
- Убедитесь, что все значения заполнены правильно

## Поддержка

Если возникли проблемы, проверьте:
1. Версию Node.js (должна быть 18+)
2. Настройки Firebase в консоли
3. Переменные окружения
4. Правила безопасности Firestore
