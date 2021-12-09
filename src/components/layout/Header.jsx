import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
    return (
        <>
            

            <Navbar bg="light">
                <Container>
                    <Navbar.Brand><Link to="/" ><div className="websiteName"><img height="25px" src='https://banner2.cleanpng.com/20180222/tqw/kisspng-earth-magnifying-glass-blue-earth-and-magnifying-glass-5a8eaf5e79a9a5.9418823715193004464983.jpg' />World Lens</div></Link></Navbar.Brand>
                </Container>
            </Navbar>
            

        </>
    )
}

export default Header

