import React from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../../services";


function Login(props) {
  
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  function handleSubmit(e) {
    e.preventDefault()
    loginUser(email, password, navigate('/profile'))
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