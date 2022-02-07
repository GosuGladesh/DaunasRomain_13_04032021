import React from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import { add_user_info, store } from "../../store";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux'

function Profile(props) {

  const [state, setEditName] = useState({ edit: false })
  
  const [firstName, setFirstNames] = useState("")
  const [lastName, setLastName] = useState("") 

  const username = useSelector((state) => state.firstName +" "+ state.lastName)
  const token = useSelector((state) => state.token) 
  

  useEffect(() => {
    fetchUserData();
  }, []
  );
 
  function fetchUserData() {
    var myHeaders = new Headers();
    let myToken = token
    myHeaders.append("Authorization", "Bearer " + myToken);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:3001/api/v1/user/profile", requestOptions)
      .then(response => response.json())
      .then(result => {
        store.dispatch(add_user_info(result.body.firstName, result.body.lastName))
      })
      .catch(error => console.log('error', error));
  }

  function editName() {
   setEditName({edit: !state.edit})
  }
  function editNamePost() {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer" + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "firstName": firstName,
      "lastName": lastName
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // Resource
    // http://monapi.com/posts -> POST -> CREATE de post
    // http://monapi.com/posts -> GET -> Liste de posts
    // http://monapi.com/posts/12 -> GET -> Un post
    // http://monapi.com/posts/12 -> PUT -> Un update
    // http://monapi.com/posts/12 -> DELETE -> Un update

    fetch("http://127.0.0.1:3001/api/v1/user/profile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          fetchUserData()
        }
        editName()
      })
      .catch(error => console.log('error', error));
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