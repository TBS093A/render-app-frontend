import React from 'react';

import '../styles/general.000.scss';
import '../styles/LoginPage.cube.scss';

// import { Provider } from 'react-redux';
// import { store } from '../redux/store';

// import Root from './func_group/root';

// if you have problem with watchers - use it:
// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

// const IndexPage = () => {
//   if (typeof window !== `undefined` && store !== 0)
//     return (
//       <Provider store={ store }>
//         <Root />
//       </Provider>
//     )
//   else
//     return (
//       <>
//       </>
//     )
// }

const IndexPage = () => {
    return (
        <div className="login-container">
            <header className="header">
                <h1>X-GPU</h1>
            </header>
            <main className="main-content">
                <div className="graphic-container">
                    <div className="cube">
                        <div className="front"></div>
                        <div className="back"></div>
                        <div className="right"></div>
                        <div className="left"></div>
                        <div className="top"></div>
                        <div className="bottom"></div>
                    </div>
                </div>
                <form className="login-form">
                    <div className="form-field">
                        <label htmlFor="login">
                            EMAIL
                        </label>
                        <input type="text" id="login" name="login" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">
                            PASSWORD
                        </label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">CONTINUE</button>
                </form>
            </main>
        </div>
    )
}


export default IndexPage
