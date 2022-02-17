import { createStore } from 'redux'

const initialSate = {
  isConnected: false,
  firstName: "",
  lastName: "",
  token: ""
}

//ACTIONS
const login_action = (token) => ({
  type: "LOGIN_ACTION",
  payload: {
    token: token
  }
}) 
const add_user_info = (ufirstName, ulastName) => ({
  type: "ADD_USER_INFO",
  payload: {
    firstName: ufirstName,
    lastName: ulastName
  }
})
const logout_action = () => {
  window.localStorage.removeItem("token");
  return { type: "LOGOUT_ACTION" }
}
  

//REDUCER
function loginReducer(state = initialSate, action) {
  
  switch (action.type) {
    case "LOGIN_ACTION":
      return {
        ...state,
        isConnected: true,
        token: action.payload.token
      }
    case "ADD_USER_INFO":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    case "LOGOUT_ACTION":
      return {
        ...state,
        isConnected: false,
        firstName: "",
        lastName: "",
        token: ""
      }
    default :
    return state;
  }
  
}
const store = createStore(loginReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export { store, login_action, add_user_info, logout_action };