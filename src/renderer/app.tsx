import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from './store';
import Entry from './containers/Entry';


const mainElement = document.createElement('div');
mainElement.className = 'root';
document.body.appendChild(mainElement);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Entry />
        </Provider>
    </AppContainer>,
    mainElement
)
