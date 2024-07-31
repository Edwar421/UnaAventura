import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import appFireBase from '../firebase-config';

const auth = getAuth(appFireBase);

export const Login = () => {
  const [register, setRegister] = React.useState(false);
  const [error, setError] = React.useState('');

  const functionAutenticacion = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (register) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setError(''); // Limpiar error si el registro fue exitoso
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
        }
      } else {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setError(''); // Limpiar error si el inicio de sesión fue exitoso
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
        }
      }
      console.log('Autenticación exitosa');
      // Redirigir al usuario a la página principal después del inicio de sesión
      // window.location.href = '/'; // o utilizar una ruta de React Router
    } catch (error) {
      console.error('Error en la autenticación:', error);
    }
  }

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
            <h2 className="text-center">{register ? "Registrarse" : "Iniciar Sesión"}</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={functionAutenticacion}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">{register ? "Regístrate" : "Inicia Sesión"}</button>
            </form>
            <button type="button" className="btn btn-info btn-block mt-2" onClick={handleGoogleLogin}>
              Google
            </button>
            <p className="text-center mt-3">
              {register ? "Si ya tienes cuenta" : "No tienes cuenta"}
              <button className="btn btn-link" onClick={() => setRegister(!register)}>
                {register ? " Inicia sesión" : " Regístrate"}
              </button>
            </p>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block img-container">
          <img src="/Imagenes/Viaje.jpg" alt="Viaje Fotográfico" className="img-fluid" />
        </div>
      </div>
    </div>
  )
}
