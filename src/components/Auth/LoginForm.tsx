import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, clearError } from '../../store/slices/authSlice';
import { useEffect } from 'react';
import { VALIDATION_CONSTANTS } from '../../constants';
import { useToast } from '../Toast';
import '../../styles/auth.css';

const { Title } = Typography;

interface LoginFormProps {
    onSwitchToRegister: VoidFunction;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const { showToast } = useToast();


    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            await dispatch(login(values)).unwrap();
            showToast(VALIDATION_CONSTANTS.SUCCESS.LOGIN_SUCCESS, 'success');
        } catch (error) {
            showToast(VALIDATION_CONSTANTS.ACTION_ERRORS.LOGIN_ERROR, 'error');
        }
    };

    useEffect(() => {
        if (error) {
            showToast(error, 'error');
            dispatch(clearError());
        }
    }, [error, dispatch, showToast]);

    return (
        <Card className="auth-form-container">
            <Title level={2} className="auth-title">
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
                        { required: true, message: VALIDATION_CONSTANTS.ERRORS.EMAIL_REQUIRED },
                        { type: 'email', message: VALIDATION_CONSTANTS.ERRORS.EMAIL_INVALID },
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
                        { required: true, message: VALIDATION_CONSTANTS.ERRORS.PASSWORD_REQUIRED },
                        { min: VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH, message: VALIDATION_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT },
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

            <div className="auth-switch-link">
                <Button type="link" onClick={onSwitchToRegister} className="auth-switch-button">
                    Нет аккаунта? Зарегистрироваться
                </Button>
            </div>
        </Card>
    );
};