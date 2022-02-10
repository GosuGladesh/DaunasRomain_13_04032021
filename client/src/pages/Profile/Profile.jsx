import React from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import { fetchUserData, putNewName} from "../../services";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux'
import {  useNavigate } from "react-router-dom";

function Profile(props) {

  const [state, setEditName] = useState({ edit: false })
  
  const [firstName, setFirstNames] = useState("")
  const [lastName, setLastName] = useState("") 

  const navigate = useNavigate()

  const username = useSelector((state) => state.firstName +" "+ state.lastName)
  const token = useSelector((state) => state.token) 
  

  useEffect(() => {
    if (!token) {
      navigate("/")
    }
    fetchUserData(token);
  }, []
  );
 
  function editName() {
   setEditName({edit: !state.edit})
  }

  function editNamePost() {
    putNewName(token, firstName, lastName)
    .then( () => editName())
  }
  
  return (
      <>
        <Nav></Nav>
        <main class="main bg-dark">
          <div class="header">
            <h1>Welcome back<br />{username}</h1>
            {state.edit ?
              <div class="edit-wrapper">
              <input type="text" placeholder="Tony" id="firstName" onChange={(e) => setFirstNames(e.target.value)}></input>
              <input type="text" placeholder="Jarvis" id="lastName" onChange={(e) => setLastName(e.target.value)}></input>
              <button class="edit-name-button edit-left" onClick={editNamePost}>Save</button>
              <button class="edit-name-button" onClick={editName}>Cancel</button>
              </div>
              :
              <button class="edit-button" onClick={editName}>Edit Name</button>
            }
          </div>
          <h2 class="sr-only">Accounts</h2>
          <section class="account">
            <div class="account-content-wrapper">
              <h3 class="account-title">Argent Bank Checking (x8349)</h3>
              <p class="account-amount">$2,082.79</p>
              <p class="account-amount-description">Available Balance</p>
            </div>
            <div class="account-content-wrapper cta">
              <button class="transaction-button">View transactions</button>
            </div>
          </section>
          <section class="account">
            <div class="account-content-wrapper">
              <h3 class="account-title">Argent Bank Savings (x6712)</h3>
              <p class="account-amount">$10,928.42</p>
              <p class="account-amount-description">Available Balance</p>
            </div>
            <div class="account-content-wrapper cta">
              <button class="transaction-button">View transactions</button>
            </div>
          </section>
          <section class="account">
            <div class="account-content-wrapper">
              <h3 class="account-title">Argent Bank Credit Card (x8349)</h3>
              <p class="account-amount">$184.30</p>
              <p class="account-amount-description">Current Balance</p>
            </div>
            <div class="account-content-wrapper cta">
              <button class="transaction-button">View transactions</button>
            </div>
          </section>
        </main>
        <Footer></Footer>
      </>
  )
}

export default Profile;