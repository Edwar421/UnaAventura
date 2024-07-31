import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import appFireBase from '../firebase-config';

const auth = getAuth(appFireBase);

const Registro = () => {
  const [error, setError] = React.useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(''); // Limpiar error si el registro fue exitoso
      console.log('Registro exitoso');
      // Redirigir al usuario a la página principal después del registro
      // window.location.href = '/'; // o utilizar una ruta de React Router
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('El correo electrónico ya está en uso por otra cuenta.');
          break;
        case 'auth/invalid-email':
          setError('El correo electrónico no tiene un formato válido.');
          break;
        case 'auth/weak-password':
          setError('La contraseña debe tener al menos 8 caracteres.');
          break;
        default:
          setError('Error en el registro. Por favor, inténtalo de nuevo.');
      }
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className='container'>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="login-container">
            <h2 className="text-center">Registrarse</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Regístrate</button>
            </form>
            <p className="text-center mt-3">
              Si ya tienes cuenta
              <a className="btn btn-link" href="/">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block img-container">
          <img src="/Imagenes/Viaje.jpg" alt="Viaje Fotográfico" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Registro;
