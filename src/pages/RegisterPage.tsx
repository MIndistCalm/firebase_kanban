import { Layout } from 'antd';
import { RegisterForm } from '../components/Auth/RegisterForm';

const { Content } = Layout;

export const RegisterPage = () => {
    return (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Content style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <RegisterForm onSwitchToLogin={() => window.history.back()} />
            </Content>
        </Layout>
    );
};