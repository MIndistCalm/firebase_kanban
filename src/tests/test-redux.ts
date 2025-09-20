import { store } from '../store';
import { register, login, initAuth } from '../store/slices/authSlice';
import { addTask, fetchTasks, toggleTask, removeTask } from '../store/slices/taskSlice';

// Тестовая функция для проверки Redux store
export const testReduxStore = async () => {
    console.log('Тестирование Redux store...');

    try {
        // Сначала инициализируем аутентификацию
        console.log('0. Инициализируем аутентификацию...');
        await store.dispatch(initAuth());

        // Тест регистрации через Redux
        console.log('1. Тестируем регистрацию через Redux...');
        const testEmail = `test-redux-${Date.now()}@example.com`;
        const testPassword = 'testpassword123';

        const registerResult = await store.dispatch(register({
            email: testEmail,
            password: testPassword,
            displayName: 'Test User'
        }));

        if (registerResult.type.endsWith('fulfilled')) {
            console.log('Регистрация через Redux успешна');

            // Тест входа через Redux
            console.log('2. Тестируем вход через Redux...');
            const loginResult = await store.dispatch(login({
                email: testEmail,
                password: testPassword
            }));

            if (loginResult.type.endsWith('fulfilled')) {
                console.log('Вход через Redux успешен');

                // Тест добавления задачи через Redux
                console.log('3. Тестируем добавление задачи через Redux...');
                const addTaskResult = await store.dispatch(addTask({
                    taskData: {
                        title: 'Test Task',
                        description: 'Test Description',
                        priority: 'medium'
                    },
                    userId: (loginResult.payload as any).uid
                }));

                if (addTaskResult.type.endsWith('fulfilled')) {
                    console.log('Добавление задачи через Redux успешно');
                    const taskId = (addTaskResult.payload as any).id;

                    // Тест получения задач через Redux
                    console.log('4. Тестируем получение задач через Redux...');
                    const fetchTasksResult = await store.dispatch(fetchTasks((loginResult.payload as any).uid));

                    if (fetchTasksResult.type.endsWith('fulfilled')) {
                        console.log('Получение задач через Redux успешно');
                        console.log('Tasks:', fetchTasksResult.payload);

                        // Тест переключения статуса задачи
                        console.log('5. Тестируем переключение статуса задачи...');
                        const toggleTaskResult = await store.dispatch(toggleTask({
                            taskId: taskId,
                            completed: true
                        }));

                        if (toggleTaskResult.type.endsWith('fulfilled')) {
                            console.log('Переключение статуса задачи успешно');

                            // Тест удаления задачи
                            console.log('6. Тестируем удаление задачи...');
                            const removeTaskResult = await store.dispatch(removeTask(taskId));

                            if (removeTaskResult.type.endsWith('fulfilled')) {
                                console.log('Удаление задачи успешно');
                                console.log('Все тесты Redux прошли успешно!');
                            } else {
                                console.error('Ошибка при удалении задачи:', removeTaskResult.payload);
                            }
                        } else {
                            console.error('Ошибка при переключении статуса задачи:', toggleTaskResult.payload);
                        }
                    } else {
                        console.error('Ошибка при получении задач:', fetchTasksResult.payload);
                    }
                } else {
                    console.error('Ошибка при добавлении задачи:', addTaskResult.payload);
                }
            } else {
                console.error('Ошибка при входе:', loginResult.payload);
            }
        } else {
            console.error('Ошибка при регистрации:', registerResult.payload);
        }

    } catch (error) {
        console.error('Ошибка в тестах Redux:', error);
    }
};