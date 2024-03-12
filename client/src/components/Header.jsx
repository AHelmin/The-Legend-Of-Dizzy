import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../output.css';
// import '../assets/css/header.css';
import { useSelector } from 'react-redux';




const Header = () => {
  const userEmail = useSelector((state) => state.email);
  const userName = useSelector((state) => state.name);
  const stageName = useSelector((state) => state.stagename);
  const battleScore = useSelector((state) => state.battlescore);
  const rpgScore = useSelector((state) => state.rpgscore);
  const shooterScore = useSelector((state) => state.shooterScore);

  
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('auth_cookie');
    setIsAuthenticated(false);
    window.location.href = '/';
    localStorage.clear();
  };

  useEffect(() => {
    if (userName) {
      setIsAuthenticated(true);
    }
  }, []); 

  return (
    <>
    
    <p>NAME: {userName}</p>
    <p>EMAIL:{userEmail}</p>
    <p>STAGE:{stageName}</p>
    <p>SHOOTERSCORE:{shooterScore}</p>
    <p>BATTLESCORE:{battleScore}</p>
    <p>RPGSCORE:{rpgScore}</p>
    <Navbar className="bg-green-800 flex w-full" style={{ height: "15%" }}>
      <div className="w-full flex flex-wrap justify-between items-center header-container px-8 press-start">
        <Nav className="mr-auto">
          {/* Conditionally set the 'to' prop based on isAuthenticated */}
          <Nav.Link as={Link} to={isAuthenticated ? "/game" : "/auth"} className="text-white">
            Play!
          </Nav.Link>
        </Nav>
        <div className="flex text-center  legend-of-dizzy-container">
        <Nav.Link as={Link} to="/" className="legend-of-dizzy hyrule text-yellow-600">The Legend of Dizzy</Nav.Link>
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
    </>
  );
};

export default Header;