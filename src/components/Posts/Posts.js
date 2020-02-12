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
            <div class="ui three column doubling stackable masonry grid">
                {user &&
                    <PostForm />
                }
                {loading ? (<h1>Loading ...</h1>)
                    : (
                        data.getPosts &&
                        data.getPosts.map((post) => (
                            <PostCard post={post} postClicked={postClicked} />
                        ))
                    )}
            </div>
            <PostModal modal={modal} handleModalClose={handleModalClose} postId={postId} />
        </Container>
}

export default Posts;