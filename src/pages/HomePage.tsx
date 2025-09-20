import { Layout, Button, Typography, Space, Dropdown, Menu } from 'antd';
import { LogoutOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/slices/authSlice';
import { TaskList } from '../components/Tasks/TaskList';
import '../styles/homepage.css';

const { Header, Content } = Layout;
const { Text } = Typography;

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    const userMenuItems = [
        {
            key: 'user',
            disabled: true,
            label: (
                <Space>
                    <UserOutlined />
                    <Text>{user?.displayName || user?.email}</Text>
                </Space>
            ),
        },
        {
            type: 'divider' as const,
        },
        {
            key: 'logout',
            label: (
                <Space>
                    <LogoutOutlined />
                    Выйти
                </Space>
            ),
            onClick: handleLogout,
            danger: true,
        },
    ];

    return (
        <Layout className="homepage-layout">
            <Header className="homepage-header">
                <Typography.Title level={3} className="homepage-title">
                    Task Manager
                </Typography.Title>

                {/* Десктопная версия */}
                <Space className="desktop-only" style={{ display: 'none' }}>
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

                {/* Мобильная версия */}
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']} className="mobile-only">
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        size='middle'
                    />
                </Dropdown>
            </Header>

            <Content className="homepage-content">
                <TaskList />
            </Content>
        </Layout>
    );
};