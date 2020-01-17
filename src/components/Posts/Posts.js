import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import PostCard from './PostCard';

function Posts() {

    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    if (data) {
        console.log(data)

    }
    return (
        <Grid stackable columns={3} className="masonry grid" >

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
    )
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts{
        id 
        body 
        createdAt 
        username 
        likeCount
        likes{
            username
        }
        commentCount
        comments{
            id username createdAt body
        }
    }
}`

export default Posts;