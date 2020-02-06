import React, { useContext, useState } from 'react';
import { Button, Menu, Input, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
function MenuBar() {
    const { user, logout } = useContext(AuthContext);

    const pathname = window.location.pathname;

    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path)

    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
        <Menu stackable size='large' className="menubar-container">
            <Menu.Item
                name={user.username}
                as={Link}
                to="/" >
                <img src={require('../../assets/logo.png')} className="logo-ladsgn" />
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' className="input-search-ladsgn" />
                </Menu.Item>
                <Menu.Item
                    name={user.username}
                    as={Link}
                    to="/"
                >
                    <Header as='h4' color="red">{user.username}</Header>
                </Menu.Item>
                <Menu.Item>
                    <Button
                        name='logout'
                        color='red'
                        className='button-ladsgn-color-red'
                        onClick={logout}
                    >Logout</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>

    ) : (<Menu stackable size='large' className="menubar-container">


        <Menu.Item
            name='home'
            // active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
        >
            <img src={require('../../assets/logo.png')} className="logo-ladsgn" />
        </Menu.Item>

        <Menu.Menu position='right'>
            <Menu.Item>
                <Input icon='search' placeholder='Search...' className="input-search-ladsgn" />
            </Menu.Item>
            <Menu.Item>
                <Button
                    primary
                    name='login'
                    color='red'
                    className='button-ladsgn-color-red'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                >Login</Button>
            </Menu.Item>

            <Menu.Item>
                <Button
                    primary
                    name='signup'
                    color='red'
                    className='button-ladsgn-color-red'
                    active={activeItem === 'signup'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/signup"
                >Sign Up</Button>
            </Menu.Item>
        </Menu.Menu>
    </Menu>
        )
    return menuBar;
}

export default MenuBar;