import { Row, Col, Card, Statistic } from 'antd';
import { UI_CONSTANTS } from '../../constants';
import '../../styles/taskstats.css';

interface TaskStatsProps {
  total: number;
  active: number;
  completed: number;
  completionRate: number;
}

export const TaskStats = ({ total, active, completed, completionRate }: TaskStatsProps) => {
  return (
    <Row gutter={[UI_CONSTANTS.GRID_GUTTER, UI_CONSTANTS.GRID_GUTTER]} className="taskstats-container">
      <Col xs={UI_CONSTANTS.GRID_COLUMNS_MOBILE} sm={UI_CONSTANTS.GRID_COLUMNS_TABLET}>
        <Card className="taskstats-card">
          <Statistic title="Всего задач" value={total} />
        </Card>
      </Col>
      <Col xs={UI_CONSTANTS.GRID_COLUMNS_MOBILE} sm={UI_CONSTANTS.GRID_COLUMNS_TABLET}>
        <Card className="taskstats-card">
          <Statistic title="Активные" value={active} />
        </Card>
      </Col>
      <Col xs={UI_CONSTANTS.GRID_COLUMNS_MOBILE} sm={UI_CONSTANTS.GRID_COLUMNS_TABLET}>
        <Card className="taskstats-card">
          <Statistic title="Выполненные" value={completed} />
        </Card>
      </Col>
      <Col xs={UI_CONSTANTS.GRID_COLUMNS_MOBILE} sm={UI_CONSTANTS.GRID_COLUMNS_TABLET}>
        <Card className="taskstats-card">
          <Statistic title="Прогресс" value={completionRate} suffix="%" />
        </Card>
      </Col>
    </Row>
  );
};
