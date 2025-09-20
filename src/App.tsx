import './App.css';
import { testReduxStore } from './tests/test-redux';

export const App = () => {
  testReduxStore();
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <p>Приложение для управления задачами</p>
    </div>
  );
}
