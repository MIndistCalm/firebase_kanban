import { useState, useEffect } from 'react';
import { List, Empty, Spin, Button, Input, Select, Space, Typography, Statistic, Row, Col } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { Task, TaskFilter, TaskFormData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTask, editTask, fetchTasks, setFilter, setSearchQuery } from '../../store/slices/taskSlice';
import { getFilteredTasks, getTaskStats, sortTasksByPriority } from '../../utils/taskUtils';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

export const TaskList = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading, filter, searchQuery } = useAppSelector((state) => state.tasks);
    const { user } = useAppSelector((state) => state.auth);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Загружаем задачи при монтировании компонента
    useEffect(() => {
        if (user) {
            dispatch(fetchTasks(user.uid));
        }
    }, [dispatch, user]);

    // Получаем отфильтрованные и отсортированные задачи
    const filteredTasks = getFilteredTasks(tasks, filter, searchQuery);
    const sortedTasks = sortTasksByPriority(filteredTasks);
    const stats = getTaskStats(tasks);

    const handleAddTask = async (values: TaskFormData) => {
        if (user) {
            await dispatch(addTask({ taskData: values, userId: user.uid }));
            setIsFormVisible(false);
        }
    };

    const handleEditTask = async (values: TaskFormData) => {
        if (editingTask) {
            await dispatch(editTask({ taskId: editingTask.id, updates: values }));
            setEditingTask(null);
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
    };

    const closeForm = () => {
        setIsFormVisible(false);
        setEditingTask(null);
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>Мои задачи</Title>

                {/* Статистика */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={6}>
                        <Statistic title="Всего задач" value={stats.total} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Активные" value={stats.active} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Выполненные" value={stats.completed} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Прогресс" value={stats.completionRate} suffix="%" />
                    </Col>
                </Row>

                {/* Фильтры и поиск */}
                <Space wrap style={{ marginBottom: 16, width: '100%' }}>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                        style={{ width: 120 }}
                    >
                        <Option value="all">Все</Option>
                        <Option value="active">Активные</Option>
                        <Option value="completed">Выполненные</Option>
                    </Select>

                    <Search
                        placeholder="Поиск задач..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 300 }}
                        prefix={<SearchOutlined />}
                        allowClear
                    />

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsFormVisible(true)}
                    >
                        Добавить задачу
                    </Button>
                </Space>
            </div>

            {/* Список задач */}
            <Spin spinning={loading}>
                {sortedTasks.length > 0 ? (
                    <List
                        dataSource={sortedTasks}
                        renderItem={(task) => (
                            <List.Item key={task.id}>
                                <TaskItem
                                    task={task}
                                    onEdit={openEditForm}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty
                        description="Задач пока нет"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    >
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsFormVisible(true)}
                        >
                            Создать первую задачу
                        </Button>
                    </Empty>
                )}
            </Spin>

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