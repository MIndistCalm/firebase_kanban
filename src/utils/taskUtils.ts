import type { Task, TaskFilter } from '../types';

// Фильтрация задач по статусу
export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
    switch (filter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'all':
        default:
            return tasks;
    }
};

// Поиск задач по тексту
export const searchTasks = (tasks: Task[], searchQuery: string): Task[] => {
    if (!searchQuery.trim()) {
        return tasks;
    }

    const query = searchQuery.toLowerCase();
    return tasks.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
};

// Комбинированная фильтрация и поиск
export const getFilteredTasks = (tasks: Task[], filter: TaskFilter, searchQuery: string): Task[] => {
    const filteredTasks = filterTasks(tasks, filter);
    return searchTasks(filteredTasks, searchQuery);
};

// Получение статистики задач
export const getTaskStats = (tasks: Task[]) => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;

    return {
        total,
        completed,
        active,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
};

// Сортировка задач по приоритету
export const sortTasksByPriority = (tasks: Task[]): Task[] => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };

    return [...tasks].sort((a, b) => {
        // Сначала по статусу (незавершенные сверху)
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }

        // Затем по приоритету
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
};