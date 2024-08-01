import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const auth = getAuth();

const Registro = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      // Guardar el usuario en Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: name,
        email: email,
      });

      setError('');
      setSuccess(true);
      setTimeout(() => {
        navigate('/'); // Redirigir al login después de 2 segundos
      }, 2000);
    } catch (error) {
      setSuccess(false);
      // Manejo de errores
      setError('Error en el registro. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className='container'>
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="login-container p-4 bg-light rounded shadow">
            <h2 className="text-center text-primary">Registrarse</h2>
            {success && <div className="alert alert-success" role="alert">Registro exitoso. ¡Redirigiendo al inicio de sesión!</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input type="text" className="form-control" id="name" placeholder="Ingrese su nombre" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" required />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Regístrate</button>
            </form>
            <p className="text-center mt-3">
              ¿Ya tienes cuenta?
              <button className="btn btn-link" onClick={() => navigate('/')}>
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block img-container">
          <img src="/Imagenes/Viaje.jpg" alt="Viaje Fotográfico" className="img-fluid rounded" />
        </div>
      </div>
    </div>
  );
}

export default Registro;
