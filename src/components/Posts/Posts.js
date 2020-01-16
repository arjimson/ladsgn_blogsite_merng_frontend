import React, { useState } from 'react';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from './PostCard';

function Posts() {
    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState([
        {
            id: 1,
            username: 'Arjimson Santiano',
            userImage: 'https://react.semantic-ui.com/images/avatar/large/molly.png',
            imageDescription: 'This is some post 1',
            imagePath: 'https://www.svethardware.cz/eu-dala-googlu-dalsi-pokutu-1-49-mld-eur-za-adsense/48956/img/google-new-logo.jpg',
            likeCount: 124,
            commentCount: 5,
        },
        {
            id: 2,
            username: 'John Michael',
            userImage: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
            imageDescription: 'This is some post 2',
            imagePath: 'https://neilpatel.com/wp-content/uploads/2019/06/facebook.png',
            likeCount: 224,
            commentCount: 23,
        },
        {
            id: 3,
            username: 'Stuart Tippet',
            userImage: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
            imageDescription: 'This is some post 3',
            imagePath: 'https://neilpatel.com/wp-content/uploads/2016/01/pinterest.png',
            likeCount: 421,
            commentCount: 33,
        },
        {
            id: 4,
            username: 'Charles Maneja',
            userImage: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
            imageDescription: 'This is some post 4',
            imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPl0RUSSL8t8_kZ9HoyZp5WcTyL-Hwpj6Yvus0ePHVsYTxUXtm&s',
            likeCount: 21,
            commentCount: 55,
        },
        {
            id: 5,
            username: 'Charles Maneja',
            userImage: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
            imageDescription: 'This is some post 4',
            imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPl0RUSSL8t8_kZ9HoyZp5WcTyL-Hwpj6Yvus0ePHVsYTxUXtm&s',
            likeCount: 21,
            commentCount: 55,
        },
    ])


    return (
        <Grid stackable columns={3} className="masonry grid" >

            {loading ? (<h1>Loading ...</h1>)
                : (
                    <Transition.Group>
                        {posts &&
                            posts.map((post) => (
                                <Grid.Column key={post.id}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}

        </Grid>
    )
}

export default Posts;