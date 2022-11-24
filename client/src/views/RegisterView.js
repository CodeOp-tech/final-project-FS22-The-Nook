import React, { useState } from 'react';
import './RegisterView.css'



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
            <div className="container container-register">
            <h2>Sign up</h2>   
                <form class="mb-3" onSubmit={e=> handleSubmit(e)}>
                    <div class="col-auto">
                        <label>Username</label>
                            <input
                            class="form-control form-control-sm registerInputsFields"
                                type="text"
                                name="username"
                                required
                                onChange={e=> handleChange(e)}
                            />
                        
                    </div>
                    <div>
                        <label>Email</label>
                            <input
                            class="form-control form-control-sm registerInputsFields"
                                type="email"
                                name="email"
                                required
                                onChange={e=> handleChange(e)}

                            />
                        
                    </div>
                    <div>
                        <label>Password </label>
                            <input
                            class="form-control form-control-sm registerInputsFields"
                                type="password"
                                name="password"
                                required
                                onChange={e=> handleChange(e)}

                            />
                       
                    </div>
                    <button type="submit" className="btn btn-outline-dark btn-sm register-button" >Create Account</button>
            
                </form>

                <p>Already have an account? </p>
                        
                    <a type="button" className="btn btn-outline-dark btn-sm signup-button" href="/login" >Log In</a>
        </div>
        </div>
    )
}

export default RegisterView