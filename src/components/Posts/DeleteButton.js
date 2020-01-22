import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

function DeleteButton({ postId }) {
    const [confirmOpen, setConfirmOpen] = useState(false);


    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update() {
            setConfirmOpen(false);
        },
        refetchQueries: [{ query: FETCH_POSTS_QUERY }],
        variables: {
            postId
        }
    })
    return (
        <>
            <Button
                as="div"
                color="red"
                floated="right"
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name="trash" />
            </Button >
            <Confirm open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>

    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
}
`;
export default DeleteButton;