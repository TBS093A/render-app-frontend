import React from 'react';
// import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

import Root from './func_group/root';

// if you have problem with watchers - use it:
// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

const Index = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}

export default Index