import { Empty, Spin, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Task } from '../../types';
import { TaskItem } from './TaskItem';
import '../../styles/tasklist.css';

interface TaskListProps {
    tasks: Task[];
    loading: boolean;
    onEdit: (task: Task) => void;
    onAddTask?: () => void;
}

export const TaskList = ({ tasks, loading, onEdit, onAddTask }: TaskListProps) => {
    return (
        <Spin spinning={loading}>
            {tasks.length > 0 ? (
                <div className="tasklist-tasks-container">
                    {tasks.map((task) => (
                        <div key={task.id} className="task-card">
                            <TaskItem
                                task={task}
                                onEdit={onEdit}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <Empty
                    description="Задач пока нет"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                    {onAddTask && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={onAddTask}
                        >
                            Создать первую задачу
                        </Button>
                    )}
                </Empty>
            )}
        </Spin>
    );
};