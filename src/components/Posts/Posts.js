import React, { useContext, useState } from 'react';
import { Grid, Transition, Container } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../../context/auth';

import PostCard from './PostCard';
import PostForm from './PostForm';
import PageLoader from '../Loader';
import PostModal from './PostModal';

import { FETCH_POSTS_QUERY } from '../../util/graphql';



function Posts() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    const [modal, setModal] = useState(false);
    const [postId, setPostId] = useState("")

    const postClicked = (id) => {
        setPostId(id);
        setModal(true);
    }

    const handleModalClose = () => {
        setModal(false);
    }



    return loading ? 
    <PageLoader /> 
    : 
    <Container>
        <Grid stackable columns={3} className="masonry" >
            {user && (
                <Grid.Column>
                    <PostForm />
                    <PostModal modal={modal} handleModalClose={handleModalClose} postId={postId} />
                </Grid.Column>
            )}
            {loading ? (<h1>Loading ...</h1>)
                : (
                    <Transition.Group>
                        {data.getPosts &&
                            data.getPosts.map((post) => (
                                <Grid.Column key={post.id}>
                                    <PostCard post={post} postClicked={postClicked}/>
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}

        </Grid>
    </Container>



}

export default Posts;