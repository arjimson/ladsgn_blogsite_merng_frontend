import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, Grid, Image, Icon, Label } from 'semantic-ui-react';

import moment from 'moment';

import { AuthContext } from '../context/auth';
import DeleteButton from '../components/Posts/DeleteButton';
import LikeButton from '../components/Posts/LikeButton';

function SinglePost(props) {

    const postId = props.match.params.postId;

    const { user } = useContext(AuthContext);

    const { data: { getPost } } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, body, createdAt, username, comments, likes, commentCount } = getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src="https://react.semantic.-ui.com/images/avatar/large/elliot.png"
                            size="small"
                            float="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('comment on post')}
                                >
                                    <Button basic color="blue" >
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left" >
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        )
    }

    return postMarkup;
}

const FETCH_POST_QUERY = gql`
query($postId: ID!) {
    getPost(postId: $postId) {
        id
        body
        createdAt
        username
        likeCount
        likes {
            username
        }
        commentCount
        comments {
            id
            username
            createdAt
        }
    }
}
`;

export default SinglePost;