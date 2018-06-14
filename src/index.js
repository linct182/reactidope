import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'emotion';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './utils/tokenRefresh';

import App from './views/App';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  * {
    box-sizing: border-box;
  }
  @font-face {
    font-family: Raleway;
    font-weight: 200;
    src: url('./assets/fonts/Raleway-Regular.ttf');
  }
`
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
