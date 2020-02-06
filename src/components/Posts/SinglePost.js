import React, { useContext, useState } from 'react';
import { Card, Grid, Image, Form, Button, Icon, Label, Breadcrumb, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { AuthContext } from '../../context/auth';
import { useMutation } from '@apollo/react-hooks';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function SinglePost(props) {


    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const [comment, setComment] = useState('');

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('')
        },
        variables: {
            postId,
            body: comment
        }
    })


    let postMarkup;

    if (!data) {
        postMarkup = <p>Loading..</p>;
    } else {
        const { getPost } = data;
        const { id, body, createdAt, username, comments, likes, likeCount, postImagePath, commentCount } = getPost;



        postMarkup = <React.Fragment>
            <Container>
                <Grid >
                    <Grid.Row>
                        <Grid.Column className="py-0 mt-2" >
                            <Breadcrumb>
                                <Button
                                    color="red"
                                    icon
                                    size="tiny"
                                    as={Link}
                                    to="/">
                                    <Icon name='close' color="arrow left" />
                                </Button>
                            </Breadcrumb>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card fluid>
                                <Image
                                    src={postImagePath && `https://ladbrokes-ladsgn-testenv.herokuapp.com/assets/post/${postImagePath}`}
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
                                        <DeleteButton postId={id} {...props} />
                                    )}
                                </Card.Content>
                            </Card>
                            {user && (
                                <Card fluid>
                                    <Card.Content>
                                        <p>Post a comment:</p>
                                        <Form>
                                            <div className="ui action input fluid">
                                                <input
                                                    type="text"
                                                    placeholder="Comment.."
                                                    name="comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                                <button type="submit" className="ui button teal" disabled={comment.trim() === ''}
                                                    onClick={submitComment}>
                                                    Submit
                                        </button>

                                            </div>
                                        </Form>
                                    </Card.Content>
                                </Card>
                            )}
                            {comments.map((comment) => (
                                <Card fluid key={comment.id}>

                                    <Card.Content>
                                        {user && user.username === comment.username && (
                                            <DeleteButton postId={id} commentId={comment.id} />
                                        )}
                                        <Card.Header>
                                            {comment.username}
                                        </Card.Header>
                                        <Card.Meta>
                                            {moment(comment.createdAt).fromNow()}
                                        </Card.Meta>
                                        <Card.Description>
                                            {comment.body}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </React.Fragment>;

    }

    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
mutation($postId: String!, $body: String!){
    createComment(postId: $postId, body: $body) {
        id
        comments {
            id
            body
            createdAt
            username
        }
        commentCount
    }
}`;

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