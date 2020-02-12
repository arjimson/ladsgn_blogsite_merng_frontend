import React, { useContext } from 'react';
import { Card, Icon, Image, Button, Label, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import moment from 'moment';

function PostCard({ post: { id, username, createdAt, likes, likeCount, commentCount, body, postImagePath }, postClicked }) {
    const { user } = useContext(AuthContext);

    const postImage = `https://ladbrokes-ladsgn-testenv.herokuapp.com/assets/post/${postImagePath}`

    const handlePostClicked = (id) => postClicked(id);

    return (
        <Grid.Column>
            <Card fluid>
                <Image src={postImage} wrapped ui={false} />
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'
                    />
                    <Card.Header floated='left'>{username}</Card.Header>
                    <Card.Meta
                        as={Link}
                        onClick={() => handlePostClicked(id)}
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
                        onClick={() => handlePostClicked(id)}
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
        </Grid.Column>
    )
}

export default PostCard;