// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1. Import Bootstrap CSS (sẽ bị ghi đè bởi index.css nếu cần)
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Import file CSS chính của bạn (chứa Tailwind và các override)
import './index.css';

import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import allReducers from './reducers'; // Đảm bảo đường dẫn này đúng
import {Provider} from 'react-redux';
import { createStore } from 'redux';

const store = createStore(allReducers);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);