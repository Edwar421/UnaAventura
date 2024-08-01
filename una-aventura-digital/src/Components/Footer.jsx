import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container text-center">
        <span>© 2024 Viaje Fotográfico. Todos los derechos reservados.</span>
        <div>
          <a href="https://www.facebook.com" className="mx-2">
            <i className="bi bi-facebook footer-icon"></i>
          </a>
          <a href="https://www.twitter.com" className="mx-2">
            <i className="bi bi-twitter footer-icon"></i>
          </a>
          <a href="https://www.instagram.com" className="mx-2">
            <i className="bi bi-instagram footer-icon"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
