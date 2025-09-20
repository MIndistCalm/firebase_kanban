import { Layout, Button, Typography, Space, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/slices/authSlice';
import { TaskDashboard } from '../components/Tasks/TaskDashboard';
import { VALIDATION_CONSTANTS } from '../constants';
import { useToast } from '../components/Toast';
import '../styles/homepage.css';

const { Header, Content } = Layout;
const { Text } = Typography;

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { showToast } = useToast();

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            showToast(VALIDATION_CONSTANTS.SUCCESS.LOGOUT_SUCCESS, 'success');
        } catch (error) {
            showToast(VALIDATION_CONSTANTS.ACTION_ERRORS.LOGOUT_ERROR, 'error');
        }
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
                    TM
                </Typography.Title>
                {/* Бургер меню */}
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        size='middle'
                    />
                </Dropdown>
            </Header>

            <Content className="homepage-content">
                <TaskDashboard />
            </Content>
        </Layout>
    );
};