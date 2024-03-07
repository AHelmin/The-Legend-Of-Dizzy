import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../output.css';
import '../assets/css/header.css'

const Header = () => {
  return (
    <Navbar className="bg-green-800" style={{ height: '80px' }}>
      <div className="w-full flex justify-between items-center header-container px-8 press-start">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/game" className="text-white">
            Play!
          </Nav.Link>
        </Nav>
        <div className="flex items-center legend-of-dizzy-container">
          <p className="legend-of-dizzy hyrule text-yellow-600">The Legend of Dizzy</p>
        </div>
        <Nav>
          <Nav.Link as={Link} to="/auth" className="text-white ml-auto">
            Login
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;