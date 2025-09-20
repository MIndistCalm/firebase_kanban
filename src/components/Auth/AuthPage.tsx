import { useState } from 'react';
import { Layout } from 'antd';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const { Content } = Layout;

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Content style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                {isLogin ? (
                    <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
                )}
            </Content>
        </Layout>
    );
};