import { Layout, Button, Typography, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/slices/authSlice';
import { TaskList } from '../components/Tasks/TaskList';

const { Header, Content } = Layout;
const { Text } = Typography;

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '0 24px'
            }}>
                <Typography.Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                    Task Manager
                </Typography.Title>

                <Space>
                    <Space>
                        <UserOutlined />
                        <Text>{user?.displayName || user?.email}</Text>
                    </Space>
                    <Button
                        type="primary"
                        danger
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Выйти
                    </Button>
                </Space>
            </Header>

            <Content style={{ background: '#f5f5f5' }}>
                <TaskList />
            </Content>
        </Layout>
    );
};