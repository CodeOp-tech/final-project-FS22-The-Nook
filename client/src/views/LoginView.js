import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(event) {
        let { name, value } = event.target;
        switch (name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.loginCb(username, password);
    }

    return (
        <div>
            <div>
                <h2>Login</h2>
                
                {
                    props.loginError && (
                        <div className="alert alert-danger">{props.loginError}</div>
                    )
                }

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username
                            <input
                                type="text"
                                name="usernameInput"
                                required
                                value={username}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div>
                        <label>Password
                            <input
                                type="password"
                                name="passwordInput"
                                required
                                value={password}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <button type="submit">Submit</button>
                    <p>Don't have an account yet? <Link to="/register">Sign Up</Link></p> 
                </form>
            </div>
        </div>
    );

}

export default LoginView;