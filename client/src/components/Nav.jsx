import { Link } from 'react-router-dom';
import React from 'react';

import bankLogo from '../img/argentBankLogo.png';

import { store, logout_action } from "../store"
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


export default function Nav(props) {

  const navigate = useNavigate();
  
  let isConnected = useSelector( (state) => state.isConnected) 
  let username = useSelector((state) => state.firstName)
  
  function logout() {
    window.localStorage.removeItem("token");
    store.dispatch(logout_action());
    navigate("/");
  }

  if (isConnected) {
    return (
        <nav class="main-nav">
      <Link class="main-nav-logo" to="/">
        <img
          class="main-nav-logo-image"
          src={bankLogo}
          alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link class="main-nav-item" to="/profile">
          <i class="fa fa-user-circle"></i>
          {username}
          </Link>
          <i class="fas fa-sign-out-alt"></i>
          <button onClick={logout} class="main-nav-item logout-button">Sign out</button>
        </div>
    </nav>
    )
  }
  else {
    
    return (
        <nav class="main-nav">
      <Link class="main-nav-logo" to="/">
        <img
          class="main-nav-logo-image"
          src={bankLogo}
          alt="Argent Bank Logo"
        />
        <h1 class="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link class="main-nav-item" to="/login">
          <i class="fa fa-user-circle"></i>
          Sign In
        </Link>
        </div>
    </nav>
    )
  }
  }
