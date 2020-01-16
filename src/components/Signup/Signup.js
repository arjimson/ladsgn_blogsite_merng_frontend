import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


function Signup() {

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    const onSubmit = (e) => {
        e.preventDefault();
        addUser();
    };


    return (
        <div className="form-container">
            <h1>Signup</h1>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={onChange}
                    error={errors.username ? true : false}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false}

                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false}

                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword ? true : false}

                />

                <Button type='submit' primary>Signup</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
) {
    register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ) {
        id email username createdAt token
    }
}
`

export default Signup;