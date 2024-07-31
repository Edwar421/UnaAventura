import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login.css';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import appFireBase from '../firebase-config';

const auth = getAuth(appFireBase);

const Login = () => {
  const [error, setError] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(''); // Limpiar error si el inicio de sesión fue exitoso
      console.log('Inicio de sesión exitoso');
      // Redirigir al usuario a la página principal después del inicio de sesión
      // window.location.href = '/'; // o utilizar una ruta de React Router
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('El correo electrónico no tiene un formato válido.');
          break;
        case 'auth/user-disabled':
          setError('La cuenta del usuario ha sido deshabilitada.');
          break;
        case 'auth/user-not-found':
          setError('No existe un usuario registrado con ese correo.');
          break;
        case 'auth/wrong-password':
          setError('La contraseña es incorrecta.');
          break;
        default:
          setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log('Google sign-in successful:', credentials);
      // Close the login modal if applicable
      // showMessage("Welcome " + credentials.user.displayName);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div className='container'>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="login-container">
            <h2 className="text-center">Iniciar Sesión</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Inicia Sesión</button>
            </form>
            <button type="button" className="btn btn-info btn-block mt-2" onClick={handleGoogleLogin}>
              Google
            </button>
            <p className="text-center mt-3">
              No tienes cuenta
              <a className="btn btn-link" href="/Registro">
                Regístrate
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

export default Login;
