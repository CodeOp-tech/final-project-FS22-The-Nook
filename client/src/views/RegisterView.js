import React, { useState } from 'react';



let EMPTY_FORM ={
    username: "",
    email: "",
    password: ""
}

function RegisterView(props){
    let [newUser, setInput] = useState(EMPTY_FORM);




    function handleChange(event){
        let { name, value } = event.target;
        setInput(newUser => ({...newUser, [name]: value}))
    }

    function handleSubmit(event){
        event.preventDefault();
        props.registerUser(newUser);

    }

    return(
        <div>
            <h2>Sign up</h2>   
                <form onSubmit={e=> handleSubmit(e)}>
                    <div>
                        <label>Username
                            <input
                                type="text"
                                name="username"
                                required
                                onChange={e=> handleChange(e)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Email
                            <input
                                type="email"
                                name="email"
                                required
                                onChange={e=> handleChange(e)}

                            />
                        </label>
                    </div>
                    <div>
                        <label>Password
                            <input
                                type="password"
                                name="password"
                                required
                                onChange={e=> handleChange(e)}

                            />
                        </label>
                    </div>
                    <button type="submit">Create an account</button>
                </form>
        </div>
    )
}

export default RegisterView