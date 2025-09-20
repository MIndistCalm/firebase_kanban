import { Layout } from 'antd';
import { LoginForm } from '../components/Auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const { Content } = Layout;

export const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <Layout className="auth-layout">
            <Content className="auth-content">
                <LoginForm onSwitchToRegister={() => navigate('/register')} />
            </Content>
        </Layout>
    );
};