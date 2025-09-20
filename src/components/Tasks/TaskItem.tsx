import { Card, Checkbox, Button, Typography, Space, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Task, TaskPriority } from '../../types';
import { useAppDispatch } from '../../hooks/redux';
import { toggleTask, removeTask } from '../../store/slices/taskSlice';
import '../../styles/taskitem.css';

const { Text, Paragraph } = Typography;

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export const TaskItem = ({ task, onEdit }: TaskItemProps) => {
    const dispatch = useAppDispatch();

    const handleToggle = () => {
        dispatch(toggleTask({ taskId: task.id, completed: !task.completed }));
    };

    const handleDelete = () => {
        dispatch(removeTask(task.id));
    };

    const getPriorityColor = (priority: TaskPriority): string => {
        switch (priority) {
            case 'high':
                return 'red';
            case 'medium':
                return 'orange';
            case 'low':
                return 'green';
            default:
                return 'default';
        }
    };

    const getPriorityText = (priority: TaskPriority): string => {
        switch (priority) {
            case 'high':
                return 'Высокий';
            case 'medium':
                return 'Средний';
            case 'low':
                return 'Низкий';
            default:
                return priority;
        }
    };

    return (
        <Card
            size="small"
            className={`taskitem-card ${task.completed ? 'taskitem-card-completed' : ''}`}
        >
            <Space direction="vertical" className="taskitem-content">
                <div className="taskitem-header">
                    <Checkbox
                        checked={task.completed}
                        onChange={handleToggle}
                        className="taskitem-checkbox"
                    />

                    <div className="taskitem-main">
                        <Text
                            strong
                            className={`taskitem-title ${task.completed ? 'taskitem-title-completed' : ''}`}
                        >
                            {task.title}
                        </Text>

                        {task.description && (
                            <Paragraph
                                className={`taskitem-description ${task.completed ? 'taskitem-description-completed' : ''}`}
                            >
                                {task.description}
                            </Paragraph>
                        )}

                        <Space wrap className="taskitem-meta">
                            <Tag color={getPriorityColor(task.priority)}>
                                {getPriorityText(task.priority)}
                            </Tag>
                            <Text type="secondary" className="taskitem-date">
                                {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                            </Text>
                        </Space>
                    </div>

                    <Space className="taskitem-actions">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(task)}
                            size="small"
                        />
                        <Popconfirm
                            title="Удалить задачу?"
                            description="Это действие нельзя отменить"
                            onConfirm={handleDelete}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                danger
                                size="small"
                            />
                        </Popconfirm>
                    </Space>
                </div>
            </Space>
        </Card>
    );
};