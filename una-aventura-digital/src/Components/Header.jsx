import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import appFireBase from '../firebase-config';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Asegúrate de que esta línea está presente
import '../Styles/Header.css';

const auth = getAuth(appFireBase);

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navbarCollapseRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (navbarCollapseRef.current) {
      const collapse = new window.bootstrap.Collapse(navbarCollapseRef.current, {
        toggle: false,
      });
      collapse.hide();
    }
  }, [location]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownVisible]);

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
        <h1>Una Aventura Digital</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
          {isAuthenticated && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Upload">Subir Foto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Home">Publicaciones</Link>
              </li>
              <li className="nav-item">
                <button 
                  className="user-icon-btn" 
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  ref={dropdownRef}
                >
                  <i className="fas fa-user"></i>
                </button>
                <div className={`dropdown-menu${dropdownVisible ? ' show' : ''}`}>
                  <a href="#!" onClick={handleLogout}>Cerrar sesión</a>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
