import { useState, useEffect } from 'react';
import { Empty, Spin, Button, Input, Select, Space, Typography, Statistic, Row, Col, Card } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { Task, TaskFilter, TaskFormData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTask, editTask, fetchTasks, setFilter, setSearchQuery } from '../../store/slices/taskSlice';
import { getFilteredTasks, getTaskStats, sortTasksByPriority } from '../../utils/taskUtils';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import '../../styles/tasklist.css';

const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

// Пагинацию не делал
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
        <div className="tasklist-container">
            <div className="tasklist-header">
                <Title level={2}>Мои задачи</Title>

                {/* Статистика */}
                <Row gutter={[16, 16]} className="tasklist-stats">
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic title="Всего задач" value={stats.total} />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic title="Активные" value={stats.active} />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic title="Выполненные" value={stats.completed} />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic title="Прогресс" value={stats.completionRate} suffix="%" />
                        </Card>
                    </Col>
                </Row>

                {/* Фильтры и поиск */}
                <Card className="tasklist-filters">
                    <Space wrap className="tasklist-filters-space">
                        <Space wrap className="tasklist-filters-left">
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
                                style={{ minWidth: 150, maxWidth: '100%' }}
                                prefix={<SearchOutlined />}
                                allowClear
                            />
                        </Space>

                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsFormVisible(true)}
                        >
                            Добавить задачу
                        </Button>

                    </Space>
                </Card>
            </div>

            {/* Список задач */}
            <Spin spinning={loading}>
                {sortedTasks.length > 0 ? (
                    <div className="tasklist-tasks-container">
                        {sortedTasks.map((task) => (
                            <div key={task.id} className="task-card">
                                <TaskItem
                                    task={task}
                                    onEdit={openEditForm}
                                />
                            </div>
                        ))}
                    </div>
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