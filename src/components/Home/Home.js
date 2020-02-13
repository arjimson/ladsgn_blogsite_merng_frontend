import React, { useEffect} from 'react';
import Posts from '../Posts';



function Home() {

    let postSection = React.createRef();
    let homepageSection = React.createRef();

    useEffect(() =>{
        window.addEventListener('scroll', handleScroll);
    })

    function handleScroll() {
        let scrollTop = window.scrollY;
        console.log(scrollTop)
    }

    function goToPostSection() {
        window.scrollTo(0, postSection.current.offsetTop)
    }
    function goToHomepageSection() {
        window.scrollTo(0, 0)
    }


    return (
        <div className="homepage-container" ref={homepageSection} >
            <div className="banner-container">
                <div className="caret-down-ladsgn">
                    <img
                        onClick={goToPostSection}
                        style={{ cursor: "pointer" }}
                        className="animated infinite slideInDown"
                        src={require('../../assets/caret_down.png')} />
                </div>
            </div>

            <div ref={postSection} className="posts-container">
                <div
                    style={{overflowY: 'scroll', height: '90vh', padding: '5px', overflowX: 'hidden'}}>
                    <Posts />
                </div>
                <div className="caret-up-ladsgn">
                    <img
                        onClick={goToHomepageSection}
                        style={{ cursor: "pointer" }}
                        // className="animated infinite slideInDown"
                        src={require('../../assets/page_up.png')} />
                </div>
            </div>

        </div>
    )
}

export default Home;