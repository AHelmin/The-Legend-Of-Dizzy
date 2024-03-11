import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../output.css';
import '../assets/css/header.css';




const Header = () => {


 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('auth_cookie');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  useEffect(() => {
    const authCookie = Cookies.get('auth_cookie');
    if (authCookie) {
      setIsAuthenticated(true);
    }
  }, []); 

  return (
    <Navbar className="bg-green-800" style={{ height: '80px' }}>
      <div className="w-full flex justify-between items-center header-container px-8 press-start">
        <Nav className="mr-auto">
          {/* Conditionally set the 'to' prop based on isAuthenticated */}
          <Nav.Link as={Link} to={isAuthenticated ? "/game" : "/auth"} className="text-white">
            Play!
          </Nav.Link>
        </Nav>
        <div className="flex items-center legend-of-dizzy-container">
          <p className="legend-of-dizzy hyrule text-yellow-600">The Legend of Dizzy</p>
        </div>
        <Nav>
          {isAuthenticated ? (
            // Show Logout when auth-cookie present - TP
            <Nav.Link onClick={handleLogout} className="text-white ml-auto">
              Logout
            </Nav.Link>
          ) : (
            // Show Login when auth-cookie is NOT present - TP
            <Nav.Link as={Link} to="/auth" className="text-white ml-auto">
              Login
            </Nav.Link>
          )}
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;