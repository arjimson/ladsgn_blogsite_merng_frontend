import React, { useState, useContext } from 'react'
import { Button, Header, Icon, Modal, Grid, Image, Segment, Comment, Form, Label } from 'semantic-ui-react';
import moment from 'moment';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';

import LikeButton from './LikeButton';
import { AuthContext } from '../../context/auth';

function PostModal({ postId, modal, handleModalClose }) {

    const [comment, setComment] = useState('');

    const { user } = useContext(AuthContext);

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
        const { id, likes, body, likeCount, postImagePath, username, comments, commentCount } = getPost;
        const image = `http://localhost:5000/assets/post/${postImagePath}`;

        const postBody = <p>{body}</p>;
        let postComments;

        if (comments.length > 0) {
            postComments = comments.map(comment =>
                <Comment>
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>  <span className='date'>{moment(comment.createdAt).fromNow(true)}</span></div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.body}</Comment.Text>
                    </Comment.Content>
                </Comment>

            )
        }

        postMarkup = <Modal.Content>
            <Grid stackable columns={2}>
                <Grid.Column>
                    <Image src={image} centered />
                </Grid.Column>
                <Grid.Column>
                    <h2>What is Lorem Ipsum?</h2>
                    <Grid.Row style={{ height: '50px' }}>
                        <Image
                            size='mini'
                            floated='left'
                            src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'
                        />
                        {username}
                    </Grid.Row>
                    <Grid.Row>
                        {postBody}
                    </Grid.Row>
                    <Grid.Row>
                        <LikeButton user={user} post={{ id, likes, likeCount }} />
                    </Grid.Row>
                    <Comment.Group>
                        <Header as='h3' dividing>
                            Comments
                            <Label color='red'>
                                {commentCount > 0 ? commentCount : '0'}
                            </Label>
                        </Header>
                        <div style={{ overflow: 'auto', maxHeight: 200 }}>
                            {postComments}
                        </div>
                        {user && <Form reply>
                            <Form.TextArea
                                placeholder="Comment.."
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} />
                            <Button
                                content='Add Comment'
                                labelPosition='left'
                                icon='edit'
                                primary
                                disabled={comment.trim() === ''}
                                onClick={() => submitComment()} />
                        </Form>}
                    </Comment.Group>
                </Grid.Column>
            </Grid>
        </Modal.Content>

    }



    return (
        <>
            <Modal
                open={modal}
                onClose={handleModalClose}
                basic
                size='fullscreen'
            >
                {postMarkup}
            </Modal>
        </>
    )
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

export default PostModal;