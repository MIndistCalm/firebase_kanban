// Типы для пользователя
export interface User {
    uid: string;
    email: string;
    displayName?: string;
  }
  
  // Типы для задач
  export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }
  
  // Типы для фильтрации задач
  export type TaskFilter = 'all' | 'active' | 'completed';
  
  // Типы для приоритета задач
  export type TaskPriority = 'low' | 'medium' | 'high';
  
  // Типы для состояния аутентификации
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  // Типы для состояния задач
  export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    filter: TaskFilter;
    searchQuery: string;
  }
  
  // Типы для формы задачи
  export interface TaskFormData {
    title: string;
    description: string;
    priority: TaskPriority;
  }