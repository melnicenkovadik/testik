import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/style.scss';
import {BrowserRouter} from "react-router-dom";
import {ModalProvider} from "./utils/modalContext";

ReactDOM.render(
    <BrowserRouter>
        <ModalProvider>
            <App/>
        </ModalProvider>
    </BrowserRouter>
    , document.querySelector('#root'));
