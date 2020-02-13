import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
{
    getPosts{
        id 
        title
        body 
        createdAt 
        username 
        postImagePath
        likes {
            id 
            username 
            createdAt
        }
        likeCount
        comments {
            id 
            body 
            username 
            createdAt
        }
        commentCount
    }
}`