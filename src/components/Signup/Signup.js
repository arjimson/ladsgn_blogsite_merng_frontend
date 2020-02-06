import React, { useContext, useState } from 'react';
import { Button, Form, Card, Header } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

function Signup(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })



    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container signup">
            <Card fluid>
                <Card.Content>
                    <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                        <Header size='huge' className="text-ladsgn-color-red">Signup</Header>
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

                        <Button type='submit' color="red" className="button-ladsgn-color-red">Signup</Button>
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