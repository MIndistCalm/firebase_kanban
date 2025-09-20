import { registerUser, loginUser, logoutUser } from "../services/authService";

// Тестовая функция для проверки сервиса аутентификации
export const testAuthService = async () => {

    try {
        // Тест регистрации
        const testEmail = `test-${Date.now()}@example.com`;
        const testPassword = 'testpassword123';

        const user = await registerUser(testEmail, testPassword, 'Test User');
        console.log('Регистрация успешна:', user);

        // Тест входа
        console.log('2. Тестируем вход...');
        const loggedInUser = await loginUser(testEmail, testPassword);
        console.log('Вход успешен:', loggedInUser);

        // Тест выхода
        console.log('3. Тестируем выход...');
        await logoutUser();
        console.log('Выход успешен');

        console.log('Все тесты прошли успешно!');

    } catch (error) {
        console.error(' Ошибка в тестах:', error);
    }
};