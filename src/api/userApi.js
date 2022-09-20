import axios from 'axios'
// user apis

const url = 'https://referral-io.adaptable.app/api/user/'

export const registerUserRequest = async (name, email, password) => {
  try {
    return await axios.post(url + 'register',{name,email,password})
  } catch (error) {
    return error
  }
}


export const logInUserRequest = async(email, password) => {
  try {
    return await axios.post(url + 'login',{email, password})
  } catch (error) {
    return error
  }
}

export const getUserRequest = async (token) => {
  try {
    return await axios.get(url + 'me',{ headers: {"Authorization" : `Bearer ${token}`}})
  } catch (error) {
    console.log(error)
    return error
  }
}


export const forgotPasswordRequest = async (email) =>{
  try {
    return await axios.post(url + "forgot", {email: email})
  } catch (error) {
    return error
  }
}

export const updatePasswordRequest = async (password, token) => {
  try {
    return await axios.post(url + 'update-password/'+ token, {password: password, token: token})
  } catch (error) {
    return error
  }
}