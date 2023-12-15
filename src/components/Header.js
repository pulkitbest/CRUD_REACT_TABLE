import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand className="mx-auto">
                        ARR Target by Product and Geography in FY'23
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
