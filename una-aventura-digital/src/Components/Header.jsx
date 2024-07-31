import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import appFireBase from '../firebase-config';

const auth = getAuth(appFireBase);

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Cerrando sesión...');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Una Aventura Digital</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuthenticated && (
            <ul className="navbar-nav ml-auto">
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
      </nav>
      <div style={{ marginBottom: '20px' }}></div>
    </div>
  );
}

export default Header;