import { useEffect } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { register, clearError } from '../../store/slices/authSlice';
import { VALIDATION_CONSTANTS } from '../../constants';
import { useToast } from '../Toast';
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
    const { showToast } = useToast();

    const handleSubmit = async (values: { email: string; password: string; confirmPassword: string; displayName?: string }) => {
        if (values.password !== values.confirmPassword) {
            showToast(VALIDATION_CONSTANTS.ERRORS.PASSWORDS_NOT_MATCH, 'error');
            return;
        }

        try {
            await dispatch(register({
                email: values.email,
                password: values.password,
                displayName: values.displayName,
            })).unwrap();
            showToast(VALIDATION_CONSTANTS.SUCCESS.REGISTER_SUCCESS, 'success');
            navigate('/home');
        } catch (error) {
            showToast(VALIDATION_CONSTANTS.ACTION_ERRORS.REGISTER_ERROR, 'error');
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
                        { max: VALIDATION_CONSTANTS.DISPLAY_NAME_MAX_LENGTH, message: VALIDATION_CONSTANTS.ERRORS.DISPLAY_NAME_TOO_LONG },
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
                        { required: true, message: VALIDATION_CONSTANTS.ERRORS.EMAIL_REQUIRED },
                        { type: 'email', message: VALIDATION_CONSTANTS.ERRORS.EMAIL_INVALID },
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
                        { required: true, message: VALIDATION_CONSTANTS.ERRORS.PASSWORD_REQUIRED },
                        { min: VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH, message: VALIDATION_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT },
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
                        { required: true, message: VALIDATION_CONSTANTS.ERRORS.CONFIRM_PASSWORD_REQUIRED },
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