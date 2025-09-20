import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { initAuth } from './store/slices/authSlice';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';

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

  return user ? <HomePage /> : <AuthPage />;
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