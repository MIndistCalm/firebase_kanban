import { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { register, clearError } from '../../store/slices/authSlice';
import '../../styles/auth.css';

const { Title } = Typography;

interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);

    const handleSubmit = async (values: { email: string; password: string; confirmPassword: string; displayName?: string }) => {
        if (values.password !== values.confirmPassword) {
            message.error('Пароли не совпадают!');
            return;
        }

        try {
            await dispatch(register({
                email: values.email,
                password: values.password,
                displayName: values.displayName,
            })).unwrap();
            message.success('Регистрация выполнена успешно!');
            navigate('/home');
        } catch (error) {
            message.error('Ошибка регистрации. Попробуйте еще раз.');
        }
    };

    useEffect(() => {
        if (error) {
            message.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    return (
        <Card className="auth-form-container">
            <Title level={2} className="auth-title">
                Регистрация
            </Title>

            <Form
                form={form}
                name="register"
                onFinish={handleSubmit}
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="displayName"
                    rules={[
                        { max: 50, message: 'Имя должно содержать максимум 50 символов!' },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Имя (необязательно)"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Введите email!' },
                        { type: 'email', message: 'Введите корректный email!' },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined />}
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

                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Подтвердите пароль!' },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Подтвердите пароль"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>

            <div className="auth-switch-link">
                <Button type="link" onClick={onSwitchToLogin} className="auth-switch-button">
                    Уже есть аккаунт? Войти
                </Button>
            </div>
        </Card>
    );
};