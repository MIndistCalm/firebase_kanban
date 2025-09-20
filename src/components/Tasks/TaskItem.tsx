import { Card, Checkbox, Button, Typography, Space, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Task, TaskPriority } from '../../types';
import { useAppDispatch } from '../../hooks/redux';
import { toggleTask, removeTask } from '../../store/slices/taskSlice';
import { TASK_PRIORITY_LABELS, TASK_PRIORITY_COLORS, VALIDATION_CONSTANTS } from '../../constants';
import { useToast } from '../Toast';
import '../../styles/taskitem.css';

const { Text, Paragraph } = Typography;

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export const TaskItem = ({ task, onEdit }: TaskItemProps) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();

    const handleToggle = async () => {
        try {
            await dispatch(toggleTask({ taskId: task.id, completed: !task.completed })).unwrap();
            const messageText = task.completed
                ? VALIDATION_CONSTANTS.SUCCESS.TASK_UNCOMPLETED
                : VALIDATION_CONSTANTS.SUCCESS.TASK_COMPLETED;
            showToast(messageText, 'success');
        } catch (error) {
            showToast(VALIDATION_CONSTANTS.ACTION_ERRORS.TASK_TOGGLE_ERROR, 'error');
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(removeTask(task.id)).unwrap();
            showToast(VALIDATION_CONSTANTS.SUCCESS.TASK_DELETED, 'success');
        } catch (error) {
            showToast(VALIDATION_CONSTANTS.ACTION_ERRORS.TASK_DELETE_ERROR, 'error');
        }
    };

    const getPriorityColor = (priority: TaskPriority): string => {
        return TASK_PRIORITY_COLORS[priority] || 'default';
    };

    const getPriorityText = (priority: TaskPriority): string => {
        return TASK_PRIORITY_LABELS[priority] || priority;
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