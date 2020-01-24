import React, { useContext } from 'react';
import { Card, Grid, Image, Button, Icon, Label } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { AuthContext } from '../../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function SinglePost(props) {

    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;

    if (!data) {
        postMarkup = <p>Loading..</p>;
    } else {
        const { getPost } = data;
        const { id, body, createdAt, username, comments, likes, likeCount, postImagePath, commentCount } = getPost;

        postMarkup = <React.Fragment>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Card fluid>
                            <Image
                                src={postImagePath && `http://morning-garden-61714.herokuapp.com/assets/post/${postImagePath}`}
                            />
                            <Card.Content>
                                <Card.Header>
                                    {username}
                                </Card.Header>
                                <Card.Description>
                                    {body}
                                </Card.Description>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('Comment on post')}
                                >
                                    <Button
                                        basic
                                        color="blue"
                                    >
                                        <Icon name="comments"
                                        />
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} {...props}/>
                                )}
                            </Card.Content>
                        </Card>
                        { comments.map((comment) => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    { user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta>
                                        {moment(comment.createdAt).fromNow()}
                                    </Card.Meta>
                                    <Card.body>
                                        {comment.body}
                                    </Card.body>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid></React.Fragment>;

    }

    return postMarkup;
}

const FETCH_POST_QUERY = gql`
query($postId: ID!) {
    getPost(postId : $postId) {
        id
        body
        createdAt
        username
        likeCount
        postImagePath
        likes {
            username
        }
        commentCount
        comments {
            id
            username
            body
            createdAt
        }
    }
}
`;

export default SinglePost;