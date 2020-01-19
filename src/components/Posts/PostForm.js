import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../../util/hooks';
import { FETCH_POSTS_QUERY } from '../../util/graphql';
function PostForm(props) {
    const [errors, setErrors] = useState({})

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: '',
        postImagePath: ''
    });

    const [imagePost, setImagePost] = useState('');

    const selectImageOnChange = ({
        target: {
            validity,
            files: [file]
        }
    }) => validity.valid && setImagePost(file);


    const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
        variables: {
            body: values.body,
            postImagePath: values.postImagePath,
            file: imagePost
        },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY, data
            })
            console.log(result)
            values.body = '';
            values.postImagePath = '';
            imagePost = '';
            setErrors({});
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    });

    function createPostCallback() {
        createPost();
    }


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
                        name="postImagePath"
                        onChange={selectImageOnChange}
                        error={errors.postImagePath ? true : false}
                        type="file"
                    />

                    <Button type='submit'>Add post</Button>
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
mutation createPost($body: String!, $postImagePath: String!, $file: Upload!){
    createPost(body: $body, postImagePath: $postImagePath, file: $file) {
        id body createdAt username postImagePath
        likes {
            id username createdAt
        }
        likeCount
        comments {
            id body username createdAt
        }
        commentCount
    }
}`;

export default PostForm;