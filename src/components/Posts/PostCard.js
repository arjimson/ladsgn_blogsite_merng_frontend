import React, { useContext } from 'react';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import moment from 'moment';



function PostCard({ post: { id, username, createdAt, likes, likeCount, commentCount, body, postImagePath } }) {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Card fluid >
                <Image src={postImagePath && `http://morning-garden-61714.herokuapp.com/assets/post/${postImagePath}`} />
                <Card.Content>
                    <Card.Header floated='left'>{username}</Card.Header>
                    <Card.Meta
                        as={Link}
                        to={`/posts/${id}`}
                    >
                        <span className='date'>{moment(createdAt).fromNow(true)}</span>
                    </Card.Meta>
                    <Card.Description>
                        {body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <LikeButton user={user} post={{ id, likes, likeCount }} />
                    <Button
                        as={Link}
                        to={`/posts/${id}`}
                        labelPosition='right'
                    >
                        <Button color='blue'>
                            <Icon name='comments' />

                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                    {user && user.username === username && (
                        <DeleteButton postId={id} />
                    )}
                </Card.Content>
            </Card>
        </>
    )
}

export default PostCard;