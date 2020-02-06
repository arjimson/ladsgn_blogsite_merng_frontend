import React, { useContext } from 'react';
import { Grid, Transition, Container } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../../context/auth';

import PostCard from './PostCard';
import PostForm from './PostForm';
import PageLoader from '../Loader';

import { FETCH_POSTS_QUERY } from '../../util/graphql';

function Posts() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return loading ? 
    <PageLoader /> 
    : 
    <Container>
        <Grid stackable columns={3} className="masonry" >
            {user && (
                <Grid.Column>
                    <PostForm />
                </Grid.Column>
            )}
            {loading ? (<h1>Loading ...</h1>)
                : (
                    <Transition.Group>
                        {data.getPosts &&
                            data.getPosts.map((post) => (
                                <Grid.Column key={post.id}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}

        </Grid>
    </Container>



}

export default Posts;