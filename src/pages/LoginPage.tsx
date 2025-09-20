import { Layout } from 'antd';
import { LoginForm } from '../components/Auth/LoginForm';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

export const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Content style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <LoginForm onSwitchToRegister={() => navigate('/register')} />

            </Content>
        </Layout>
    );
};