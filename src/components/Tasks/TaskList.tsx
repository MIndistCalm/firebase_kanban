import { useState, useEffect } from 'react';
import { Empty, Spin, Button, Input, Select, Space, Typography, Statistic, Row, Col, Card, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { Task, TaskFilter, TaskFormData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addTask, editTask, fetchTasks, setFilter, setSearchQuery } from '../../store/slices/taskSlice';
import { getFilteredTasks, getTaskStats, sortTasksByPriority } from '../../utils/taskUtils';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { UI_CONSTANTS, TASK_FILTERS, TASK_FILTER_LABELS, VALIDATION_CONSTANTS } from '../../constants';
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
            const loadTasks = async () => {
                try {
                    await dispatch(fetchTasks(user.uid)).unwrap();
                } catch (error) {
                    message.error(VALIDATION_CONSTANTS.ACTION_ERRORS.TASK_FETCH_ERROR);
                }
            };
            loadTasks();
        }
    }, [dispatch, user]);

    // Получаем отфильтрованные и отсортированные задачи
    const filteredTasks = getFilteredTasks(tasks, filter, searchQuery);
    const sortedTasks = sortTasksByPriority(filteredTasks);
    const stats = getTaskStats(tasks);

    const handleAddTask = async (values: TaskFormData) => {
        if (user) {
            try {
                await dispatch(addTask({ taskData: values, userId: user.uid })).unwrap();
                message.success(VALIDATION_CONSTANTS.SUCCESS.TASK_CREATED);
                setIsFormVisible(false);
            } catch (error) {
                message.success(VALIDATION_CONSTANTS.ACTION_ERRORS.TASK_CREATE_ERROR);
            }
        }
    };

    const handleEditTask = async (values: TaskFormData) => {
        if (editingTask) {
            try {
                await dispatch(editTask({ taskId: editingTask.id, updates: values })).unwrap();
                message.success(VALIDATION_CONSTANTS.SUCCESS.TASK_UPDATED);
                setEditingTask(null);
            } catch (error) {
                message.success(VALIDATION_CONSTANTS.ACTION_ERRORS.TASK_UPDATE_ERROR);
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
                <Row gutter={[UI_CONSTANTS.GRID_GUTTER, UI_CONSTANTS.GRID_GUTTER]} className="tasklist-stats">
                    <Col xs={UI_CONSTANTS.GRID_COLUMNS_MOBILE} sm={UI_CONSTANTS.GRID_COLUMNS_TABLET}>
                        <Card>
                            <Statistic title="Всего задач" value={stats.total} />
                        </Card>
                    </Col>
                    <Col xs={UI_CONSTANTS.GRID_COLUMNS_MOBILE} sm={UI_CONSTANTS.GRID_COLUMNS_TABLET}>
                        <Card>
                            <Statistic title="Активные" value={stats.active} />
                        </Card>
                    </Col>
                    <Col xs={UI_CONSTANTS.GRID_COLUMNS_MOBILE} sm={UI_CONSTANTS.GRID_COLUMNS_TABLET}>
                        <Card>
                            <Statistic title="Выполненные" value={stats.completed} />
                        </Card>
                    </Col>
                    <Col xs={UI_CONSTANTS.GRID_COLUMNS_MOBILE} sm={UI_CONSTANTS.GRID_COLUMNS_TABLET}>
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
                                style={{ width: UI_CONSTANTS.SELECT_WIDTH }}
                            >
                                <Option value={TASK_FILTERS.ALL}>{TASK_FILTER_LABELS[TASK_FILTERS.ALL]}</Option>
                                <Option value={TASK_FILTERS.ACTIVE}>{TASK_FILTER_LABELS[TASK_FILTERS.ACTIVE]}</Option>
                                <Option value={TASK_FILTERS.COMPLETED}>{TASK_FILTER_LABELS[TASK_FILTERS.COMPLETED]}</Option>
                            </Select>

                            <Search
                                placeholder="Поиск задач..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                style={{ minWidth: UI_CONSTANTS.SEARCH_MIN_WIDTH, maxWidth: '100%' }}
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