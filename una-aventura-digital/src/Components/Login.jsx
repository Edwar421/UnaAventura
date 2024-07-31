import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Login.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import appFireBase from '../firebase-config';

const auth = getAuth(appFireBase);

export const Login = () => {

  const [register, setRegister] = React.useState(false);

  const functionAutenticacion = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (register) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert('Asegurate que la contraseña tenga mas de 8 caracteres');
        }
      } else {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {   
            alert('El Correo o la contraseña son incorrectos');
            return;
        }
      }
      console.log('Autenticación exitosa');
      // Redirigir al usuario a la página principal después del inicio de sesión
      // window.location.href = '/'; // o utilizar una ruta de React Router
    } catch (error) {
      console.error('Error en la autenticación:', error);
    }
  }

  return (
    <div className='container'>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="login-container">
            <h2 className="text-center">{register ? "Registrarse" : "Iniciar Sesión"}</h2>
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
            <p className="text-center mt-3">
              {register ? "Si ya tienes cuenta" : "No tienes cuenta"}
              <button className="btn btn-link" onClick={() => setRegister(!register)}>
                {register ? " Inicia sesión" : " Regístrate"}
              </button>
            </p>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block img-container">
          <img src="/Imagenes/Viaje.jpg " alt="Viaje Fotográfico" className="img-fluid" />
        </div>
      </div>
    </div>
  )
}
