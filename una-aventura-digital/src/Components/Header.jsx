import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import appFireBase from '../firebase-config';
import '../Styles/Header.css';

const auth = getAuth(appFireBase);

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navbarCollapseRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Close the menu when the route changes
    if (navbarCollapseRef.current) {
      const collapse = new window.bootstrap.Collapse(navbarCollapseRef.current, {
        toggle: false,
      });
      collapse.hide();
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Cerrando sesión...');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Una Aventura Digital</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
          {isAuthenticated && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Home">Publicaciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Upload">Subir Foto</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
