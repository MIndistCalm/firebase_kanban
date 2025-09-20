import { Layout } from 'antd';
import { RegisterForm } from '../components/Auth/RegisterForm';
import '../styles/auth.css';

const { Content } = Layout;

export const RegisterPage = () => {
    return (
        <Layout className="auth-layout">
            <Content className="auth-content">
                <RegisterForm onSwitchToLogin={() => window.history.back()} />
            </Content>
        </Layout>
    );
};