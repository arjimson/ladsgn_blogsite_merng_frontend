import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../../util/hooks';
import gql from 'graphql-tag';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCb, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    });

    function loginUserCb() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form className="form-container" onSubmit={onSubmit}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    type="text"
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    type="password"
                />
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
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

const LOGIN_USER = gql`
mutation login(
    $username: String!
    $password: String!
){
    login(
        username: $username password: $password
    ) {
        id
        email
        username
        createdAt
        token
    }
}`
export default Login;