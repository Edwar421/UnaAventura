import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Login.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import appFireBase from '../firebase-config';

const auth = getAuth(appFireBase);



export const Login = () => {

    const [register, setRegister] = React.useState(false);

    const functionAutenticacion = async(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email);
        console.log(password);
    
        if (register){
            await createUserWithEmailAndPassword(auth, email, password);
        }
        else{
            await signInWithEmailAndPassword(auth, email, password);
        }
    }

    return (
        <div className='container'>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="login-container">
                        <h2 className="text-center">Iniciar Sesión</h2>
                        <form onSubmit={functionAutenticacion}>
                            <div className="form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">{register ? "Registrate":"Inicia Sesion"}</button>
                            
                        </form>
                        <p className="text-center mt-3">{register ? "Si ya tienes cuenta": "No tienes cuenta"}<button onClick={()=>setRegister(!register)}>{register ? " Inicia sesión": "Registrate"}</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
