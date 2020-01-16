import React, { useState } from 'react';

import { Button, Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MenuBar() {



    const pathname = window.location.pathname;

    const path = pathname === '/' ? 'home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path)

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu stackable size='tiny'>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />

            <Menu.Menu position='right'>
                <Dropdown item text='Language'>
                    <Dropdown.Menu>
                        <Dropdown.Item>English</Dropdown.Item>
                        <Dropdown.Item>Russian</Dropdown.Item>
                        <Dropdown.Item>Spanish</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Item>
                    <Button
                        primary
                        name='login'
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
                        active={activeItem === 'signup'}
                        onClick={handleItemClick}
                        as={Link}
                        to="/signup"
                    >Sign Up</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>

    )
}

export default MenuBar;