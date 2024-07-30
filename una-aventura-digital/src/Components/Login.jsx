import React from 'react'

export const Login = () => {
    return (
        <div className='container'>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="login-container">
                        <h2 className="text-center">Iniciar Sesión</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                            <p className="text-center mt-3">¿No tienes una cuenta? <a href="#">Regístrate</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
