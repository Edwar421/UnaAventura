import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Viaje Fotográfico</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Galería</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Subir Foto</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Perfil</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
