import { Card, Space, Button, Input, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { TaskFilter } from '../../types';
import { UI_CONSTANTS, TASK_FILTERS, TASK_FILTER_LABELS } from '../../constants';
import '../../styles/taskfilters.css';

const { Search } = Input;
const { Option } = Select;

interface TaskFiltersProps {
  filter: TaskFilter;
  searchQuery: string;
  onFilterChange: (filter: TaskFilter) => void;
  onSearchChange: (query: string) => void;
  onAddTask: () => void;
}

export const TaskFilters = ({
  filter,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onAddTask,
}: TaskFiltersProps) => {
  return (
    <Card className="taskfilters-container">
      <Space wrap className="taskfilters-space">
        <Space wrap className="taskfilters-left">
          <Select
            value={filter}
            onChange={onFilterChange}
            style={{ width: UI_CONSTANTS.SELECT_WIDTH }}
          >
            <Option value={TASK_FILTERS.ALL}>{TASK_FILTER_LABELS[TASK_FILTERS.ALL]}</Option>
            <Option value={TASK_FILTERS.ACTIVE}>{TASK_FILTER_LABELS[TASK_FILTERS.ACTIVE]}</Option>
            <Option value={TASK_FILTERS.COMPLETED}>{TASK_FILTER_LABELS[TASK_FILTERS.COMPLETED]}</Option>
          </Select>

          <Search
            placeholder="Поиск задач..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ minWidth: UI_CONSTANTS.SEARCH_MIN_WIDTH, maxWidth: '100%' }}
            prefix={<SearchOutlined />}
            allowClear
          />
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddTask}
        >
          Добавить задачу
        </Button>
      </Space>
    </Card>
  );
};
