import React, { useContext } from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../../context/auth';

import PostCard from './PostCard';
import PostForm from './PostForm';

import { FETCH_POSTS_QUERY } from '../../util/graphql';

function Posts() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    // if (data) {
    //     console.log(data);
    // }

    console.log(user)

    return (
        <div className="posts-container">
           <h1 style={{textAlign: 'center'}}>Recent Posts</h1>
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
        </div>
    )
}

export default Posts;