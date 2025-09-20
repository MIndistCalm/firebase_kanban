import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { store } from './store';
import { AppRouter } from './AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';


export const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <Router>
          <AppRouter />
        </Router>
      </ConfigProvider>
    </Provider>
  );
};