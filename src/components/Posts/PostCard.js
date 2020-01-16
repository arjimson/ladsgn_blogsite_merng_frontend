import React from 'react';
import { Card, Icon, Image, Button, Label  } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import moment from 'moment';

function PostCard({ post: { id, username, likeCount, commentCount } }) {
    const likePost = () => {
        console.log('Like post!')
    }
    const commentOnPost = () => {
        console.log('Comment on post!')
    }

    return (
        <Card fluid style={{marginBottom: '30px'}}>
            <Image src="" wrapped ui={false} />
            <Card.Content>
                <Image src="" floated='right'
                    size='mini' />
                <Card.Header floated='left'>{username}</Card.Header>
                <Card.Meta
                    as={Link}
                    to={`/posts/${id}`}
                >
                    {/* <span className='date'>{moment().fromNow()}</span> */}
                    <span className='date'>2 days ago</span>

                </Card.Meta>
                <Card.Description>
                    Sample Description
                </Card.Description>
            </Card.Content>
            
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='red'>
                        <Icon name='heart' />
                        
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentOnPost}>
                    <Button color='blue'>
                        <Icon name='comments' />
                        
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
        
            </Card.Content>
        </Card>
    )
}

export default PostCard;