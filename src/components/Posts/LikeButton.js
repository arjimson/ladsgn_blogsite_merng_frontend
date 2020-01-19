import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Icon, Button, Label } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

function LikeButton({ user, post: { id, likes, likeCount } }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
            console.log(user)
        } else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: id
        },
        refetchQueries: [{ query: FETCH_POSTS_QUERY }]

    })

    const likeButton = user ? (
        liked ? (
            <Button color='red' onClick={likePost}>
                <Icon name='heart' />
            </Button>
        ) : (
                <Button color='red' basic onClick={likePost}>
                    <Icon name='heart' />
                </Button>
            )
    ) : (
            <Button color='red' as={Link} to="/login" basic>
                <Icon name='heart' />
            </Button>
        )

    return (
        <Button
            as='div'
            labelPosition='right'

        >
            {likeButton}
            <Label basic color='red' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
        id
        likes {
            id
            username
        }
        likeCount
    }
}
`;

export default LikeButton;