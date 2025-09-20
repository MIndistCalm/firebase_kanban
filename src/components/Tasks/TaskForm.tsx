import { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space } from 'antd';
import type { TaskFormData } from '../../types';
import { VALIDATION_CONSTANTS, TASK_PRIORITIES, TASK_PRIORITY_LABELS, UI_CONSTANTS } from '../../constants';
import { useToast } from '../Toast';
import '../../styles/taskform.css';

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
    const { showToast } = useToast();

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
            showToast('Ошибка при сохранении задачи', 'error');
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
                        { required: true, message: VALIDATION_CONSTANTS.ERRORS.TASK_TITLE_REQUIRED },
                        { max: VALIDATION_CONSTANTS.TASK_TITLE_MAX_LENGTH, message: VALIDATION_CONSTANTS.ERRORS.TASK_TITLE_TOO_LONG },
                    ]}
                >
                    <Input placeholder="Введите название задачи" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Описание"
                    rules={[
                        { max: VALIDATION_CONSTANTS.TASK_DESCRIPTION_MAX_LENGTH, message: VALIDATION_CONSTANTS.ERRORS.TASK_DESCRIPTION_TOO_LONG },
                    ]}
                >
                    <TextArea
                        rows={UI_CONSTANTS.TEXTAREA_ROWS}
                        placeholder="Введите описание задачи (необязательно)"
                    />
                </Form.Item>

                <Form.Item
                    name="priority"
                    label="Приоритет"
                    rules={[{ required: true, message: VALIDATION_CONSTANTS.ERRORS.TASK_PRIORITY_REQUIRED }]}
                >
                    <Select placeholder="Выберите приоритет">
                        <Option value={TASK_PRIORITIES.LOW}>{TASK_PRIORITY_LABELS[TASK_PRIORITIES.LOW]}</Option>
                        <Option value={TASK_PRIORITIES.MEDIUM}>{TASK_PRIORITY_LABELS[TASK_PRIORITIES.MEDIUM]}</Option>
                        <Option value={TASK_PRIORITIES.HIGH}>{TASK_PRIORITY_LABELS[TASK_PRIORITIES.HIGH]}</Option>
                    </Select>
                </Form.Item>

                <Form.Item className="taskform-submit-buttons">
                    <Space>
                        <Button onClick={onCancel} className="taskform-cancel-button">
                            Отмена
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading} className="taskform-submit-button">
                            Сохранить
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};