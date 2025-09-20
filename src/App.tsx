import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Button, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { initAuth, logout } from './store/slices/authSlice';
import { AuthPage } from './components/Auth/AuthPage';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Добро пожаловать, {user.displayName || user.email}!</h1>
          <p>Вы успешно вошли в систему</p>
          <Button onClick={() => dispatch(logout())}>Выйти</Button>
        </div>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <AppContent />
      </ConfigProvider>
    </Provider>
  );
};