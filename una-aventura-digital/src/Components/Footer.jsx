import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark">
      <div className="container text-center">
        <span className="text-muted">© 2024 Viaje Fotográfico. Todos los derechos reservados.</span>
        <div>
          <a href="https://www.facebook.com" className="text-muted mx-2">Facebook</a>
          <a href="https://www.twitter.com" className="text-muted mx-2">Twitter</a>
          <a href="https://www.instagram.com" className="text-muted mx-2">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
