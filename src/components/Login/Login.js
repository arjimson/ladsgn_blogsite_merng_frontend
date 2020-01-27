import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Card, Header } from 'semantic-ui-react';

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
        <div className="form-container login">
            <Card>
                <Card.Content>
                    <Form className={`form-container ${loading ? "loading" : ''}`} onSubmit={onSubmit}>
                        <Header size='huge' className="text-ladsgn-color-red">Login</Header>
                        <Form.Input
                            label="Username"
                            placeholder="Username..."
                            name="username"
                            value={values.username}
                            onChange={onChange}
                            type="text"
                            error={errors.username ? true : false}
                        />
                        <Form.Input
                            label="Password"
                            placeholder="Password..."
                            name="password"
                            value={values.password}
                            onChange={onChange}
                            type="password"
                            error={errors.password ? true : false}
                        />
                        <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit' color="red" className="button-ladsgn-color-red">Submit</Button>
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
                </Card.Content>

            </Card>

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