import { Card, Checkbox, Button, Typography, Space, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Task, TaskPriority } from '../../types';
import { useAppDispatch } from '../../hooks/redux';
import { toggleTask, removeTask } from '../../store/slices/taskSlice';

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
            style={{
                marginBottom: 8,
                opacity: task.completed ? 0.7 : 1,
                textDecoration: task.completed ? 'line-through' : 'none',
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <Checkbox
                        checked={task.completed}
                        onChange={handleToggle}
                        style={{ marginTop: 4 }}
                    />

                    <div style={{ flex: 1 }}>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                                textDecoration: task.completed ? 'line-through' : 'none',
                            }}
                        >
                            {task.title}
                        </Text>

                        {task.description && (
                            <Paragraph
                                style={{
                                    margin: '8px 0',
                                    color: task.completed ? '#999' : '#666',
                                }}
                            >
                                {task.description}
                            </Paragraph>
                        )}

                        <Space wrap>
                            <Tag color={getPriorityColor(task.priority)}>
                                {getPriorityText(task.priority)}
                            </Tag>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                            </Text>
                        </Space>
                    </div>

                    <Space>
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