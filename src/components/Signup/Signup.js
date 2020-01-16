import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';


function Signup() {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="form-container">
            <h1>Signup</h1>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading": ''}>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                />

                <Button type='submit' primary>Signup</Button>
            </Form>
        </div>
    )
}

export default Signup;