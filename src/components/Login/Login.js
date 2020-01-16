import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';


function Login() {

    const [ values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    return (
        <div>
            <Form className="form-container">
                <h1>Login</h1>
                <Form.Input
                    label= "Username"
                    placeholder = "Username..."
                    name="username"
                    value={values.username}
                />

                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default Login;