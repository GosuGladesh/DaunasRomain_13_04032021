import { add_user_info,login_action, store } from "./store";


//POST /profile
function fetchUserData(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
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

//POST /login
function loginUser(email, password, navigate) {
      
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
      .then(navigate)
      .catch(error => console.log('error', error));     
}

// PUT /profile
async function putNewName(token, firstName, lastName) {
  
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

    fetch("http://127.0.0.1:3001/api/v1/user/profile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          fetchUserData(token)
        }
      })
      .catch(error => console.log('error', error));
}

//POST /profile
function checkTokenValidity(token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("http://127.0.0.1:3001/api/v1/user/profile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === 401) {
          window.localStorage.removeItem("token");
        }
        if (result.status === 200) {
          store.dispatch(login_action(token))
          store.dispatch(add_user_info(result.body.firstName, result.body.lastName))
        }
      })
      .catch(error => console.log('error', error));
  }
export { fetchUserData, loginUser, checkTokenValidity, putNewName };