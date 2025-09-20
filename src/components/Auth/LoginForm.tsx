import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, clearError } from '../../store/slices/authSlice';
import { useEffect } from 'react';

const { Title } = Typography;

interface LoginFormProps {
    onSwitchToRegister: VoidFunction;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            await dispatch(login(values)).unwrap();
            message.success('Вход выполнен успешно!');
        } catch (error) {
            message.error('Ошибка входа. Проверьте данные.');
        }
    };

    useEffect(() => {
        if (error) {
            message.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    return (
        <Card style={{ maxWidth: 400, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                Вход
            </Title>

            <Form
                form={form}
                name="login"
                onFinish={handleSubmit}
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Введите email!' },
                        { type: 'email', message: 'Введите корректный email!' },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Введите пароль!' },
                        { min: 6, message: 'Пароль должен содержать минимум 6 символов!' },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Пароль"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button type="link" onClick={onSwitchToRegister}>
                    Нет аккаунта? Зарегистрироваться
                </Button>
            </div>
        </Card>
    );
};