import React from 'react';
import '../styles/general.scss'

import { Provider } from 'react-redux';
import { store } from '../redux/store';

import Root from './func_group/root';

// if you have problem with watchers - use it:
// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

const IndexPage = () => {
  if (typeof window !== `undefined` && store !== 0)
    return (
      <Provider store={ store }>
        <Root />
      </Provider>
    )
  else
    return (
      <>
      </>
    )
}

export default IndexPage