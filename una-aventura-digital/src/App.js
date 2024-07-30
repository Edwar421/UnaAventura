
import './App.css';
import React from 'react';
import appFireBase from './firebase-config';
import {getAuth,  onAuthStateChanged} from 'firebase/auth';
import { Login } from './Components/Login'; 
import { Home } from './Components/Home';
import Footer from './Components/Footer';
import Header from './Components/Header';

const auth = getAuth(appFireBase);

function App() {

  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, (ususarioFirebase) => {
    if(ususarioFirebase){
      setUser(ususarioFirebase);
    }
    else{
      setUser(null);
    }
  })

  return (
    <div>
      <Header />
      <div className="container">
      {user ? <Home correoUser={user.email} /> : <Login />} 
      </div>
      <Footer/>
    </div>
  );
}

export default App;
