import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../../util/hooks';
import { FETCH_POSTS_QUERY } from '../../util/graphql';
function PostForm(props) {
    let [errors, setErrors] = useState({})

    let { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [imagePost, setImagePost] = useState('');

    const selectImageOnChange = ({
        target: {
            validity,
            files: [file]
        }
    }) => validity.valid && setImagePost(file);


    let [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        variables: {
            body: values.body,
            file: imagePost
        },
        refetchQueries: [{ query: FETCH_POSTS_QUERY }],
        update() {
            values.body = '';
            document.getElementById('imagePost').value = '';
            setErrors({});
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    });

    function createPostCallback() {
        createPost();
    }

    console.log(values.body, 'body');


    return (
        <>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Create a post:</h1>
                <Form.Field>
                    <Form.Input
                        placeholder="Enter description.."
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={errors.body ? true : false}
                        type="text"
                    />
                    <Form.Input
                        placeholder="Enter description.."
                        name="imagePost"
                        id="imagePost"
                        onChange={selectImageOnChange}
                        error={errors.file ? true : false}
                        type="file"
                    />

                    <Button type='submit' color="green">Post</Button>
                </Form.Field>
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
        </>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!, $file: Upload!){
    createPost(body: $body, file: $file) {
        id 
        body 
        createdAt 
        username 
        postImagePath
        likes {
            id 
            username 
            createdAt
        }
        likeCount
        comments {
            id 
            body 
            username 
            createdAt
        }
        commentCount
    }
}`;

export default PostForm;