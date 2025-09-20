// UI константы
export const UI_CONSTANTS = {
  // Размеры
  HEADER_HEIGHT: 64,
  CARD_MIN_WIDTH: 300,
  FORM_MAX_WIDTH: 400,
  
  // Отступы
  PADDING_SMALL: 8,
  PADDING_MEDIUM: 16,
  PADDING_LARGE: 24,
  MARGIN_SMALL: 8,
  MARGIN_MEDIUM: 16,
  MARGIN_LARGE: 24,
  
  // Брейкпоинты
  BREAKPOINT_MOBILE: 480,
  BREAKPOINT_TABLET: 768,
  BREAKPOINT_DESKTOP: 1024,
  
  // Grid
  GRID_GUTTER: 16,
  GRID_COLUMNS_MOBILE: 12,
  GRID_COLUMNS_TABLET: 6,
  GRID_COLUMNS_DESKTOP: 6,
  
  // Формы
  SELECT_WIDTH: 120,
  SEARCH_MIN_WIDTH: 150,
  TEXTAREA_ROWS: 4,
  
  // Цвета
  OPACITY_COMPLETED: 0.7,
  COLOR_SECONDARY: '#666',
  COLOR_DISABLED: '#999',
  
  // Градиенты
  AUTH_GRADIENT: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
} as const;

// Валидация константы
export const VALIDATION_CONSTANTS = {
  // Длина полей
  DISPLAY_NAME_MAX_LENGTH: 50,
  TASK_TITLE_MAX_LENGTH: 100,
  TASK_DESCRIPTION_MAX_LENGTH: 500,
  PASSWORD_MIN_LENGTH: 6,
  
  // Сообщения об ошибках
  ERRORS: {
    DISPLAY_NAME_TOO_LONG: 'Имя должно содержать максимум 50 символов!',
    TASK_TITLE_TOO_LONG: 'Название должно содержать максимум 100 символов!',
    TASK_DESCRIPTION_TOO_LONG: 'Описание должно содержать максимум 500 символов!',
    PASSWORD_TOO_SHORT: 'Пароль должен содержать минимум 6 символов!',
    EMAIL_REQUIRED: 'Введите email!',
    EMAIL_INVALID: 'Введите корректный email!',
    PASSWORD_REQUIRED: 'Введите пароль!',
    CONFIRM_PASSWORD_REQUIRED: 'Подтвердите пароль!',
    PASSWORDS_NOT_MATCH: 'Пароли не совпадают!',
    TASK_TITLE_REQUIRED: 'Введите название задачи!',
    TASK_PRIORITY_REQUIRED: 'Выберите приоритет!',
  },
  
  // Сообщения об успехе
  SUCCESS: {
    LOGIN_SUCCESS: 'Вход выполнен успешно!',
    REGISTER_SUCCESS: 'Регистрация выполнена успешно!',
    LOGOUT_SUCCESS: 'Вы успешно вышли из системы',
    TASK_CREATED: 'Задача создана успешно!',
    TASK_UPDATED: 'Задача обновлена успешно!',
    TASK_DELETED: 'Задача удалена успешно!',
    TASK_COMPLETED: 'Задача отмечена как выполненная!',
    TASK_UNCOMPLETED: 'Задача отмечена как невыполненная!',
  },
  
  // Сообщения об ошибках действий
  ACTION_ERRORS: {
    LOGIN_ERROR: 'Ошибка входа. Проверьте данные.',
    REGISTER_ERROR: 'Ошибка регистрации. Попробуйте еще раз.',
    LOGOUT_ERROR: 'Ошибка при выходе из системы',
    TASK_CREATE_ERROR: 'Ошибка при создании задачи',
    TASK_UPDATE_ERROR: 'Ошибка при обновлении задачи',
    TASK_DELETE_ERROR: 'Ошибка при удалении задачи',
    TASK_TOGGLE_ERROR: 'Ошибка при изменении статуса задачи',
    TASK_FETCH_ERROR: 'Ошибка при загрузке задач',
  },
} as const;

// Приоритеты задач
export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

// Фильтры задач
export const TASK_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

// Тексты приоритетов
export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITIES.LOW]: 'Низкий',
  [TASK_PRIORITIES.MEDIUM]: 'Средний',
  [TASK_PRIORITIES.HIGH]: 'Высокий',
} as const;

// Цвета приоритетов
export const TASK_PRIORITY_COLORS = {
  [TASK_PRIORITIES.LOW]: 'green',
  [TASK_PRIORITIES.MEDIUM]: 'orange',
  [TASK_PRIORITIES.HIGH]: 'red',
} as const;

// Тексты фильтров
export const TASK_FILTER_LABELS = {
  [TASK_FILTERS.ALL]: 'Все',
  [TASK_FILTERS.ACTIVE]: 'Активные',
  [TASK_FILTERS.COMPLETED]: 'Выполненные',
} as const;
