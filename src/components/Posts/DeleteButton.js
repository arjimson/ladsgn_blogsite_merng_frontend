import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

function DeleteButton({ history, postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: { getPosts: data.getPosts.filter((post) => post.id !== postId) }
                });
                history.push('/');
            }
            if(callback) callback();
       
        },
        variables: {
            postId,
            commentId
        }
    })
    return (
        <>
            <Button
                icon
                color="red"
                floated="right"
                onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' />
            </Button>

            <Confirm open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>

    )
}

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments{
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;


const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
}
`;
export default DeleteButton;