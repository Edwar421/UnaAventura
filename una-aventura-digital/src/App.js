import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import appFireBase from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './Pages/Login.jsx'; 
import Home from './Pages/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Upload from './Pages/Upload';
import Registro from './Pages/Registro';
import Footer from './Components/Footer';
import Header from './Components/Header';

const auth = getAuth(appFireBase);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUser(usuarioFirebase);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" exact element={user ? <Home /> : <Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Home" element={user ? <Home /> : <Login />} />
          <Route path="/Upload" element={user ? <Upload /> : <Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;