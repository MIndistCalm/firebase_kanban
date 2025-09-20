import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from './store';
import { AppRouter } from './AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './components/Toast';


export const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <ConfigProvider locale={ruRU}>
          <Router>
            <AppRouter />
          </Router>
        </ConfigProvider>
      </ToastProvider>
    </Provider>
  );
};