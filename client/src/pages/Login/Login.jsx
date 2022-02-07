import React from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { login_action, store } from "../../store";

// Déplacer fetch vers le store
// Utiliser le state pour recupérer les valeur du formulaire

function Login(props) {
  
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  //tony@stark.com
  //password123
  function handleSubmit(e) {
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:3001/api/v1/user/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        window.localStorage.setItem("token", result.body.token)
        store.dispatch(login_action(result.body.token));
        
      })
      .then( () => navigate('/profile'))
      .catch(error => console.log('error', error)); 
  }
  
    return (
      <>
        <Nav></Nav>
        <main class="main bg-dark">
          <section class="sign-in-content">
            <i class="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div class="input-wrapper">
                <label for="username">Username</label>
                <input type="text" id="username" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div class="input-wrapper">
                <label for="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div class="input-remember">
                <input type="checkbox" id="remember-me" />
                <label for="remember-me">Remember me</label>
              </div>
              <button type="submit" class="sign-in-button">Sign In</button>
            </form>
          </section>
        </main>
        <Footer></Footer>
      </>
    );  
}

export default Login;