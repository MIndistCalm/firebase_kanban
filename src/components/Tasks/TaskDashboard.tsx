import { useState, useEffect } from 'react';
import { Typography } from 'antd';
import type { Task, TaskFilter, TaskFormData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTask, editTask, fetchTasks, setFilter, setSearchQuery } from '../../store/slices/taskSlice';
import { getFilteredTasks, getTaskStats, sortTasksByPriority } from '../../utils/taskUtils';
import { TaskList } from './TaskList';
import { TaskStats } from './TaskStats';
import { TaskFilters } from './TaskFilters';
import { TaskForm } from './TaskForm';
import { VALIDATION_CONSTANTS } from '../../constants';
import { useToast } from '../Toast';
import '../../styles/taskdashboard.css';

const { Title } = Typography;

export const TaskDashboard = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading, filter, searchQuery } = useAppSelector((state) => state.tasks);
    const { user } = useAppSelector((state) => state.auth);
    const { showToast } = useToast();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Загружаем задачи при монтировании компонента
    useEffect(() => {
        if (user) {
            const loadTasks = async () => {
                try {
                    await dispatch(fetchTasks(user.uid)).unwrap();
                } catch (error) {
                    showToast(VALIDATION_CONSTANTS.ACTION_ERRORS.TASK_FETCH_ERROR, 'error');
                }
            };
            loadTasks();
        }
    }, [dispatch, user, showToast]);

    // Получаем отфильтрованные и отсортированные задачи
    const filteredTasks = getFilteredTasks(tasks, filter, searchQuery);
    const sortedTasks = sortTasksByPriority(filteredTasks);
    const stats = getTaskStats(tasks);

    const handleAddTask = async (values: TaskFormData) => {
        if (user) {
            try {
                await dispatch(addTask({ taskData: values, userId: user.uid })).unwrap();
                showToast(VALIDATION_CONSTANTS.SUCCESS.TASK_CREATED, 'success');
                setIsFormVisible(false);
            } catch (error) {
                showToast(VALIDATION_CONSTANTS.ACTION_ERRORS.TASK_CREATE_ERROR, 'error');
            }
        }
    };

    const handleEditTask = async (values: TaskFormData) => {
        if (editingTask) {
            try {
                await dispatch(editTask({ taskId: editingTask.id, updates: values })).unwrap();
                showToast(VALIDATION_CONSTANTS.SUCCESS.TASK_UPDATED, 'success');
                setEditingTask(null);
            } catch (error) {
                showToast(VALIDATION_CONSTANTS.ACTION_ERRORS.TASK_UPDATE_ERROR, 'error');
            }
        }
    };

    const handleFilterChange = (newFilter: TaskFilter) => {
        dispatch(setFilter(newFilter));
    };

    const handleSearch = (value: string) => {
        dispatch(setSearchQuery(value));
    };

    const openEditForm = (task: Task) => {
        setEditingTask(task);
        setIsFormVisible(true);
    };

    const closeForm = () => {
        setIsFormVisible(false);
        setEditingTask(null);
    };

    return (
        <div className="taskdashboard-container">
            <div className="taskdashboard-header">
                <Title level={2}>Мои задачи</Title>

                {/* Статистика */}
                <TaskStats
                    total={stats.total}
                    active={stats.active}
                    completed={stats.completed}
                    completionRate={stats.completionRate}
                />

                {/* Фильтры и поиск */}
                <TaskFilters
                    filter={filter}
                    searchQuery={searchQuery}
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearch}
                    onAddTask={() => setIsFormVisible(true)}
                />
            </div>

            {/* Список задач */}
            <TaskList
                tasks={sortedTasks}
                loading={loading}
                onEdit={openEditForm}
            />

            {/* Форма добавления/редактирования задачи */}
            <TaskForm
                visible={isFormVisible}
                onCancel={closeForm}
                onSubmit={handleAddTask}
                loading={loading}
                title="Добавить задачу"
            />

            <TaskForm
                visible={!!editingTask}
                onCancel={closeForm}
                onSubmit={handleEditTask}
                initialValues={editingTask ? {
                    title: editingTask.title,
                    description: editingTask.description,
                    priority: editingTask.priority,
                } : undefined}
                loading={loading}
                title="Редактировать задачу"
            />
        </div>
    );
};
