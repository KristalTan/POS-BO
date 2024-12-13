import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <AppRouter />
    // </React.StrictMode>

    /*
        If your app is running in development mode and React.StrictMode is enabled 
        (which is the default for projects created with create-react-app), 
        React may intentionally call certain lifecycle methods like useEffect twice during development to help identify side effects.
    */
);