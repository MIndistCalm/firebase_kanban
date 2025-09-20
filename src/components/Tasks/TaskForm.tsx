import { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message, Space } from 'antd';
import type { TaskFormData } from '../../types';

const { TextArea } = Input;
const { Option } = Select;

interface TaskFormProps {
    visible: boolean;
    title: string;
    initialValues?: Partial<TaskFormData>;
    loading?: boolean;
    onCancel: VoidFunction;
    onSubmit: (values: TaskFormData) => void;
}

export const TaskForm = ({
    visible,
    onCancel,
    onSubmit,
    initialValues,
    loading = false,
    title,
}: TaskFormProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [visible, initialValues, form]);

    const handleSubmit = async (values: TaskFormData) => {
        try {
            await onSubmit(values);
            form.resetFields();
        } catch (error) {
            message.error('Ошибка при сохранении задачи');
        }
    };

    return (
        <Modal
            title={title}
            open={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={initialValues}
            >
                <Form.Item
                    name="title"
                    label="Название задачи"
                    rules={[
                        { required: true, message: 'Введите название задачи!' },
                        { max: 100, message: 'Название должно содержать максимум 100 символов!' },
                    ]}
                >
                    <Input placeholder="Введите название задачи" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Описание"
                    rules={[
                        { max: 500, message: 'Описание должно содержать максимум 500 символов!' },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Введите описание задачи (необязательно)"
                    />
                </Form.Item>

                <Form.Item
                    name="priority"
                    label="Приоритет"
                    rules={[{ required: true, message: 'Выберите приоритет!' }]}
                >
                    <Select placeholder="Выберите приоритет">
                        <Option value="low">Низкий</Option>
                        <Option value="medium">Средний</Option>
                        <Option value="high">Высокий</Option>
                    </Select>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                    <Space>
                        <Button onClick={onCancel}>
                            Отмена
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Сохранить
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};