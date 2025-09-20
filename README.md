# Task Manager - Firebase Kanban

Простое приложение для управления списком задач с аутентификацией пользователей и работой с реальной базой данных Firebase.

## Технологии

- **React 19** с функциональными компонентами и хуками
- **TypeScript** для типизации
- **Vite** для сборки и разработки
- **Firebase** (Authentication + Firestore)
- **Ant Design** для UI компонентов
- **Redux Toolkit** для управления состоянием

## Функциональность

### Аутентификация
- ✅ Регистрация нового пользователя (email + пароль)
- ✅ Вход существующего пользователя
- ✅ Выход из системы
- ✅ Защищенные маршруты (только для авторизованных пользователей)

### Управление задачами (CRUD операции)
- ✅ Просмотр списка задач (только задачи текущего пользователя)
- ✅ Добавление новой задачи (текст, статус, приоритет, дата создания)
- ✅ Редактирование существующей задачи
- ✅ Удаление задачи
- ✅ Отметка задачи как выполненной
- ✅ Фильтрация задач по статусу (все, активные, выполненные)
- ✅ Поиск по задачам

### Интерфейс
- ✅ Адаптивный дизайн
- ✅ Чистый и современный UI
- ✅ Уведомления об операциях (успех/ошибка)
- ✅ Loading states для асинхронных операций

## Установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/)
2. Включите Authentication с провайдером Email/Password
3. Создайте Firestore Database
4. Настройте правила безопасности (см. раздел ниже)

### 3. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Настройка правил безопасности Firestore

В Firebase Console перейдите в Firestore Database > Rules и установите следующие правила:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 5. Запуск приложения

```bash
# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## Структура проекта

src/
├── components/ # React компоненты
│ ├── Auth/ # Компоненты аутентификации
│ └── Tasks/ # Компоненты для работы с задачами
├── pages/ # Страницы приложения
├── store/ # Redux store и slices
│ └── slices/ # Redux slices
├── services/ # Сервисы для работы с API
├── types/ # TypeScript типы
├── hooks/ # Кастомные хуки
├── utils/ # Утилиты
└── App.tsx # Главный компонент

## Структура данных

### Пользователь (Firebase Authentication)
```typescript
{
  uid: string,
  email: string,
  displayName: string (optional)
}
```

### Задача (Firestore)
```typescript
{
  id: string, // auto-generated
  title: string,
  description: string,
  completed: boolean,
  priority: 'low' | 'medium' | 'high',
  createdAt: timestamp,
  updatedAt: timestamp,
  userId: string // ID владельца задачи
}
```

## Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка для продакшена
- `npm run preview` - предварительный просмотр сборки
- `npm run lint` - проверка кода линтером

## Лицензия

MIT License